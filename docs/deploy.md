# Building and Deploying

- - - -

## Index
1.  [Express.js](#expressjs)
1.  [Jenkins](#jenkins)
  1.  [The Jenkinsfile](#the-jenkinsfile)
  1.  [Creating a Pipeline](#creating-a-pipeline)
  1.  [Webhooks](#webhooks)
1.  [PCF](#pcf)
  1.  [The manifest.yaml](#the-manifestyml)
1.  [SonarQube](#sonarqube)
  1.  [The sonar-project.properties](#the-sonar-projectproperties)
1.  [Fortify](#fortify)

- - - -
- - - -

## Express.js

We are configuring an express server to serve our application when deployed.  

First, install the express.js dependency:

```
$ npm install --save express
```

then create a `/server/` dir at the project's root, which contains an `app.js` and an `index.js`:

```
$ mkdir server
$ touch server/app.js
$ touch server/index.js
```

Example `server/app.js`:

```javascript
// server/app.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;

```

Example `server/index.js`:

```javascript
// server/index.js


const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

```

Finally, add a 'start:server' script to the project's package.json.  
This will be invoked by PCF as the start command upon deployment:

```json
"scripts": {
  "start": "webpack-dev-server --open --config webpack.dev.js",
  "start:server": "node server",
  "build": "webpack --config webpack.prod.js",
  "test": "jest"
},
```

- - - -
- - - -

## Jenkins

Jenkins is GeointServices Continuous Integration Continuous Deployment (CICD) tool.  Jenkins automates the build, test and deployment stages of development.  

We will be using Jenkins Pipelines to deploy our react application.  These pipelines are configured using a `Jenkinsfile` script, which will be checked in to GitLab along with the rest of our source code.  You can read more about Jenkinsfiles [here](https://jenkins.io/doc/book/pipeline/jenkinsfile/).

### The Jenkinsfile

Jenkinsfile scripts are written in the programming language Groovy.  You can read more about Groovy [here](http://groovy-lang.org/).  

First we will create a Jenkinsfile at the project's root:

```
$ touch Jenkinsfile
```


Here's our Jenkinsfile, commented to show what we're doing:

```groovy
NODE_TOOL = 'NodeJS_LTS'

//We aren't specifying a specific Jenkins slave to run this build on,
//so we are passing an empty string into the node method
node ('') {

   // --------------------------------------------------------
   // Our first pipeline stage checks our code out from GitLab
   // --------------------------------------------------------
    stage ('Clean WS and Checkout'){

        cleanWs()

        // runs Jenkins SCM (Source Code Management) plugin
        checkout scm

        // Clean workspace, guarantee no node leftovers
        //sh "git clean -ffdx"

    }

   // --------------------------------------------------------
   // The next stage in our pipeline will install the
   // dependencies listed in package.json
   // --------------------------------------------------------
    stage ('NPM install'){

        //  this code block runs a shell script that creates
        //  a .npmrc file (a npm configuration file)
        //  that points to the npm installation
        sh '''
          cat > .npmrc <<EOF
cache=node-linux-x64/npm
registry=https://registry.npmjs.org/
EOF
        '''

        //Install node & add to Path
        def nodeHome = tool name: "${NODE_TOOL}"

        withEnv(["HOME=${pwd()}", "PATH+NODE=${nodeHome}/bin"]) {
            sh "node --version"
            sh 'rm -rf ./build'
            sh 'rm -rf ./coverage'
            sh 'rm -rf ./node_modules'
            sh "npm install --verbose"
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will run our unit tests
    // to ensure that none are failing
    // --------------------------------------------------------
    stage ('Unit Test'){
        //Install node & add to Path
        def nodeHome = tool name: "${NODE_TOOL}"

        withEnv(["HOME=${pwd()}", "PATH+NODE=${nodeHome}/bin"]) {
            sh "npm test"
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will use webpack to
    // build our code for deployment
    // --------------------------------------------------------
    stage ('Build'){
        //Install node & add to Path
        def nodeHome = tool name: "${NODE_TOOL}"

        withEnv(["HOME=${pwd()}", "PATH+NODE=${nodeHome}/bin"]) {
            sh "npm run build"
            sh 'rm -rf ./node_modules'
            sh 'rm -rf ./node-linux-x64'
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will scan our code with
    // HP Fortify and SonarQube for security comliance
    // --------------------------------------------------------
    stage ('Scan') {

        sh '''
        # clean
        /bin/rm -f fortify.pdf fortify.fpr fortify.xml
        /opt/hp_fortify_sca/bin/sourceanalyzer -64 -b fortify -clean

        #build
        /opt/hp_fortify_sca/bin/sourceanalyzer \\
            -64 \\
            -b fortify \\
            -machine-output \\
            -verbose "src/*.js" "server/*.js"

        #scan
        /opt/hp_fortify_sca/bin/sourceanalyzer -64 -b fortify -scan -f fortify.fpr

        # report generation
        /opt/hp_fortify_sca/bin/ReportGenerator -format pdf -f fortify.pdf -source fortify.fpr
        '''

        archive "fortify."

        def sonarXmx = '512m'
        def sonarHost = 'https://sonar.gs.mil'
        def scannerHome = tool 'SonarQube Runner 2.8';
        withEnv(["SONAR_SCANNER_OPTS=-Xmx${sonarXmx}"]) {
            // Retrieve sonar token from Jenkins credentials and store in variable to be used by sonar-scanner, masked from log
            withCredentials([[$class: 'StringBinding', credentialsId: 'sonar-prod-publish-token', variable: 'SONAR_LOGIN']]) {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=DataCorpsForm -Dsonar.projectKey=DataCorps:Form"
            }
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will deploy our compiled
    //  application to PCF
    // --------------------------------------------------------
    stage ('Deploy'){

        //We'll warp our CF cli commands with Jenkins' withCredentials
        // plugin, to pass in masked CF credentials
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'paas-l4-dev-TDGI_Developers-service', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {

            // this withEnv wrapper sets the environment variable CF_HOME
            // for the wrapped commands, since Jenkins home directory is
            // not accessible
            withEnv(["CF_HOME=${pwd()}"]) {

               // we log into the CF api using a CF cli command, specifying our username and password (passed by the withCredentials wrapper)
               // and our target Org and Space
                sh "ls -la && cf login -a api.system.dev.east.paas.nga.mil -u \"$PCFUser\" -p \"$PCFPass\" -o TDGI_Developers -s tdgi_developers-dev"

                // we push our application
                sh "cf push"

                // we logout of cf api
                sh "cf logout"
            }
        }

    // ---------------------------------------------
    //  And that's it! Hopefully we now have an application
    //  running in PCF
    // ---------------------------------------------
    }
}

```

- - - -

### Creating a Pipeline

1.  Navigate to your project's sub-directory in Jenkins.
2.  Click the `New Item` button in the left-side navigation list.
3.  Enter a name for your pipeline and select the `Pipeline` radio button.  Click `OK`.
4.  This will bring you to the Pipeline configuration page.  Under the `Pipeline` heading on the configuration page, select `Pipeline script from SCM` from the Definition drop-down.
5.  Select `Git` from the SCM drop-down.
6.  Copy and paste the GitLab SSH Uri for your project into the `Repository URL` text box.
7.  Select `git (Readonly key for gitlab .mil)` from the `Credentials` drop down.
8.  Save the Pipeline configuration.
9.  In GitLab, navigate to your project's `Deploy Keys` settings.
10.  Click the `Enable` button next to the `generic jenkins build read-only access 1` key.
11.  Navigate back to Jenkins.  Click the button `Build Now` in the left-side navigation list.

### PCF Credentials - *TODO*

**Requesting Credentials:** Jenkins credentials to push to PCF will need to be set up by a member of
the devops team.  Please create a support ticket in
the [Redmine Devops_Support Project]() requesting these credentials.  

:exclamation: Please include the name of the Jenkins directory your pipeline is in (this is also usually the name of the GitLab group the project was created in), as well as the PCF Organization and Space that your project will be deployed to.  

*(It probably isn't a bad idea to ping the devops team in rocketchat and let them know that you have created a ticket.)*

The devops team will scope these credentials to both the specific Jenkins folder, and the PCF Org and Space.  You can use these credentials for multiple pipelines, provided they are all in the same Jenkins directory and are all targeting the same PCF Org and Space.

**Using Credentials:**

- - - -

### Webhooks

Webhooks are used to do certain actions when an event happens in your repository. One of the most common actions
we use webhooks for are for building the pipeline when you push to your repository. Let's walk through this
situation.

:exclamation: Ensure you have a functioning Jenkins pipeline and at least master access to the repository in question.

**Build Pipeline on Push Events:**

1. Go to your Jenkins pipeline and click Configure.
2. Scroll down to the section entitled "Build Triggers".
3. Check the box that says "Build when a change is pushed to GitLab".
4. Uncheck the box that says "Opened Merge Request Events".
5. Copy the GitLab CI Service URL.
6. On the homepage of your gitlab repository click settings and then navigate to integrations.
7. Paste teh copied URL into the URL box and ensure that under "Triggers", "Push Events" has been checked.
8. Click the "Add Webhook" button.
9. You should now have a webhook that will build your Jenkins pipeline each time you push to your repository.
10. You can test that you have successfully added the webhook by either pushing to Gitlab or you can click the "Test" button next to the webhook you just added.

- - - -
- - - -

## PCF

### The manifest.yml

We are creating a [PCF manifest.yml](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) file
at the project's root to specify PCF configuration options.  You'll want to change the name and host values
to reflect your project's name and preferred host name:

`manifest.yml`:
```
---
applications:
- name: tdgi_react_template
  memory: 256M
  host: react-template
  buildpack: nodejs_buildpack
  command: npm start:server
```


- - - -
- - - -

## SonarQube

SonarQube is a scanning tool used for code quality and vulnerability checks.

### The sonar-project.properties

For SonarQube to properly be able to configure your scans we have to create a sonar-project.properties file
in our project's root directory.

`sonar-project.properties`:
```
sonar.projectKey=${JOB_NAME}
sonar.projectName=${JOB_SHORT_NAME}
sonar.projectVersion=0.1.0
sonar.sources=.
sonar.exclusions=node_modules/**/*,.settings,public,package-lock.json,src/css/*.css
sonar.dynamicAnalysis=reuseReports
sonar.javascript.jstest.reportsPath=reports
sonar.javascript.lcov.reportPath=test/coverage/reports/coverage.lcov
sonar.java.binaries=build/**/*
```

### SonarQube Stage for Jenkins

For SonarQube to actually run a scan we need a Jenkins pipeline stage that will kick this off when we build
our pipeline.

`Jenkinsfile`:
```
stage('Scan')
        def sonarXmx = '512m'
        def sonarHost = 'https://sonar.gs.mil'
        def scannerHome = tool 'SonarQube Runner 2.8';
        withEnv(["SONAR_SCANNER_OPTS=-Xmx${sonarXmx}"]) {
            // Retrieve sonar token from Jenkins credentials and store in variable to be used by sonar-scanner, masked from log
            withCredentials([[$class: 'StringBinding', credentialsId: 'sonar-prod-publish-token', variable: 'SONAR_LOGIN']]) {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=DevDashboard -Dsonar.projectKey=TDGI_Developers:DevDashboard"
            }
        }
```

## Fortify

- *TODO*

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
    stage ('NPM Install'){
        timeout(10) {
            def nodejs_path = tool('NodeJS_10')
            withEnv(["NPM_CONFIG_USERCONFIG=${env.WORKSPACE}/jenkins_npmconfig", "PATH+=${nodejs_path}/bin"]) {
                sh "mkdir -p ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm config set cache ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm install --verbose"
            }
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will run our unit tests
    // to ensure that none are failing
    // --------------------------------------------------------
    stage ('Unit Test'){
        timeout(10) {
            def nodejs_path = tool('NodeJS_10')
            withEnv(["NPM_CONFIG_USERCONFIG=${env.WORKSPACE}/jenkins_npmconfig", "PATH+=${nodejs_path}/bin"]) {
                sh "mkdir -p ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm config set cache ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm test"
            }
        }
    }

    // --------------------------------------------------------
    // The next stage in our pipeline will use webpack to
    // build our code for deployment
    // --------------------------------------------------------
    stage ('Build'){
        if (env.BRANCH_NAME == 'master') {
            sh "rm ./src/config/config.json"
            sh "cp ./src/config/config.dev.json ./src/config/config.json"
        }
        timeout(10) {
            def nodejs_path = tool('NodeJS_10')
            withEnv(["NPM_CONFIG_USERCONFIG=${env.WORKSPACE}/jenkins_npmconfig", "PATH+=${nodejs_path}/bin"]) {
                sh "mkdir -p ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm config set cache ${env.WORKSPACE}/jenkins_npmcache"
                sh "npm run build"
            }
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

        archive "fortify.*"

        def sonarXmx = '1536m'
        def sonarHost = 'https://sonar.gs.mil'
        def scannerHome = tool 'SonarQube Runner 2.8';
        withEnv(["SONAR_SCANNER_OPTS=-Xmx${sonarXmx}"]) {
            // Retrieve sonar token from Jenkins credentials and store in variable to be used by sonar-scanner, masked from log
            withCredentials([[$class: 'StringBinding', credentialsId: 'sonar-prod-publish-token', variable: 'SONAR_LOGIN']]) {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=TDGIReactTemplate -Dsonar.projectKey=TDGI:ReactTemplate"
            }
        }
    }

    // skip deploy stage if the gitlab branch name is not master
    // else cases can be added to this if statement to deploy other
    // branches to other environments/spaces/etc.
    if (env.BRANCH_NAME == 'master') {
        // --------------------------------------------------------
        // The next stage in our pipeline will deploy our compiled
        //  application to PCF
        // --------------------------------------------------------
        stage ('Deploy'){

            sh "rm -rf ./coverage"
            sh "rm -rf fortify.fpr"
            sh "rm -rf fortify.pdf"
            sh "rm -rf node-linux-x64"
            sh "rm -rf node_modules"

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
}

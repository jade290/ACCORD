# DevCorps React Template v3.0.0

----

[![Build Status](https://jenkins.gs.mil/job/TDGI_Developers/job/react-template/job/master/badge/icon)](https://jenkins.gs.mil/job/TDGI_Developers/job/react-template/job/master/) - Jenkins.mil build status for master branch

----

## v3.0.0 updates:

- react-template has been simplified.  
    - All example react components have been moved to the react-components project.
    - The NGA bootstrap-theme is still available at `./src/bootstrap-theme.css`
    - GeoAxis integration is still in place
- the template's file structure has changed.  this template now utilizes a slightly altered version of the [Fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) file structure.  For more details on this file structure, please see [File Structure Notes](#file-structure-notes)
- the template now dynamically renders react-router routes and Navbar options from a list of registered views.  this makes adding views, or 'pages', to your app easier than ever.  For more details on view registration, see the [View Registration Notes](#view-registration-notes)
- the template's config.json has seen some updates.  
    - the contact/feedback config object has been stripped as this feature was not seeing heavy use.
    - new config option - `useEcobar`: when set to `true`, will utilize the NGA CDN Ecobar header, footer, and classification banners.  when set to `false`, will display the footer and classification banners included in this react-template.
    - new config option - `maximumSystemClassification`: string will display in the react-template's built in classification banners.  This option can be set to empty if the `useEcobar` option is set to true.
    - new config option - `classificationBannerColor`: string of a css color selector - will change the background color of the react-template's built in classification banners.  This option can be set to empty if the `useEcobar` option is set to true.
- the Jenkinsfile has been tweaked to support gitlab-branch specific build steps in multi-branch pipelines.  More specifically; the config.json file is overwritten with the config.dev.json file when Jenkins builds the 'master' branch.  The 'Deploy' stage in the file is also skipped when building any branch other than the 'master' branch.
- JSDoc has been added to automate documentation of the source code, and the linter has been commanded to demand JSDoc compliant comments on all applicable classes/methods.  A configurable JSDoc theme is also included.

----

**Description**: ReactJS Template Project created in accordance with DevCorps
coding standards.  Bootstrapped with Facebook's `create-react-app` and updated with
DevCorps ESlint standards, NGA CDN look&feel guidelines, and optimized to use the GeointServices Pipeline
for quick, continuous development.  Utilizes the PCF SSO Tile to enable GeoAxis Authentication.

> **Webpack** bundles application
> files for deployment, using **Babel**
> to compile **ES2015** to vanilla
> JavaScript capable of running in the browser.


> **Jest** provides a low-configuration
> framework for writing JavaScript
> unit tests.


> **ESlint** checks code compliance
> against the **airbnb** JavaScript
> styleguide, to increase maintainability of
> the code.

----

# TODO

** Please check the ISSUES tab in GitLab for known bugs and feature requests. **

----

## Index

1.  [Using the Template](#using-the-template)
  1.  [Clone from GitLab](#clone-from-gitlab)
  1.  [Start Locally for Development](#start-locally-for-development)
  1.  [Run Unit Tests](#run-unit-tests)
  1.  [Build for Production](#build-for-production)
  1.  [The Configuration File](#the-configuration-file)
  1.  [Editing the Template](#editing-the-template)
1.  [Deploying the App to PCF](./docs/deploy.md)
1.  [ES2015](./docs/es2015.md)
1.  [ESLint](./docs/eslint.md)
1.  [GeoAxis Integration](./docs/geoaxis.md)
1.  [Jest](./docs/jest.md)
1.  [React Router](./docs/react-router.md)
1.  [NGA CDN/Styleguide](./docs/styleguide.md)

----

# Using the Template

## Clone from GitLab

```
$ git clone %REPO_URL%
$ cd %PROJECT_NAME%
```

## Start Locally for Development

```
$ npm i
$ npm start
```

## Run Unit Tests

```
$ npm test
```

## Build Documentation

```
$ npm run createDocs
```

## Open Documentation in a Browser

(assumes that python is installed on the local machine)

```
$ npm run openDocs
```

## Build for Production

```
$ npm run build
```

## The Configuration File

The React application's configuration file can be found at `./src/config/config.json` and contains the following values:

```json
{
    "appName": "DevCorps React Template",
    "useEcobar": true,
    "classificationBannerColor": "green",
    "maximumSystemClassification": "UNCLASSIFIED",
    "geoaxis" : {
        "redirectUrl" : "https://tdgi-react-template.dev.east.paas.nga.mil",
        "enabled" : false
    },
    "apiUrl": "https://tdgi-react-template.dev.east.paas.nga.mil/api"
}
```

- `appName`: The name of the application to be displayed in the Navigation bar and the page's title.
- `useEcobar`: Boolean value determines if the CDN Ecobar script is applied to the application.  Default value is true.  Reccomended value is true.  Configurable for use in specific circumstances in which network access to NGA's CDN is restricted or unavailable.
- `classificationBannerColor`: Background color of the application's system classification banner.  Only utilized if `useEcobar` is `false`.
- `maximumSystemClassification`: Maximum system classifiation string for the application's classification banner.  Only utilized if `useEcobar` is `false`.
- `geoaxis.redirectUrl`: The redirectUrl registered with the PCF SSO tile that the deployed application is bound to.
- `geoaxis.enabled`: Enable/disable GeoAxis authentication requirement.  Set to false for local development; true for deployment.

## Editing the Template

 -  Update the `package.json`'s Project Name and Author fields:

```json
{
  "name": "PROJECT_NAME",
  "author": "PROJECT_AUTHOR",
  "private": true,
}
```

 -  Update the `Jenkinsfile`'s PCF Deployment credentials/target:

```groovy
//We'll warp our CF cli commands with Jenkins' withCredentials
// plugin, to pass in masked CF credentials
withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '%JENKINS_CREDENTIALS_ID%', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {

    // this withEnv wrapper sets the environment variable CF_HOME
    // for the wrapped commands, since Jenkins home directory is
    // not accessible
    withEnv(["CF_HOME=${pwd()}"]) {

        // we log into the CF api using a CF cli command, specifying our username and password (passed by the withCredentials wrapper)
        // and our target Org and Space
        sh "ls -la && cf login -a api.system.dev.east.paas.nga.mil -u \"$PCFUser\" -p \"$PCFPass\" -o %PCF_ORG% -s %PCF_SPACE%"

        // we push our application
        sh "cf push"

        // we logout of cf api
        sh "cf logout"

    }
}
```

 -  Update the `manifest.yml`'s name and host fields:

```yaml
---
  applications:
  - name: %PROJECT_NAME%
    memory: 256M
    host: %PROJECT_HOST_NAME%
    buildpack: nodejs_buildpack
    command: node server

```

 - Update the appropriate values in the app's `./src/config/config.json`:

```json
{
    "appName": "%APP_NAME%",
    "useEcobar": true,
    "classificationBannerColor": "green",
    "maximumSystemClassification": "UNCLASSIFIED",
    "geoaxis" : {
        "redirectUrl" : "%REGISTERED_REDIRECT_URL%",
        "enabled" : true || false
    },
    "apiUrl": "%APP_API_URL%" || "%REGISTERED_REDIRECT_URL%/api"
}
```

 -  Update the `README.md` with your project's documentation:
 - - (Don't worry, you can always find the original README [here](https://gitlab.gs.mil/NGA_TDGI_Projects/TDGI_React_Template/tree/master)

 - Delete the `./docs/` subdir when you are done with it.  (This is template specific documentation, so it's not necessary that you keep it.)

 - **Please don't forget to [write unit tests](docs/jest.md#writing-unit-tests) as you develop your application.**  We :heart: Test Driven Development!

*:tada: :art: Go forth and make cool stuff! :art: :tada:*

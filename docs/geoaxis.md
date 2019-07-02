# GeoAxis Integration

- - - -

## Index

1.  [Requiring Authentication](#requiring-authentication)
1.  [Configuring Endpoints](#configuring-endpoints)
1.  [Integrating with GeoAxis Walkthrough](#integrating-with-geoaxis)
  1.  [Registering Redirect URLs](#registering-redirect-urls)

- - - -
- - - -

## Requiring Authentication

You can enable or disable the baked-in GeoAxis integration by changing the boolean value `enabled` in the template's configuration file.

The configuration file can be found at `~/config/config.json`.  

When the configuration's `geoaxis.enbaled` is set to `true`, the application will direct users to a log-in screen unless a valid GeoAxis Authentication Token is found in the browser's local storage.  The log-in screen will re-direct the browser window to GeoAxis' login screen, where the user will need to authenticate.  The Authenication process will then follow the typical OAuth2 workflow.

When the configuration's `geoaxis.enabled` is set to `false`, the application will render normally without requiring an Authentication Token.  This is useful for local development, but discouraged for production.

- - - -

## Configuring Endpoints

The baked-in GeoAxis integration utilizes Pivotal Cloud Foundry's Single Sign On (SSO) tile, and the OAuth v2 authentication method.

The client-side react application should be bound to a SSO service tile, which will inject the SSO credentials into the application's environment variables.  These credentials are handled by the Express.js server set up in the `./server` directory to handle the OAuth v2 workflow.  

The `config.geoaxis.redirectUrl` value is the url which GeoAxis will re-direct the browser window to once the user has successfully authenticated.  This should be either the URL of your deployed application, or a locally-resolvable URL, like `http://lvh.me:8080`, for local development.  It is necessary for this URL to be [registered](#registering-redirect-urls) with the SSO tile being used.

- - - - 

## Configuring the SSO Tile

Unclass PCF's SSO Tile currently only fully supports GeoAxis integration in the .mil environment.  Before attempting to authenticate using the bound SSO Tile, you will need to ensure that it is properly configured to utilize GeoAxis.

Navigate to the ORG and Space in which your application is deployed in [PCF's UI](https://apps.system.dev.east.paas.nga.mil).  To reach the SSO Tile configuration, navigate to `Services` > `Single Sign On` > `YOUR BOUND APPLICATION NAME`.

Under `Identity Providers`, make sure that the only active provider (button with a blue backgroun) is `GeoAxis`, and not `Internal User Store`.

Hit the `Save Config` button in the bottom right corner of the page.

- - - -
- - - -

## Integrating with GeoAxis

The template's geoaxis.js script, heavily commented to show what exactly it's doing:

```javascript
// controllers/geoaxis.js

import request from 'request-promise';
import ls from 'local-storage';
import CONFIG from '../../config/config.json';

// ******************************************
//  Using the GeoAxis Module:
//    Three methods are exported from the
//    module for use virtually anywhere in
//    the applciation: login(), getUserInfo(),
//    and getToken().
//
//  loggedIn() -  Checks for the existance
//    and validity of a geoaxis authentication
//    token in local storage.  On not finding
//    a valid token, checks for the existance
//    of an auth code as a parameter in the
//    window's URL.  If a code is found,
//    the code is passed to the SSO API in
//    exchange for an authentication token.
//    Stores authentication tokens in local
//    storage.  Returns true if a valid token
//    exists at the end of the workflow, and
//    false if the user needs to authenticate.
//
//  getUserInfo() - Uses a valid authentication
//    token to retrieve the user information
//    of the logged in user from the SSO API's
//    /userInfo endpoint.  Generally consists
//    of an email address, unique user ID,
//    and a First and Last name, badly parsed
//    from the user's email address (a
//    contractor will generally have .ctr
//    appended to his last name).
//
//  getToken() - returns the users' gx token
//    from localstorage.
//
//  getRedirectUrl() - return's the SSO
//    redirectUrl that the sender should
//    navigate to to log in.
// ******************************************
module.exports = {
    loggedIn,
    logout: removeToken,
    getRedirectUrl,
    getUserInfo,
    getToken,
};

// authentication workflow
async function loggedIn() {
    // check local storage for valid auth token
    const hasValidToken = await doesValidTokenExist();
    if (!hasValidToken) {
        // check URL for auth code
        const authCode = await parseCodeFromURL();
        if (!authCode) {
            // return false
            return false;
        }
        // trade the code for a token
        const token = await tradeCodeForToken(authCode);
        if (!token) {
            // return false
            return false;
        }
        // save token to local storage
        storeToken(token);
        const user = await getUserInfo();
        if (!user) return false;
        return true;
    }
    const user = await getUserInfo();

    if (!user) return false;
    return true;
}

// check for and validate token from localstorage
async function doesValidTokenExist() {
    const token = ls.get('gxToken');
    if (typeof (token) === 'string') {
        const valid = await getUserInfo();
        if (!valid) return false;
        return valid;
    }
    return false;
}

// store token in localstorage
function storeToken(token) {
    ls.set('gxToken', token);
    // if (!stored) console.error('gx token not saved to localstorage');
}

// redirect the browser window to geoaxis login page
async function getRedirectUrl() {
    const url = await request({
        url: `${CONFIG.geoaxis.redirectUrl}/api/redirectUrl`,
        followRedirect: false,
        resolveWithFullResponse: true,
    }).then(resp => resp.redirectUrl, err =>
        null);
    return url;
}

// check for and parse and authentication code from the url
function parseCodeFromURL() {
    let url = window.location.href;

    url = url.split('?code=');

    if (url.length > 1) return url[1];
    return false;
}

// trade your auth code for a shiny auth token
async function tradeCodeForToken(code) {
    let token = await request({
        url: `${CONFIG.geoaxis.redirectUrl}/api/token/${code}`,
    }).then((resp) => {
        token = JSON.parse(resp);
        if (token.access_token) {
            token = token.access_token;
            return token;
        }
        return false;
    }, err =>
        // console.error(err);
        false);

    return token;
}

// returns the gx token from localstorage
function getToken() {
    return ls.get('gxToken');
}

// deletes gx token from localstorage
function removeToken() {
    return ls.remove('gxToken');
}

// pull user name and email address
async function getUserInfo() {
    const userInfo = await request({
        url: `${CONFIG.geoaxis.redirectUrl}/api/userInfo`,
        headers: { Authorization: `Bearer ${ls.get('gxToken')}` },
        method: 'POST',
    }).then((resp) => {
        let user = {};
        try {
            user = JSON.parse(resp);
        } catch (e) {
            user = resp;
        }
        return user;
    }, (error) => {
        removeToken();
        return false;
    });

    return userInfo;
}
```

*TODO*
*~ Setting up GeoAxis integration from scratch section. ~*

### Registering Redirect URLs - *TODO*

- - - -

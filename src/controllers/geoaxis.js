/**
* @module geoaxis
*
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/

import request from 'request-promise';
import ls from 'local-storage';
import CONFIG from 'config/config.json';

const gx = {
    loggedIn,
    logout: removeToken,
    getRedirectUrl,
    getUserInfo,
    getToken,
};

/**
* Checks for the existance
* and validity of a geoaxis authentication
* token in local storage.  On not finding
* a valid token, checks for the existance
* of an auth code as a parameter in the
* window's URL.  If a code is found,
* the code is passed to the SSO API in
* exchange for an authentication token.
* Stores authentication tokens in local
* storage.  Returns true if a valid token
* exists at the end of the workflow, and
* false if the user needs to authenticate.
*/
async function loggedIn() {
    /** check local storage for valid auth token */
    const hasValidToken = await doesValidTokenExist();
    if (hasValidToken) return true;
    /** check URL for auth code */
    const authCode = await parseCodeFromURL();
    if (!authCode) return false;
    /** trade the code for a token */
    const token = await tradeCodeForToken(authCode);
    if (!token) return false;
    /** save token to local storage */
    storeToken(token);
    const user = await getUserInfo();
    if (!user) return false;
    return true;
}

/**
* check for and validate token from localstorage
*/
async function doesValidTokenExist() {
    const token = ls.get('gxToken');
    if (typeof (token) === 'string') {
        const valid = await getUserInfo();
        if (!valid) return false;
        return valid;
    }
    return false;
}

/**
* store token in localstorage
*/
function storeToken(token) {
    ls.set('gxToken', token);
}

/**
* redirect the browser window to geoaxis login page
*/
async function getRedirectUrl() {
    const url = await request({
        url: `${CONFIG.apiUrl}/auth/redirect?redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`,
        followRedirect: false,
        resolveWithFullResponse: true,
    }).then((resp) => {
        const response = JSON.parse(resp.body);
        return response.redirectUrl;
    }).catch(err => null);
    return url;
}

/**
* check for and parse and authentication code from the url
*/
function parseCodeFromURL() {
    let url = window.location.href;
    url = url.split('?code=');
    if (url.length > 1) return url[1];
    return false;
}

/**
* trade your auth code for a shiny auth token
*/
async function tradeCodeForToken(code) {
    let token = await request({
        url: `${CONFIG.apiUrl}/auth/token?code=${code}&redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`,
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

/**
* returns the gx token from localstorage
*/
function getToken() {
    return ls.get('gxToken');
}

/**
* deletes gx token from localstorage
*/
function removeToken() {
    return ls.remove('gxToken');
}

/**
* Uses a valid authentication
* token to retrieve the user information
* of the logged in user from the SSO API's
* /userInfo endpoint.  Generally consists
* of an email address, unique user ID,
* and a First and Last name, badly parsed
* from the user's email address (a
* contractor will generally have .ctr
* appended to his last name).
*/
async function getUserInfo() {
    const userInfo = await request({
        url: `${CONFIG.apiUrl}/auth/userinfo`,
        headers: { Authorization: `Bearer ${ls.get('gxToken')}` },
        method: 'GET',
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

    ls.set('gxUser', userInfo);

    return userInfo;
}

export default gx;

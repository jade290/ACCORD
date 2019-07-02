// server/app.js
const express = require('express');
const path = require('path');
const http = require('https');
const base64 = require('base-64');
const oauthVars = require('./envVars.js').getEnvVars();

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// GET registered redirectUrl
app.get('/api/auth/redirect', (req, res) => {
    res.status(200).json({
        redirectUrl: `${oauthVars.authURL}/oauth/authorize?client_id=${oauthVars.clientID}`
        + `&response_type=code&scope=&redirect_uri=${oauthVars.redirectURL}`,
    });
});

// GET trade auth code for auth token
app.get('/api/auth/token', (req, res) => {
    const encodedCreds = base64.encode(`${oauthVars.clientID}:${oauthVars.clientSecret}`);
    const urlNoProtocol = oauthVars.authURL.replace(/^https?:\/\//i, '');
    const options = {
        host: urlNoProtocol,
        path: `/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${oauthVars.redirectURL}`
        + `&redirect_uri=${oauthVars.redirectURL}`,
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedCreds}`,
        },
        rejectUnauthorized: false,
    };
    const request = http.request(options, (httpRes) => {
        httpRes.setEncoding('utf8');
        httpRes.on('data', (chunk) => {
            res.status(httpRes.statusCode).json(chunk);
        });
    });
    request.on('error', (err) => {
        res.status(401).json(err.message);
    });
    request.end();
});

// GET user info
app.get('/api/auth/userinfo', (req, res) => {
    const header = req.header('Authorization');
    const urlNoProtocol = oauthVars.authURL.replace(/^https?:\/\//i, '');
    const options = {
        host: urlNoProtocol,
        path: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: header,
        },
        rejectUnauthorized: false,
    };
    const request = http.request(options, (httpRes) => {
        httpRes.setEncoding('utf8');
        httpRes.on('data', (chunk) => {
            res.status(httpRes.statusCode).json(chunk);
        });
    });
    request.on('error', (err) => {
        res.status(401).json(err.message);
    });
    request.end();
});

// Catch all non-'/api/' routes and return the client ui
// Always return the main index.html, so react-router render the route in the client
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;

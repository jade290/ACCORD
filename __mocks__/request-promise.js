/** @module mocks/request-promise */
import CONFIG from './__mocks__/config.json';
import MockUser from '../src/mockData/user.json';

/** mock request object for unit testing */
export default function request(config) {
    let promise;
    switch (config.url) {
        case `${CONFIG.apiUrl}/auth/redirect?redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`:
            promise = new Promise((resolve, reject) => {
                resolve({ body: JSON.stringify({ redirectUrl: 'http://example.com' }) });
            });
            break;
        case `${CONFIG.apiUrl}/auth/token?code=example_code&redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`:
            promise = new Promise((resolve, reject) => {
                resolve(JSON.stringify({ access_token: 'returnUser' }));
            });
            break;
        case `${CONFIG.apiUrl}/auth/token?code=example_code_fail&redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`:
            promise = new Promise((resolve, reject) => {
                resolve(JSON.stringify({ access_token: 'dont_returnUser' }));
            });
            break;
        case `${CONFIG.apiUrl}/auth/token?code=example_code_fail_token&redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`:
            promise = new Promise((resolve, reject) => {
                reject(new Error('fail'));
            });
            break;
        case `${CONFIG.apiUrl}/auth/token?code=example_code_no_access_token&redirectUrl=https://${CONFIG.geoaxis.redirectUrl}`:
            promise = new Promise((resolve, reject) => {
                resolve(JSON.stringify({ notaccess_token: 'test' }));
            });
            break;
        case `${CONFIG.apiUrl}/auth/userinfo`:
            if (config.headers) {
                if (config.headers.Authorization === 'Bearer returnUser') {
                    promise = new Promise((resolve, reject) => {
                        resolve(JSON.stringify(MockUser));
                    });
                } else if (config.headers.Authorization === 'Bearer returnUserJson'
                    || config.headers.Authorization === 'Bearer example_token') {
                    promise = new Promise((resolve, reject) => {
                        resolve(MockUser);
                    });
                } else if (config.headers.Authorization) {
                    promise = new Promise((resolve, reject) => {
                        reject(new Error('fail'));
                    });
                } else {
                    promise = new Promise((resolve, reject) => {
                        reject(new Error('authorization header not sent with request'));
                    });
                }
            } else {
                promise = new Promise((resolve, reject) => {
                    reject(new Error('authorization header not sent with request'));
                });
            }
            break;
        default:
            promise = new Promise((resolve, reject) => {
                reject(new Error('Unknown request url'));
            });
            break;
    }
    return promise;
}

/** @module redux/middleware/dataservice */
import request from 'request-promise';
import * as Actions from 'redux/actionTypes';
import CONFIG from 'config/config.json';
import mockData from 'mockData';
import gx from 'controllers/geoaxis';

const UseAPI = CONFIG.geoaxis.enabled && !CONFIG.devmode;

const mockUserInfo = mockData.user;

let token = null;

/**
* dataservice middleware intercepts dispatched actions and performs API calls as necessary
* @param {class} store - redux store
* @param {function} next - perform next action
*/
const dataservice = store => next => (action) => {
    // set auth token to Authorization header
    if (token === null) token = gx.getToken();
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        json: true,
    };
    let resolve;
    if (!UseAPI) {
        switch (action.type) {
            case Actions.user.getUser:
                resolve = next({
                    type: Actions.user.setUser,
                    userinfo: mockUserInfo,
                });
                break;
            default:
                resolve = next(action);
                break;
        }
    } else {
        switch (action.type) {
            case Actions.user.getUser:
                requestOptions.url = `${CONFIG.apiUrl}/auth/userinfo`;
                requestOptions.method = 'GET';
                request(requestOptions)
                    .then((resp) => {
                        resolve = next({
                            type: Actions.user.setUser,
                            userinfo: resp,
                        });
                    }).catch((err) => {
                        resolve = next({
                            type: Actions.user.setError,
                            error: err,
                        });
                    });
                break;
            default:
                resolve = next(action);
                break;
        }
    }
    return resolve;
};

export default dataservice;

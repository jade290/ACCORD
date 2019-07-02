/** @module redux/reducers/alerts */

import { merge } from 'lodash';
import * as Actions from '../actionTypes';

const initialState = [];
const successType = 'success';
const errorType = 'error';

/**
* create a new alert object
* @param {string} type - type of alert ['success', 'error']
* @param {string} message - alert message
* @returns {object} alert object containing message, type, and id
*/
function createAlert(type, message) {
    const timestamp = new Date().toISOString();
    return {
        message,
        type,
        id: `${message}-${timestamp}`,
    };
}

/**
* formats an error message
* @param {number} statusCode - http status code of failure
* @param {string} failure - message specific to failure
* @returns {string} formatted error message
*/
function formatError(statusCode, failure) {
    return `${statusCode} - There was a technical problem ${failure}.`;
}

/**
* @function reducer
* @param {object} state - previous state
* @param {object} action - dispatched action
* @param {string} action.type - dispatched action identifier
* @returns {object} new state
*/
export default (state = initialState, action) => {
    const clonedState = merge([], state);
    let type = '';
    let msg = '';
    switch (action.type) {
        case Actions.alerts.hideAlert:
            return clonedState.filter(s => s.id !== action.id);
        case Actions.alerts.generateAlert:
            msg = action.message;
            type = successType;
            break;
        case Actions.user.setError:
            msg = formatError(action.error.statusCode, 'retrieving user information');
            type = errorType;
            break;
        default:
            return state;
    }
    clonedState.push(createAlert(type, msg));
    return clonedState;
};

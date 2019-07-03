/** @module redux/actions */
import * as Actions from '../actionTypes';

/**
* actions for the user reducer
*/
export const user = {
    /**
    * @function getUser
    */
    getUser: () => (dispatch) => {
        dispatch({
            type: Actions.user.getUser,
        });
    },
    /**
    * @function setUser
    * @param {object} userinfo - userinfo object
    */
    setUser: userinfo => (dispatch) => {
        dispatch({
            type: Actions.user.setUser,
            userinfo,
        });
    },
    /**
    * @function setError
    * @param {string} error - error message
    */
    setError: error => (dispatch) => {
        dispatch({
            type: Actions.user.setError,
            error,
        });
    },
};

/**
* actions for the alerts reducer
*/
export const alerts = {
    /**
    * @function hideAlert
    * @param {string} id - id of the alert to dismiss
    */
    hideAlert: id => (dispatch) => {
        dispatch({
            type: Actions.alerts.hideAlert,
            id,
        });
    },
    /**
    * @function generateAlert
    * @param {string} message - message to alert user to
    */
    generateAlert: message => (dispatch) => {
        dispatch({
            type: Actions.alerts.generateAlert,
            message,
        });
    },
};

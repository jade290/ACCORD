/** @module redux/reducers/user */
import { merge } from 'lodash';
import * as Actions from '../actionTypes';

const initialState = {
    fullName: '',
    email: '',
    id: '',
    bio: '',
    avatar: '',
    skills: [],
    color: '',
    role: 'customer',
};

/**
* @function reducer
* @param {object} state - previous state
* @param {object} action - dispatched action
* @param {string} action.type - dispatched action identifier
* @returns {object} new state
*/
export default (state = initialState, action) => {
    const tempState = {};
    switch (action.type) {
        /** set user info to state */
        case Actions.user.setUser:
            return merge({}, state, tempState, action.userinfo);
        default:
            return state;
    }
};

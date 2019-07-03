/** @module redux/reducers/combined */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user';
import alerts from './alerts';

/**
* @method combineReducers
* @param {class} history - browser history
* @returns {class} combined redux reducers
*/
export default history => combineReducers({
    router: connectRouter(history),
    user,
    alerts,
});

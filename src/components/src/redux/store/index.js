/** @module redux/store */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import dataserviceMiddleware from '../middleware/dataservice';
import reducers from '../reducers';

/**
* creates a redux store from reducers, middleware
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
* @param {class} history - browser history
* @func configureStore
*/
export default function configureStore(history) {
    return createStore(reducers(history), applyMiddleware(thunk, dataserviceMiddleware, routerMiddleware(history)));
}

/** @module views */

import CONFIG from 'config/config.json';
import LeafletQuickStart from 'views/LeafletQuickStart';

/**
* view registry
* views will not appear in app routing or navbar until they are exported from this file
*/

/**
* to add a new view, import it above and then add an object ot the following array
*
* @const
* @global
* @typedef Views
*
* @prop {object} view - object defining the application view
* @prop {string} view.path - url path on which to display the view
* @prop {bool} view.exact - should react-router strictly match the view to the path name
* @prop {(function | class)} view.view - react component to render when this path is matched
* @prop {string} view.name - name to display in the app's navbar
* @prop {string} componentName - name of the exported component, used in unit test suite to locate
* rendered component
*/
export default [
    /** home page - matches root ('/') path */
    {
        path: '/',
        exact: true,
        view: LeafletQuickStart,
        name: CONFIG.appName,
        componentName: 'leafletQuickStart',
    },
];

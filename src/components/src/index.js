/** @module index */

import 'isomorphic-fetch';
import 'raf/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import gx from 'controllers/geoaxis';
import CONFIG from 'config/config.json';

/** dynamic import statements allow code-splitting of app and login view */
const AsyncLogin = React.lazy(() => import('views/Login'));
const AsyncApp = React.lazy(() => import('App'));

/** wrap App component in a fallback component for lazy loading */
const App = (
    <div>
        <Suspense
            fallback={<span>Loading</span>}
        >
            <AsyncApp loggedIn />
        </Suspense>
    </div>
);

/** wrap Login component in a fallback component for lazy loading */
const Login = (
    <div>
        <Suspense
            fallback={<span>Loading</span>}
        >
            <AsyncLogin />
        </Suspense>
    </div>
);

/** render the react app into the html element with the id 'root' */
async function renderApp() {
    if (document.title !== CONFIG.appName) document.title = CONFIG.appName;
    if (CONFIG.geoaxis.enabled) {
        const loggedIn = await gx.loggedIn();
        if (loggedIn) {
            ReactDOM.render(App, document.getElementById('root'));
        } else {
            ReactDOM.render(Login, document.getElementById('root'));
        }
    } else {
        ReactDOM.render(App, document.getElementById('root'));
    }
}

/** init app */
renderApp();

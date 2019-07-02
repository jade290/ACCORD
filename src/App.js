/** @module App */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import ReduxStore from './redux/store';
import Router from './Router';

import './style.less';
import './theme.less';

const history = createBrowserHistory();

const store = ReduxStore(history);

/**
* Root App Component
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/
class App extends Component {
    state = {};

    /**
    * render method returns Redux Provider wrapped Router
    */
    render() {
        return (
            <Provider store={store}>
                <Router history={history} />
            </Provider>
        );
    }
}

export default App;

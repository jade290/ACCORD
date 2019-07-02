/** @module Router */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import * as Actions from 'redux/actions';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import NotFound from 'views/NotFound';
import Views from 'views';
import Alerts from 'components/AlertSystem';

/**
* Dynamic routing using 'react-router-dom'
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/
export class RouterComponent extends Component {
    state = {};

    /**
    * Initial call to get GX user info
    */
    componentDidMount() {
        this.props.getUser();
    }

    renderRoute = route => (
        <Route
            key={route.componentName}
            path={route.path}
            exact={route.exact}
            render={routeProps => (
                <route.view {...routeProps} />
            )}
        />
    );

    /**
    * Returns Routed App
    */
    render() {
        return (
            <Router history={this.props.history} >
                <div id="app">
                    <Alerts />
                    <Navbar />
                    <div id="content">
                        <Switch>
                            {Views.map(route => this.renderRoute(route))}
                            <Route key="404" render={() => <NotFound />} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

/**
* @prop {function} getUser - method to get userinfo
* @prop {function} getBlogPosts - method to get blog posts
*/
RouterComponent.propTypes = {
    getUser: PropTypes.func.isRequired,
    history: PropTypes.shape({}).isRequired,
};

RouterComponent.defaultProps = {};

/**
* map redux state to component props
*/
const mapStateToProps = state => ({});

/**
* map redux dispatch methods to component props
*/
const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(Actions.user.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

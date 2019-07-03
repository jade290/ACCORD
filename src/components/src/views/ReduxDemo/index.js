/** @module views/ReduxDemo */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';

import 'views/ReduxDemo/style.less';

/**
* Redux Demo
*
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/
export class ReduxDemoComponent extends Component {
    state = {
        message: '',
    };

    updateMessage = (e) => {
        this.setState({
            message: e.target.value,
        });
    }

    postAlert = () => {
        const alert = `${this.props.user.given_name} (${this.props.user.email}) says: ${this.state.message}`;
        this.props.generateAlert(alert);
    }

    /**
    * returns ReduxDemo component
    */
    render() {
        return (
            <div id="redux-demo">
                <Jumbotron>
                    <h1>Redux Demo</h1>
                </Jumbotron>
                <div className="alert-form">
                    <p>
                        {this.props.user.given_name} ({this.props.user.email}) says:
                    </p>
                    <textarea
                        onChange={this.updateMessage}
                        id="alert-input"
                    />
                    <div className="button-wrapper">
                        <button
                            onClick={this.postAlert}
                        >
                            Trigger Alert
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
* @prop {Object} user - user info
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
* @prop {func} generateAlert - create new alert
*/
ReduxDemoComponent.propTypes = {
    user: PropTypes.shape({
        given_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    generateAlert: PropTypes.func.isRequired,
};

/**
* maps redux state to components props
* @prop {Object} user - logged in user
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
*/
const mapStateToProps = state => ({
    user: state.user,
});

/**
* maps redux dispatch methods to components props
*/
const mapDispatchToProps = dispatch => ({
    generateAlert: message => dispatch(Actions.alerts.generateAlert(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemoComponent);

/** @module components/ThankYou */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';

import 'components/ThankYou/style.less';

/**
* ThankYou
*
*/
export class ThankYouComponent extends Component {
    /**
    * returns ThankYou component
    */
    render() {
        return (
            <div id="thankyou" onSubmit={this.handleFormSubmit}>
                <Jumbotron>
                    <h1>Thank you {this.props.user.given_name} for your submission!</h1>
                </Jumbotron>
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

ThankYouComponent.propTypes = {
    user: PropTypes.shape({
        given_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

/**
* maps redux state to components props
* @prop {Object} user - logged in user
* @prop {string} user.given_name - users name
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

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouComponent);

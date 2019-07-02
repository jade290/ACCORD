/** @module views/Contact */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';

import 'views/Contact/style.less';
import ThankYou from '../../components/ThankYou';

/**
* Contact
*
*/
export class ContactComponent extends Component {
    state = {
        message: '',
        name: '',
        email: '',
        phone: '',
        showMe: true,
    };
    onSubmit = (e) => {
        this.setState({ showMe: false });
    }
    setName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }
    setEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    setPhone = (e) => {
        this.setState({
            phone: e.target.value,
        });
    }
    updateMessage = (e) => {
        this.setState({
            message: e.target.value,
        });
    }
    postAlert = () => {
        const alert = `${this.props.user.given_name} (${this.props.user.email}) 
            says: ${this.state.message} name: ${this.state.name} phone: ${this.state.phone}
            email: ${this.state.email}`;
        this.props.generateAlert(alert);
    }

    /**
    * returns Contact component
    */
    render() {
        if (this.state.showMe) {
        return (
            <form id="contact" onSubmit={this.onSubmit}>
                <Jumbotron>
                    <h1>Contact Us</h1>
                </Jumbotron>
                <div className="alert-form">
                    <p>
                        {this.props.user.given_name} ({this.props.user.email}) says:
                    </p>
                    <div>
                        <label htmlFor="name">Name:</label><br />
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={this.props.user.given_name}
                            onChange={this.setName}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label><br />
                        <input
                            id="phone"
                            type="Phone"
                            placeholder="Enter your phone number"
                            onChange={this.setPhone}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="emailAddress">Email Address:</label><br />
                        <input
                            id="emailAddress"
                            type="Email"
                            value={this.props.user.email}
                            placeholder="Enter your email address"
                            onChange={this.setEmail}
                        />
                    </div>
                    <div>
                        <label htmlFor="subcribe">Would you like to subscribe to our weekly newsletter?</label><br />
                        <select id="subcribe">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label><br />
                        <textarea
                            onChange={this.updateMessage}
                            id="message"
                        />
                    </div>
                    <div className="button-wrapper">
                        <a href="/Home">
                            <button id="btnCancel">
                                Cancel
                            </button>
                        </a>
                        <button
                            id="btnSubmit"
                            onClick={this.postAlert}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>);
    }
    return (<ThankYou />);
    }
}

/**
* @prop {Object} user - user info
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
* @prop {func} generateAlert - create new alert
*/
ContactComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactComponent);

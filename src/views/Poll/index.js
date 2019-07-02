/** @module views/Poll */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';

import 'views/Poll/style.less';
import ThankYou from '../../components/ThankYou';

/**
* Poll
*
*/
export class PollComponent extends Component {
    /**
    * Poll component constructor
    */
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: 'option1',
          showMe: true,
        };
      }
      onSubmit = (e) => {
          this.setState({ showMe: false });
        }
    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value,
        });
      }

    /**
    * returns Poll component
    */
    render() {
        if (this.state.showMe) {
        return (
            <div>
                <form id="poll" onSubmit={this.onSubmit}>
                    <Jumbotron>
                        <h1>Icecream Poll</h1>
                    </Jumbotron>
                    <div className="alert-form">
                        <p>
                            {this.props.user.given_name} ({this.props.user.email}):
                        </p>
                        <div>
                            <p>Which flavor of icecream is your favorite?</p>
                        </div>
                        <div className="form-check">
                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option1"
                                    checked={this.state.selectedOption === 'option1'}
                                    onChange={this.handleOptionChange}
                                    className="form-check-input"
                                />
                                Mint Chocolate Chip
                            </label>
                        </div>
                        <div className="form-check">
                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option2"
                                    checked={this.state.selectedOption === 'option2'}
                                    onChange={this.handleOptionChange}
                                    className="form-check-input"
                                />
                                Strawberry Cheesecake
                            </label>
                        </div>
                        <div className="form-check">
                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option3"
                                    checked={this.state.selectedOption === 'option3'}
                                    onChange={this.handleOptionChange}
                                    className="form-check-input"
                                />
                                Cake Batter
                            </label>
                        </div>
                        <div className="form-group">
                            <br />
                            <a href="/Poll">
                                <button id="btnCancel">
                                    Cancel
                                </button>
                            </a>
                            <button className="btn btn-primary mt-2" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>);
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
PollComponent.propTypes = {
    user: PropTypes.shape({
        given_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PollComponent);

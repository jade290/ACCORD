/** @module components/AlertSystem */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTimes } from '@fortawesome/fontawesome-free-solid';
import * as Actions from 'redux/actions';
import 'components/AlertSystem/style.less';

/**
* Displays error and success messages
*
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/
export class AlertSystemComponent extends Component {
    state = {};

    /**
    * returns the AlertSystem component
    */
    render() {
        return (
            <div id="alerts">
                {this.props.alerts.map(alert => (
                    <div
                        key={alert.id}
                        className={`alert ${alert.type}`}
                    >
                        <span className="badge">
                            <Icon icon={faExclamation} />
                        </span>
                        {alert.message}
                        <button
                            className="close-btn"
                            onClick={() => this.props.hideAlert(alert.id)}
                        >
                            close <Icon icon={faTimes} />
                        </button>
                    </div>
                ))}
            </div>
        );
    }
}

/**
* @prop {array} alerts - array of alert messages to display to the user
* @prop {object} alerts.alert - alert object to display to the user
* @prop {string} alerts.alert.id - unique id for an individual alert
* @prop {sting} alerts.alert.type - type of alert
* @prop {message} alerts.alert.message - message of alert
* @prop {function} hideAlert - method to remove an alert from the alerts array
*/
AlertSystemComponent.propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        message: PropTypes.string,
    })),
    hideAlert: PropTypes.func.isRequired,
};

AlertSystemComponent.defaultProps = {
    alerts: [],
};

/**
* map redux state to component props
*/
const mapStateToProps = state => ({
    alerts: state.alerts,
});

/**
* map redux dispatch methods to component props
*/
const mapDispatchToProps = dispatch => ({
    hideAlert: id => dispatch(Actions.alerts.hideAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSystemComponent);

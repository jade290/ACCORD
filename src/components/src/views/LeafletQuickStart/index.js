/** @module views/LeafletQuickStart */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'views/LeafletQuickStart/style.less';

import EditableDrawMap from '../../components/EditableDrawMap';

/**
* LeafletQuickStart
*
*/
export class LeafletQuickStartComponent extends Component {
    /**
    * returns LeafletQuickStart component
    * Tutorial @ https://medium.com/@eugenebelkovich/map-for-react-apps-with-leaflet-365f9df82d55
    */
    render() {
        return (
            <EditableDrawMap />
          );
    }
}

/**
* @prop {Object} user - user info
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
*/
LeafletQuickStartComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LeafletQuickStartComponent);

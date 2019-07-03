/** @module views/LeafletTest */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';

import 'views/LeafletTest/style.less';
import Map from '../../components/Map';
/**
* LeafletTest
*
*/
export class LeafletTestComponent extends Component {
    /**
    * returns LeafletTest component
    * Tutorial @ https://medium.com/@eugenebelkovich/map-for-react-apps-with-leaflet-365f9df82d55
    */
    render() {
        return (
            <div id="leafletTest">
                <Map center={[50, 10]} zoom={6} maxZoom={10} easeLinearity={0.35} />
            </div>
          );
    }
}

/**
* @prop {Object} user - user info
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
*/
LeafletTestComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LeafletTestComponent);

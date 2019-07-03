/** @module views/Map */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from 'redux/actions';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import 'components/EditableDrawMap/style.less';

const center = '';
const zoom = '';
const maxZoom = '';
const easeLinearity = '';
const noWrap = true;
/**
* Map
*
*/
export class EditableDrawMapComponent extends Component {
    /**
    * returns Map component
    * Tutorial @ https://medium.com/@eugenebelkovich/map-for-react-apps-with-leaflet-365f9df82d55
    */
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    /**
    * returns Map component
    * Tutorial @ https://medium.com/@eugenebelkovich/map-for-react-apps-with-leaflet-365f9df82d55
    */
    render() {
        return (
            <LeafletMap
                center={[50, 10]}
                zoom={3}
                maxZoom={10}
                easeLinearity={0.35}
                minZoom={2}
            >
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={[50, 10]}>
                    <Popup>
                    Popup for any custom information.
                    </Popup>
                </Marker>
            </LeafletMap>
          );
    }
}

/**
* @prop {Object} user - user info
* @prop {string} user.given_name - users name
* @prop {string} user.email - users email address
*/
EditableDrawMapComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableDrawMapComponent);

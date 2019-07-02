/** @module components/Navbar */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import gx from 'controllers/geoaxis';
import ClassificationBanner from 'components/ClassificationBanner';
import Views from 'views';
import CONFIG from 'config/config.json';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBBtn, MDBModal,
MDBModalBody, MDBModalHeader, MDBModalFooter,
} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './style.less';

/** Commnet */
class Navbar extends Component {
    state = {
      isOpen: false,
      modal: false,
    };
    toggleCollapse = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
      }

    /** renders the app's navigation bar */
    render() {
        return (
            <MDBNavbar color="default-color" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">ACCORD</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">File</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="/">Map Control</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Query Database</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Device Allocation</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Purge On-Line Data</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">History Log</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Catalog</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Media</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Data Warehouse</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Jobs</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Define Dataset</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Reformat</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Archive</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Retrieve Archive</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Merge DCHUM</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Media Master</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Job Control</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Quality</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Source</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Output</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Tools</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Change Password</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">File Manager</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Print Control</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Snapshot</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Text Editor</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">CHUM</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Transaction</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Frame</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">History</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Help</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">System Administration</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">System Operation</MDBDropdownItem>
                                    <MDBDropdownItem href="#" onClick={this.toggle}>About ACCORD</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Logout</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBContainer>
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>About ACCORD</MDBModalHeader>
                                <MDBModalBody>
                                    Automated Cataloging and Compression of Raster Data<br />
                                    Version 1.0<br />
                                    Produced by Intergraph Federal
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

/**
* @prop {object} user - userinfo of the logged in user
* @prop {string} given_name - user's full name
*/
Navbar.propTypes = {
    user: PropTypes.shape({
        given_name: PropTypes.string,
    }),
};

/** default the userinfo object to an empty user */
Navbar.defaultProps = {
    user: {
        given_name: '',
    },
};

export default Navbar;

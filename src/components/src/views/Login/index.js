/** @module views/Login */

import React, { Component } from 'react';
import { Alert, Jumbotron } from 'react-bootstrap';
import gx from 'controllers/geoaxis';

import 'views/Login/style.less';

/**
* renders an authentication required message,
* link to GX login page, and the DoD Notice and Consent
* legalese
*/
class Login extends Component {
    state = {
        showAlert: false,
        redirectUrl: '',
    };

    /** componenetDidMount method executes after render() successfully finishes */
    componentDidMount() {
        this.getRedirectUrl();
    }

    /** get GX login url from API */
    async getRedirectUrl() {
        const redirectUrl = await gx.getRedirectUrl();
        if (redirectUrl !== null && redirectUrl !== false) this.setState({ redirectUrl });
        else {
            this.setState({ showAlert: true });
        }
    }

    /** render an error message if the GX login url could not be acquired */
    renderAlert = (showAlert) => {
        if (showAlert) {
            return (<Alert bsStyle="danger">An Error Occurred.</Alert>);
        }
        return ('');
    }

    /** return login component */
    render() {
        return (
            <div id="login">
                <Jumbotron id="login-jumbotron">
                    <h1>Authentication Required</h1>
                </Jumbotron>
                <div id="login-body">
                    {this.renderAlert(this.state.showAlert)}
                    <Alert bsStyle="warning" id="dod-alert">
                        <h3>DoD Notice and Consent Banner</h3>
                        <br />
                        (U) You are accessing a U.S. Government (USG) Information
                        System (IS) that is provided for USG-authorized use only.
                        <br /><br />
                        (U) By using this IS (which includes any device attached to
                        this IS), you consent to the following conditions:
                        <br /><br />
                        The USG routinely intercepts and monitors communications on
                        this IS for purposes including, but not limited to,
                        penetration testing, COMSEC monitoring, network operations
                        and defense, personnel misconduct (PM), law enforcement (LE),
                        and counterintelligence (CI) investigations.
                        <br /><br />
                        At any time, the USG may inspect and seize data stored on this IS.
                        <br /><br />
                        Communications using, or data stored on, this IS are not private,
                        are subject to routine monitoring, interception and search, and
                        may be disclosed or used for any USG-authorized purpose.
                        <br /><br />
                        This IS includes security measures (e.g., authentication and
                        access controls) to protect USG interests – not for your
                        personal benefit or privacy.
                        <br /><br />
                        Notwithstanding the above, using this IS does not constitute
                        consent to PM, LE or CI investigative searching or monitoring
                        of the content of privileged communications, or work product,
                        related to personal representation or services by attorneys,
                        psychotherapists, or clergy, and theirs assistants. Such
                        communications and work product are private and confidential.
                        See User Agreement for details.
                    </Alert>
                    <a className="btn btn-primary" href={this.state.redirectUrl}>Please login with GeoAxis</a>
                </div>
            </div>
        );
    }
}

export default Login;

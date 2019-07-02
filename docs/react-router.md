# react-router

- - - -

## Index

1.  [Introducing react-router](#introducing-react-router)
1.  [Using react-router](#using-react-router)

- - - -
- - - -

## Introducing react-router

Install and save react-router:

```
$ npm install --save react-router-dom
```

> :exclamation: Note: react-router, react-router-dom and react-router-native are three different packages.  Since we are using react-router in the browser, we need **react-router-dom**.

- - - -

## Using react-router

There is a great [React-Router Tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf) at Medium.  

Here's how it's done on this template:

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// importing the Browserrouter, Switch and Route
// components from the 'react-router-dom'
// module.  We are renaming the BrowserRouter
// component to just Router in this import
// statement, because it's shorter and looks
// better. You don't have to do that.  :shrug:
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import NavigationBar from './Navbar';
// importing the different view components
// that will be switched between depending
// on the route provided
import NotFound from './404';
import Home from './Home';
import FormEx from './Form-example';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.state.loggedIn = props.loggedIn;

        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }

    changeLoginStatus(bool) {
        this.setState({ loggedIn: bool });
    }

    render() {
        if (this.state.loggedIn) {
            return (
              // Our app consists of the router envelope
                <Router>
                    // One single div containing the NavigationBar and Switch component
                    <div>
                        <NavigationBar />
                        // the switch component acts as a switch statement,
                        // displaying the contents of the route's render prop
                        // if the path condition is met
                        <Switch>
                            // this route matches the / exactly.  
                            // The exact keyword is important in this case,
                            // because without it, this route will match
                            // all paths containing / (which is all of them)
                            <Route
                                path="/"
                                exact
                                render={routeProps =>
                                    <Home {...routeProps} changeLoginStatus={this.changeLoginStatus} />
                                }
                            />
                            <Route
                                path="/Home"
                                exact
                                render={routeProps =>
                                    <Home {...routeProps} changeLoginStatus={this.changeLoginStatus} />}
                            />
                            <Route
                                path="/Form"
                                exact
                                render={routeProps => (<FormEx
                                    {...routeProps}
                                    changeLoginStatus={this.changeLoginStatus}
                                />)
                                }
                            />
                            // this route does not contain a path condition
                            // and is rendered when none of the other
                            // route's path conditions are met.
                            // in terms of a switch statement,
                            // this would be the 'default' case.
                            <Route render={routeProps => <NotFound />} />
                        </Switch>
                    </div>
                </Router>
            );
        }
        return (
            <div>
                <Login />
            </div>
        );
    }
}

App.propTypes = {
    loggedIn: PropTypes.bool,
};

App.defaultProps = {
    loggedIn: false,
};

export default App;
```

And now that we have our 'Router' component set up, lets take a look at how we actually route the user, via the 'NavigationBar' component:

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import gx from '../controllers/geoaxis';
import CONFIG from '../../config/config.json';

const VIEWS = ['Home', 'Form', 'Nothing'];

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.state.user = {};
        this.getUserInfo = this.getUserInfo.bind(this);
        this.clickUsername = this.clickUsername.bind(this);
        this.renderLogout = this.renderLogout.bind(this);
    }

    // componenetDidMount method executes after render() successfully finishes
    async componentDidMount() {
        this.getUserInfo();
    }

    async getUserInfo() {
        if (CONFIG.geoaxis.enabled) {
            const user = await gx.getUserInfo();
            this.setState({ user });
        }
    }

    clickUsername() {
        gx.logout();
        this.props.changeLoginStatus(false);
    }

    renderLogout(user) {
        if (CONFIG.geoaxis.enabled) {
            return (
                <Nav pullRight>
                    <NavItem>{user.given_name}</NavItem>
                    <NavItem key="logout" active={false} onClick={this.clickUsername}> Logout</NavItem>
                </Nav>
            );
        }
        return ('');
    }

    render() {
        const activeView = window.location.href.split('/')[3] || 'Home';
        // console.log(activeView);
        return (
            <Navbar inverse style={{ height: '52px', marginBottom: '40px' }}>
                <Nav>
                    {
                        VIEWS.map(view => (
                            <NavItem key={view} active={view === activeView}
                            // the href prop on our NavItem
                            // is set to '/' + view.  So in the case of view = 'Form'
                            // this NavItem will direct the user to %PATH%/Form.
                             href={`/${view}`}>{view}</NavItem>
                        ))
                    }
                </Nav>
                {this.renderLogout(this.state.user)}
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    changeLoginStatus: PropTypes.func,
};

NavigationBar.defaultProps = {
    changeLoginStatus() {
        return 0;
    },
};

export default NavigationBar;
```

- - - -

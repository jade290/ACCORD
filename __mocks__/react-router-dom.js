// __mocks__/react-router-dom.js
/* eslint-disable */
import React from 'react';

const rrd = require('react-router-dom');

// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;

module.exports = rrd;
/* eslint-enable */

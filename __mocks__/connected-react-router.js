// __mocks__/react-router-dom.js
/* eslint-disable */
import React from 'react';

const rrd = {};

// Just render plain div with its children
rrd.ConnectedRouter = ({ children }) => <div>{children}</div>;
rrd.connectRouter = (state, action) => ({});
rrd.routerMiddleware = store => next => (action) => {};
rrd.push = () => {};

module.exports = rrd;
/* eslint-enable */

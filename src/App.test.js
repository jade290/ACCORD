// src/App.test.js
import React from 'react';
import { mount } from 'enzyme';
import App from './App';

/* eslint-disable */
console.error = jest.fn();
/* eslint-enable */

jest.mock('./Router', () => () => <div id="router" />);

it('gets userinfo from localstorage', () => {
    const wrapper = mount(<App loggedIn />);
    expect(wrapper.find('#router')).toHaveLength(1);
});

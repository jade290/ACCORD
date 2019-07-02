import React from 'react';
import { mount } from 'enzyme';
import gx from 'controllers/geoaxis';
import Login from 'views/Login/index';

jest.mock('controllers/geoaxis', () => ({
    getRedirectUrl: jest.fn(),
}));

it('renders alert when gx.getRedirectUrl returns false', (done) => {
    gx.getRedirectUrl = jest.fn(() => null);
    const wrapper = mount(<Login />);
    setTimeout(() => {
        expect(wrapper.state().showAlert).toEqual(true);
        done();
    }, 300);
});

it('renders redirecturl when gx.getRedirectUrl returns redirecturl', (done) => {
    gx.getRedirectUrl = jest.fn(() => 'redirecturl');
    const wrapper = mount(<Login />);
    setTimeout(() => {
        expect(wrapper.state().showAlert).toEqual(false);
        done();
    }, 300);
});

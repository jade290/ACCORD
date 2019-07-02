// src/views/Home/Home.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Home from 'views/Home/index';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><Home /></MemoryRouter>);
    expect(wrapper.find('#home')).toHaveLength(1);
});

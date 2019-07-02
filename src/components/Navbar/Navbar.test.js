// src/components/Navbar/Navbar.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Navbar from 'components/Navbar/index';

it('renders without crashing', () => {
    const wrapper = mount(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(wrapper.find('#navbar')).toHaveLength(1);
});

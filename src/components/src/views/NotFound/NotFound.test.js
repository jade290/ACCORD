// src/views/NotFound/NotFound.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import NotFound from 'views/NotFound/index';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(wrapper.find('.not-found')).toHaveLength(1);
});

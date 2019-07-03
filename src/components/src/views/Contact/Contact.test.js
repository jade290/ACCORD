// src/views/Contact/LeafletQuickStart.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LeafletQuickStart from 'views/LeafletQuickStart';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><LeafletQuickStart /></MemoryRouter>);
    expect(wrapper.find('#leafletQuickStart')).toHaveLength(1);
});

// src/views/Contact/Contact.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Contact from 'views/Contact';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><Contact /></MemoryRouter>);
    expect(wrapper.find('#contact')).toHaveLength(1);
});

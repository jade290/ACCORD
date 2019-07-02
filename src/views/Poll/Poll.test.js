// src/views/Poll/poll.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import poll from 'views/Poll';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><poll /></MemoryRouter>);
    expect(wrapper.find('#poll')).toHaveLength(1);
});

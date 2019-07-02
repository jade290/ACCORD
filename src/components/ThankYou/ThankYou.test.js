// src/views/ThankYou/thankyou.test.js
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import thankyou from 'views/ThankYou';

it('renders component without crashing', () => {
    const wrapper = mount(<MemoryRouter><thankyou /></MemoryRouter>);
    expect(wrapper.find('#thankyou')).toHaveLength(1);
});

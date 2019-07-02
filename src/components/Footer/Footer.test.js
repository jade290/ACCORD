// src/components/Footer/Footer.test.js
import React from 'react';
import { mount } from 'enzyme';
import Footer from 'components/Footer/index';

it('renders without crashing', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('footer')).toHaveLength(1);
});

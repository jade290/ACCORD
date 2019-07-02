// src/components/ClassificationBanner/ClassificationBanner.test.js
import React from 'react';
import { mount } from 'enzyme';
import ClassificationBanner from 'components/ClassificationBanner/index';

it('renders without crashing', () => {
    const wrapper = mount(<ClassificationBanner />);
    expect(wrapper.find('.classification-banner')).toHaveLength(1);
});

it('renders UNCLASSIFIED', () => {
    const wrapper = mount(<ClassificationBanner classification="UNCLASSIFIED" />);
    expect(wrapper.find('.classification-banner')).toHaveLength(1);
});

it('renders TOP SECRET', () => {
    const wrapper = mount(<ClassificationBanner classification="TOP SECRET" />);
    expect(wrapper.find('.classification-banner')).toHaveLength(1);
});

it('renders SECRET', () => {
    const wrapper = mount(<ClassificationBanner classification="SECRET" />);
    expect(wrapper.find('.classification-banner')).toHaveLength(1);
});

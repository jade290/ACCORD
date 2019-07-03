import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Component, { AlertSystemComponent } from './index';
import * as ActionTypes from '../../redux/actionTypes';

let originalTimeout;
const mockHideAlert = jest.fn();
const mockAlerts = [];
const mockStore = configureStore([thunk]);
const store = mockStore({
    alerts: mockAlerts,
});

beforeAll(() => {
    /* eslint-disable no-undef */
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    /* eslint-enable no-undef */
});

afterAll(() => {
    /* eslint-disable-next-line no-undef */
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

afterEach(() => {
    mockHideAlert.mockReset();
});

/**
* wrappedComponent
*/
function wrappedComponent() {
    return (
        <Provider store={store}>
            <Component />
        </Provider>
    );
}

it('renders without crashing', () => {
    const wrapper = mount(wrappedComponent());
    expect(wrapper.find('#alerts')).toHaveLength(1);
});

it('maps dispatch to props correctly', () => {
    const wrapper = mount(wrappedComponent());
    wrapper.find('AlertSystemComponent').at(0).prop('hideAlert')('test');
    expect(store.getActions()[0]).toEqual({
        type: ActionTypes.alerts.hideAlert,
        id: 'test',
    });
});

it('renders alert', () => {
    const mockAlertsClone = Object.assign([], mockAlerts);
    mockAlertsClone.push({
        type: 'success',
        message: 'test',
        id: 'testing',
    });
    const wrapper = mount(<AlertSystemComponent alerts={mockAlertsClone} hideAlert={mockHideAlert} />);
    expect(wrapper.find('.alert')).toHaveLength(1);
});

it('calls hideAlert prop when .close-btn is clicked', () => {
    const mockAlertsClone = Object.assign([], mockAlerts);
    mockAlertsClone.push({ type: 'success', message: 'test', id: 'test' });
    const wrapper = mount(<AlertSystemComponent alerts={mockAlertsClone} hideAlert={mockHideAlert} />);
    expect(mockHideAlert).toHaveBeenCalledTimes(0);
    expect(wrapper.find('.alert')).toHaveLength(1);
    wrapper.find('.close-btn').at(0).simulate('click');
    expect(mockHideAlert).toHaveBeenCalledTimes(1);
});

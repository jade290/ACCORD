import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Component, { ReduxDemoComponent } from 'views/ReduxDemo/index';
import mockData from 'mockData';
import * as ActionTypes from 'redux/actionTypes';

const mockStore = configureStore([thunk]);
const store = mockStore({
    user: mockData.user,
});
const mockGenerateAlert = jest.fn();

afterEach(() => {
    mockGenerateAlert.mockReset();
});

/**
* wrapped component
*/
function wrappedComponent() {
    return (
        <Provider store={store}>
            <Component
                generateAlert={mockGenerateAlert}
            />
        </Provider>
    );
}

it('renders without crashing', () => {
    const wrapper = mount(wrappedComponent());
    expect(wrapper.find('#redux-demo')).toHaveLength(1);
});

it('maps dispatch to props', () => {
    const wrapper = mount(wrappedComponent());
    wrapper.find('ReduxDemoComponent').at(0).prop('generateAlert')('test');
    expect(store.getActions()[0]).toEqual({
        type: ActionTypes.alerts.generateAlert,
        message: 'test',
    });
});

it('updates state.message when input field is changed', () => {
    const wrapper = mount(<ReduxDemoComponent
        user={mockData.user}
        generateAlert={mockGenerateAlert}
    />);
    expect(wrapper.state().message).toEqual('');
    wrapper.find('textarea').at(0).simulate('change', { target: { value: 'test' } });
    expect(wrapper.state().message).toEqual('test');
});

it('calls generateAlert prop with constructed string when button is clicked', () => {
    const expectedString = `${mockData.user.given_name} (${mockData.user.email}) says: test`;
    const wrapper = mount(<ReduxDemoComponent
        user={mockData.user}
        generateAlert={mockGenerateAlert}
    />);
    expect(mockGenerateAlert).toHaveBeenCalledTimes(0);
    wrapper.find('textarea').at(0).simulate('change', { target: { value: 'test' } });
    wrapper.find('button').at(0).simulate('click');
    expect(mockGenerateAlert).toHaveBeenCalledTimes(1);
    expect(mockGenerateAlert).toHaveBeenCalledWith(expectedString);
});

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router, { RouterComponent } from 'Router';
import Views from 'views';
import * as ActionTypes from 'redux/actionTypes';

jest.mock('connected-react-router');
jest.mock('./views/Home', () => () => <div id="home" />);
jest.mock('./views/NotFound', () => () => <div id="not-found" />);
jest.mock('./views/ReduxDemo', () => () => <div id="redux-demo" />);
jest.mock('./components/Navbar', () => () => <div id="Navbar" />);
jest.mock('./components/AlertSystem', () => () => <div id="AlertSystem" />);

const mockGetUser = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore({});

/**
* return router component wrapped in mock router
*/
function routedApp(route) {
    return (
        <MemoryRouter initialEntries={[route]} store={store} >
            <RouterComponent
                getUser={mockGetUser}
                history={{}}
            />
        </MemoryRouter>
    );
}

/** wrapped component */
const wrappedComponent = () => (
    <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
            <Router
                getUser={mockGetUser}
                history={{}}
            />
        </MemoryRouter>
    </Provider>
);

Views.forEach((view) => {
    test(`renders ${view.componentName} when path is ${view.path}`, () => {
        const wrapper = mount(routedApp(view.path));
        expect(wrapper.find(`#${view.componentName}`)).toHaveLength(1);
    });
});

it('renders 404 not found', () => {
    const wrapper = mount(routedApp('/BANANA'));
    expect(wrapper.find('#not-found')).toHaveLength(1);
});

it('maps dispatch to props', () => {
    const wrapper = mount(wrappedComponent());
    wrapper.find('RouterComponent').at(0).prop('getUser')();
    expect(store.getActions()[0]).toEqual({
        type: ActionTypes.user.getUser,
    });
});

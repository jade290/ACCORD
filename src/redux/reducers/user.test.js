import _ from 'lodash';
import * as Actions from '../actionTypes';
import reducer from './user';
import mockData from '../../mockData';

const mockUser = mockData.user;

const initialState = {
    fullName: '',
    email: '',
    bio: '',
    avatar: '',
    skills: [],
    color: '',
    id: '',
    role: 'customer',
};

describe('user reducer', () => {
    it('initialState', () => {
        expect(reducer(undefined, { type: 'banana' })).toEqual(initialState);
    });
    it(Actions.user.setUser, () => {
        const action = {
            type: Actions.user.setUser,
            userinfo: mockUser,
        };
        const expectedState = _.merge({}, initialState, mockUser);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
});

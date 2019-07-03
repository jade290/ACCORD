import * as Actions from '../actionTypes';
import reducer from './alerts';

const initialState = [];

describe('alerts reducer', () => {
    it('initialState', () => {
        expect(reducer(undefined, { type: 'banana' })).toEqual(initialState);
    });
    it(Actions.alerts.hideAlert, () => {
        const action = {
            type: Actions.alerts.hideAlert,
            id: 'testid',
        };
        const expectedState = [];
        const modifiedInitialState = [{ id: 'testid', message: 'test', type: 'test' }];
        const state = reducer(modifiedInitialState, action);
        expect(state).toEqual(expectedState);
    });
    it(Actions.alerts.generateAlert, () => {
        const action = {
            type: Actions.alerts.generateAlert,
            message: 'TEST',
        };
        const state = reducer(initialState, action);
        expect(state).toHaveLength(1);
        expect(state[0].message).toEqual(action.message);
    });
    it(Actions.user.setError, () => {
        const action = {
            type: Actions.user.setError,
            error: 'test',
        };
        const expectedState = [
            {
                type: 'error',
                message: `${action.error.statusCode} - There was a technical problem retrieving user information.`,
            },
        ];
        const state = reducer(initialState, action);
        expect(state[0].type).toEqual(expectedState[0].type);
        expect(state[0].message).toEqual(expectedState[0].message);
    });
});

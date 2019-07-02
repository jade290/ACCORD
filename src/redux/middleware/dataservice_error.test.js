import ls from 'local-storage';
import * as Actions from '../actionTypes';
import dataservice from './dataservice';

ls.get = jest.fn(() => 'notatoken');

jest.mock('../../config/config.json', () => ({
    geoaxis: {
        enabled: true,
    },
    apiUrl: 'http://localhost:8080',
}));


const initialStore = { dispatch: jest.fn() };
const next = jest.fn();

afterEach(() => {
    jest.resetAllMocks();
});

describe('dataservice middleware - errors', () => {
    test('passes actions through', (done) => {
        const action = {
            type: 'BANANA',
        };
        const expectedAction = {
            type: 'BANANA',
        };
        dataservice(initialStore)(next)(action);
        setTimeout(() => {
            try {
                expect(next.mock.calls[0][0]).toEqual(expectedAction);
                done();
            } catch (e) {
                done.fail(e);
            }
        }, 150);
    });
    test(Actions.user.getUser, (done) => {
        const action = {
            type: Actions.user.getUser,
        };
        const expectedAction = {
            type: Actions.user.setError,
            error: new Error('fail'),
        };
        dataservice(initialStore)(next)(action);
        setTimeout(() => {
            try {
                expect(next.mock.calls[0][0]).toEqual(expectedAction);
                done();
            } catch (e) {
                done.fail(e);
            }
        }, 150);
    });
});

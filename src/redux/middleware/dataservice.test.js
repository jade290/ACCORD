import * as Actions from '../actionTypes';
import dataservice from './dataservice';
import mockData from '../../mockData';

jest.mock('request-promise');

jest.mock('../../config/config.json', () => ({
    geoaxis: {
        enabled: true,
    },
    apiUrl: 'http://localhost:8080',
}));

const mockUserInfo = mockData.user;

const initialStore = {
    dispatch: jest.fn(),
    getState: () => ({
        user: mockUserInfo,
    }),
};
const next = jest.fn();

afterEach(() => {
    jest.resetAllMocks();
});

describe('dataservice middleware', () => {
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
            type: Actions.user.setUser,
            userinfo: mockUserInfo,
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

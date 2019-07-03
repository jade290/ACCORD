import * as Actions from './index';
import * as ActionTypes from '../actionTypes';

let recievedAction;
const TEST = 'test';

/**
* mock redux dispatch
*/
function dispatch(action) {
    recievedAction = action;
}

describe('user', () => {
    it('getUser', (done) => {
        const expectedAction = {};
        expectedAction.type = ActionTypes.user.getUser;
        Actions.user.getUser()(dispatch);
        expect(recievedAction).toEqual(expectedAction);
        done();
    });
    it('setUser', (done) => {
        const expectedAction = {};
        expectedAction.type = ActionTypes.user.setUser;
        expectedAction.userinfo = TEST;
        Actions.user.setUser(TEST)(dispatch);
        expect(recievedAction).toEqual(expectedAction);
        done();
    });
    it('setError', (done) => {
        const expectedAction = {};
        expectedAction.type = ActionTypes.user.setError;
        expectedAction.error = TEST;
        Actions.user.setError(TEST)(dispatch);
        expect(recievedAction).toEqual(expectedAction);
        done();
    });
});

describe('alerts', () => {
    it('hideAlert', (done) => {
        const expectedAction = {};
        expectedAction.type = ActionTypes.alerts.hideAlert;
        expectedAction.id = 0;
        Actions.alerts.hideAlert(0)(dispatch);
        expect(recievedAction).toEqual(expectedAction);
        done();
    });
    it('generateAlert', (done) => {
        const expectedAction = {};
        expectedAction.type = ActionTypes.alerts.generateAlert;
        expectedAction.message = TEST;
        Actions.alerts.generateAlert(TEST)(dispatch);
        expect(recievedAction).toEqual(expectedAction);
        done();
    });
});

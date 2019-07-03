// src/controllers/geoaxis_redirectFail.test.js
import gx from 'controllers/geoaxis';

/* eslint-disable */
jest.mock('request-promise', () => require('../../__mocks__/request-promise_error.js'));
/* eslint-enable */

it('getRedirectUrl returns null if call fails', async (done) => {
    try {
        const redirecturl = await gx.getRedirectUrl();
        expect(redirecturl).toEqual(null);
        done();
    } catch (e) {
        done.fail(e);
    }
});

import ls from 'local-storage';
import gx from 'controllers/geoaxis';
import mockUser from 'mockData/user.json';

jest.mock('request-promise');

it('loggedIn() returns false if user is not logged in and no auth code appears in url', async (done) => {
    ls.get = jest.fn(() => null);
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('getUserInfo() handles error from gx', async (done) => {
    ls.get = jest.fn(() => null);
    try {
        const userinfo = await gx.getUserInfo();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('getUserInfo() handles user info response from gx', async (done) => {
    ls.get = jest.fn(() => 'returnUser');
    try {
        const userinfo = await gx.getUserInfo();
        expect(userinfo).toEqual(mockUser);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('getToken() returns whatever is stored in local-storage', () => {
    ls.get = jest.fn(() => 'test');
    expect(gx.getToken()).toEqual('test');
});

it('loggedIn() returns user info if valid code is found in url', async (done) => {
    let token = null;
    ls.set = jest.fn((prop, value) => {
        token = value;
    });
    ls.get = jest.fn(() => token);
    Object.defineProperty(window, 'location', {
        writable: true,
        value: { href: 'https://ex.com?code=example_code' },
    });
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(true);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('loggedIn() returns false if second getUserInfo call fails', async (done) => {
    let token = null;
    ls.set = jest.fn((prop, value) => {
        token = value;
    });
    ls.get = jest.fn(() => token);
    Object.defineProperty(window, 'location', {
        writable: true,
        value: { href: 'https://ex.com?code=example_code_fail' },
    });
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('loggedIn() returns false if tradeCodeForToken fails', async (done) => {
    let token = null;
    ls.set = jest.fn((prop, value) => {
        token = value;
    });
    ls.get = jest.fn(() => token);
    Object.defineProperty(window, 'location', {
        writable: true,
        value: { href: 'https://ex.com?code=example_code_fail_token' },
    });
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('loggedIn() returns true if valid token is found', async (done) => {
    ls.get = jest.fn(() => 'returnUser');
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(true);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('loggedIn() returns false if invalid token is found', async (done) => {
    ls.get = jest.fn(() => 'dont_returnUser');
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('getRedirectUrl returns redirectUrl', async (done) => {
    try {
        const redirecturl = await gx.getRedirectUrl();
        expect(redirecturl).toEqual('http://example.com');
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('tradeCodeForToken fails when access_token property is not present on resp body', async (done) => {
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: 'https://ex.com?code=example_code_no_access_token',
    });
    try {
        const userinfo = await gx.loggedIn();
        expect(userinfo).toEqual(false);
        done();
    } catch (e) {
        done.fail(e);
    }
});

it('getUserInfo returns resp if resp is not stringified', async (done) => {
    ls.get = jest.fn(() => 'returnUserJson');
    try {
        const userinfo = await gx.getUserInfo();
        expect(userinfo).toEqual(mockUser);
        done();
    } catch (e) {
        done.fail(e);
    }
});

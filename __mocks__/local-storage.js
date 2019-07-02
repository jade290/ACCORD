// __mocks__/local-storage.js

import MockUser from '../src/mockData/user.json';

module.exports = {
    get,
    set,
    remove,
};

const TOKEN = 'example_token';
const USER = MockUser;

function get(varName) {
    if (varName === 'gxToken') return TOKEN;
    else if (varName === 'gxUser') return USER;
    return '';
}

function set(varName) {
    return true;
}

function remove(varName) {
    return true;
}

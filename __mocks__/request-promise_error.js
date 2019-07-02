// __mocks__/request-promise_error.js

function request() {
    return new Promise((resolve, reject) => {
        reject(new Error('err'));
    });
}

export default request;

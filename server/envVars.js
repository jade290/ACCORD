const CONFIG = require('../src/config/config.json');

function getEnvVars() {
    // eslint-disable-next-line
    try {
        const vcapObj = JSON.parse(process.env.VCAP_SERVICES);
        return {
            clientID: vcapObj['p-identity'][0].credentials.client_id,
            clientSecret: vcapObj['p-identity'][0].credentials.client_secret,
            authURL: vcapObj['p-identity'][0].credentials.auth_domain,
            redirectURL: CONFIG.geoaxis.redirectUrl,
        };
    } catch (e) {
        console.log(e);
        return {};
    }
}

module.exports = {
    getEnvVars,
};

const { server: serverConfig } = require('../config/index');

module.exports = {
    get: () => `http://${serverConfig.host}:${serverConfig.port}/`,
    parse: (obj) => Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&'),
};

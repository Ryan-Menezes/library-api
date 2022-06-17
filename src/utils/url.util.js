const { server: serverConfig } = require('../config/index');

module.exports = {
    get: () => `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/`,
    parse: (obj) => Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&'),
    setUrlUploads: function(file) {
        if(file){
            return this.get() + file
        }

        return file
    }
};

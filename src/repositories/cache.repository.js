const { redis: Cache } = require('../services/index');

module.exports = {
    set: (key, value, expire) => {
        Cache.set(key, value, 'EX', expire);
    },

    get: (key) => Cache.get(key),

    exists: (key) => Cache.exists(key),

    del: (key) => Cache.del(key),
};

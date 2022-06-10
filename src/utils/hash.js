const bcrypt = require('bcryptjs');

const { hash: hashConfig } = require('../config/index');

module.exports = {
    generate: value => bcrypt.hash(value, hashConfig.salt),

    compare: (value, hash) => bcrypt.compare(value, hash),
};

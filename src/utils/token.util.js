const jwt = require('jsonwebtoken');
const { cache: cacheRepository } = require('../repositories/index');
const { auth: authConfig } = require('../config/index');

module.exports = {
    generate: (payload) => new Promise((resolve, reject) => {
        jwt.sign(payload, authConfig.token.secret, {
            algorithm: authConfig.token.algorithm,
            expiresIn: authConfig.token.expiration,
        }, (error, token) => {
            if (error) {
                reject(error);
            }

            resolve(token);
        });
    }),

    validate: async (decoded, req, h) => {
        const { token } = req.auth;
        const islogged = await cacheRepository.exists(`${authConfig.session.prefixLogout}:${token}`);

        return {
            isValid: !islogged,
        };
    },
};

const authUtil = require('../utils/auth.util');
const errorUtil = require('../utils/error.util');
const { cache: cacheRepository } = require('../repositories/index');
const { auth: authConfig } = require('../config/index');

module.exports = {
    login: async (req, h) => {
        try {
            const { username, password } = req.payload;

            const { token, user } = await authUtil.login(username, password);
            cacheRepository.set(`${authConfig.session.prefixLogin}:${user._id}`, JSON.stringify(user), authConfig.session.expiration);

            return h.response({ token }).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    logout: async (req, h) => {
        try {
            const { token, credentials } = req.auth;

            if (token && credentials) {
                Promise.all([
                    authUtil.logout(token),
                    cacheRepository.del(`${authConfig.session.prefixLogin}:${credentials.data.id}`),
                ]);
            }

            return h.response().code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    }
};

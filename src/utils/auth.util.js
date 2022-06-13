const hashUtil = require('./hash.util');
const tokenUtil = require('./token.util');
const { 
    users: usersRepository,
    cache: cacheRepository,
} = require('../repositories/index');
const {
    app: appConfig,
    auth: authConfig,
} = require('../config/index');

module.exports = {
    login: async (username, password) => {
        const user = await usersRepository.findUsernameAuth(username);

        if(!user){
            throw new Error('Not Found');
        }

        const result = await hashUtil.compare(password, user.password);
        if(!result){
            throw new Error('Not Found');
        }
        
        const token =  await tokenUtil.generate({
            iss: appConfig.name,
            sub: user._id,
            data: {
                id: user._id,
            },
        });

        return { user, token };
    },

    logout: async (token) => {
        await cacheRepository.set(`${authConfig.session.prefixLogout}:${token}`, token, authConfig.session.expiration);
    },
};

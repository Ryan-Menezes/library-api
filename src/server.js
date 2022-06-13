const Hapi = require('@hapi/hapi');
const hapiAuthJwt2 = require('hapi-auth-jwt2');

const routes = require('./routes/index');
const token = require('./utils/token.util');
const {
    auth: authConfig,
    server: serverConfig,
} = require('./config/index');

const server = Hapi.server({
    port: serverConfig.port,
    host: serverConfig.host,
});

const initializePlugins = async () => {
    await server.register(hapiAuthJwt2);
    await server.auth.strategy('jwt', 'jwt', {
        key: authConfig.token.secret,
        validate: token.validate,
        verifyOptions: { 
            algorithms: [ authConfig.token.algorithm ], 
        },
    });
    await server.auth.default('jwt');
};

server.route([...routes.auth, ...routes.users, ...routes.authors, ...routes.categories, ...routes.books]);

console.log('Server running on %s', server.info.uri);

module.exports = {
    start: async () => {
        await initializePlugins();
        return server.start();
    },
    initialize: async () => {
        await initializePlugins();
        return server.initialize();
    },
};

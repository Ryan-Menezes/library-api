const Hapi = require('@hapi/hapi');
const path = require('path');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const hapiInert = require('@hapi/inert');

const routes = require('./routes/index');
const token = require('./utils/token.util');
const {
    auth: authConfig,
    server: serverConfig,
    storage: storageConfig,
} = require('./config/index');

const server = Hapi.server({
    port: serverConfig.port,
    host: serverConfig.host,
});

const initializePlugins = async () => {
    // JWT
    await server.register(hapiAuthJwt2);
    await server.auth.strategy('jwt', 'jwt', {
        key: authConfig.token.secret,
        validate: token.validate,
        verifyOptions: { 
            algorithms: [ authConfig.token.algorithm ], 
        },
    });
    await server.auth.default('jwt');

    // Inert
    await server.register(hapiInert);

    server.route({
        method: 'GET',
        path: `/${storageConfig.path}/{param*}`,
        handler: {
            directory: {
                path: path.join(__dirname, storageConfig.path),
                listing: false,
            },
        },
        options: {
            auth: false,
            cors: true,
        },
    });
};

server.route([...routes.auth, ...routes.users, ...routes.authors, ...routes.categories, ...routes.books]);

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

console.log('Server running on %s', server.info.uri);

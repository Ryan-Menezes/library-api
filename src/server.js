const Hapi = require('@hapi/hapi');
const morgan = require('morgan');

const routes = require('./routes/index');
const { server: serverConfig } = require('./config/index');

const server = Hapi.server({
    port: serverConfig.port,
    host: serverConfig.host,
});

server.route([...routes.users, ...routes.authors, ...routes.categories, ...routes.books]);

console.log('Server running on %s', server.info.uri);

module.exports = {
    start: () => server.start(),
    initialize: () => server.initialize(),
};

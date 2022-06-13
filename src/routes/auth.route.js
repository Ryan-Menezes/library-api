const { auth: authHandler } = require('../handlers/index');
const { auth: authSchema } = require('../schemas/index');

const endpoint = '';

module.exports = [
    {
        method: 'POST',
        path: `${endpoint}/login`,
        handler: authHandler.login,
        options: {
            cors: true,
            auth: false,
            validate: {
                payload: authSchema.payload
            },
        },
    },
    {
        method: 'POST',
        path: `${endpoint}/logout`,
        handler: authHandler.logout,
        options: {
            cors: true,
        },
    },
];

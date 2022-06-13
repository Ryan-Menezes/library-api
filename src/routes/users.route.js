const { users: usersHandler } = require('../handlers/index');
const { users: usersSchema } = require('../schemas/index');

const endpoint = '/users';

module.exports = [
    {
        method: 'GET',
        path: `${endpoint}`,
        handler: usersHandler.index,
        options: {
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{id}`,
        handler: usersHandler.show,
        options: {
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}`,
        handler: usersHandler.create,
        options: {
            cors: true,
            validate: {
                payload: usersSchema.payload
            },
            payload: {
                parse: true,
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000 * 1000 * 200, // 200 Mb
            },
        },
    },
    {
        method: 'PUT',
        path: `${endpoint}/{id}`,
        handler: usersHandler.update,
        options: {
            cors: true,
            validate: {
                payload: usersSchema.payload
            },
            payload: {
                parse: true,
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000 * 1000 * 200, // 200 Mb
            },
        },
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{id}`,
        handler: usersHandler.delete,
        options: {
            cors: true,
        },
    },
];

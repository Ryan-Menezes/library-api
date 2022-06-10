const { users: usersHandler } = require('../handlers/index');
const { users: userSchema } = require('../schemas/index');

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
                payload: userSchema.payload
            },
        }
    },
    {
        method: 'PUT',
        path: `${endpoint}/{id}`,
        handler: usersHandler.update,
        options: {
            cors: true,
            validate: {
                payload: userSchema.payload
            },
        }
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{id}`,
        handler: usersHandler.delete,
        options: {
            cors: true,
        }
    },
];

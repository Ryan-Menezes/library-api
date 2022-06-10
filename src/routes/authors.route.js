const { authors: authorsHandler } = require('../handlers/index');
const { authors: authorSchema } = require('../schemas/index');

const endpoint = '/authors'

module.exports = [
    {
        method: 'GET',
        path: endpoint,
        handler: authorsHandler.index,
        options: {
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{id}`,
        handler: authorsHandler.show,
        options: {
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}`,
        handler: authorsHandler.create,
        options: {
            cors: true,
            validate: {
                payload: authorSchema.payload
            },
        }
    },
    {
        method: 'PUT',
        path: `${endpoint}/{id}`,
        handler: authorsHandler.update,
        options: {
            cors: true,
            validate: {
                payload: authorSchema.payload
            },
        }
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{id}`,
        handler: authorsHandler.delete,
        options: {
            cors: true,
        }
    },
];

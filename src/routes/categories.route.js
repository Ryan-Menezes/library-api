const { categories: categoriesHandler } = require('../handlers/index');
const { categories: categoriesSchema } = require('../schemas/index');

const endpoint = '/categories'

module.exports = [
    {
        method: 'GET',
        path: endpoint,
        handler: categoriesHandler.index,
        options: {
            auth: false,
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{slug}`,
        handler: categoriesHandler.show,
        options: {
            auth: false,
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}`,
        handler: categoriesHandler.create,
        options: {
            cors: true,
            validate: {
                payload: categoriesSchema.payload
            },
        },
    },
    {
        method: 'PUT',
        path: `${endpoint}/{slug}`,
        handler: categoriesHandler.update,
        options: {
            cors: true,
            validate: {
                payload: categoriesSchema.payload
            },
        },
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{slug}`,
        handler: categoriesHandler.delete,
        options: {
            cors: true,
        },
    },
];

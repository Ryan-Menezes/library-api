const { authors: authorsHandler } = require('../handlers/index');
const { authors: authorsSchema } = require('../schemas/index');

const endpoint = '/authors'

module.exports = [
    {
        method: 'GET',
        path: endpoint,
        handler: authorsHandler.index,
        options: {
            auth: false,
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{slug}`,
        handler: authorsHandler.show,
        options: {
            auth: false,
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
                payload: authorsSchema.payload,
            },
            payload: {
                parse: true,
                multipart: {
                    output: 'stream',
                },
                maxBytes: 1000 * 1000 * 200, // 200 Mb
            },
        },
    },
    {
        method: 'PUT',
        path: `${endpoint}/{slug}`,
        handler: authorsHandler.update,
        options: {
            cors: true,
            validate: {
                payload: authorsSchema.payload,
            },
            payload: {
                parse: true,
                multipart: {
                    output: 'stream',
                },
                maxBytes: 1000 * 1000 * 200, // 200 Mb
            },
        },
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{slug}`,
        handler: authorsHandler.delete,
        options: {
            cors: true,
        },
    },

    // -------------------------------------------
    // ROUTES - Books
    // -------------------------------------------

    {
        method: 'GET',
        path: `${endpoint}/{slug}/books`,
        handler: authorsHandler.booksAll,
        options: {
            auth: false,
            cors: true,
        },
    },
];

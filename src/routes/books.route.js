const { books: booksHandler } = require('../handlers/index');
const { books: booksSchema } = require('../schemas/index');

const endpoint = '/books'

module.exports = [
    {
        method: 'GET',
        path: endpoint,
        handler: booksHandler.index,
        options: {
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{slug}`,
        handler: booksHandler.show,
        options: {
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}`,
        handler: booksHandler.create,
        options: {
            cors: true,
            validate: {
                payload: booksSchema.payload
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
        path: `${endpoint}/{slug}`,
        handler: booksHandler.update,
        options: {
            cors: true,
            validate: {
                payload: booksSchema.payload
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
        path: `${endpoint}/{slug}`,
        handler: booksHandler.delete,
        options: {
            cors: true,
        }
    },
    {
        method: 'GET',
        path: `${endpoint}/{slug}/categories`,
        handler: booksHandler.categoriesAll,
        options: {
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}/{slug}/categories/{slug_category}`,
        handler: booksHandler.categoriesAdd,
        options: {
            cors: true,
        },
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{slug}/categories/{slug_category}`,
        handler: booksHandler.categoriesRemove,
        options: {
            cors: true,
        },
    },
    {
        method: 'GET',
        path: `${endpoint}/{slug}/authors`,
        handler: booksHandler.authorsAll,
        options: {
            cors: true,
        },
    },
    {
        method: 'POST',
        path: `${endpoint}/{slug}/authors/{slug_author}`,
        handler: booksHandler.authorsAdd,
        options: {
            cors: true,
        },
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{slug}/authors/{slug_author}`,
        handler: booksHandler.authorsRemove,
        options: {
            cors: true,
        },
    },
];

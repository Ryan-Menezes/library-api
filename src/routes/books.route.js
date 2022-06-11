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
        }
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
        }
    },
    {
        method: 'DELETE',
        path: `${endpoint}/{slug}`,
        handler: booksHandler.delete,
        options: {
            cors: true,
        }
    },
];

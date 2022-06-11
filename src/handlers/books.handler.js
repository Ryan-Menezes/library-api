const boom = require('@hapi/boom');

const { books: booksReposiory } = require('../repositories/index');
const responseUtil = require('../utils/response.util');

const type = 'books';

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const books = await booksReposiory.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, books)).code(200);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const book = await booksReposiory.findOne({ slug });

            if (!book) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, book)).code(200);
        } catch (error) {
            switch (error.message) {
                case 'Not Found':
                    throw boom.notFound(error.message);
                default:
                    throw boom.badImplementation(error);
            }
        }
    },

    create: async (req, h) => {
        try {
            const data = req.payload;
            const book = await booksReposiory.create(data);

            return h.response(responseUtil.parse(req, type, book)).code(201);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;
            const book = await booksReposiory.update(data, { slug });

            if (!book) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, book)).code(200);
        } catch (error) {
            switch (error.message) {
                case 'Not Found':
                    throw boom.notFound(error.message);
                default:
                    throw boom.badImplementation(error);
            }
        }
    },

    delete: async (req, h) => {
        try {
            const { slug } = req.params;
            const book = await booksReposiory.removeOne({ slug });

            if (!book) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, book)).code(200);
        } catch (error) {
            switch (error.message) {
                case 'Not Found':
                    throw boom.notFound(error.message);
                default:
                    throw boom.badImplementation(error);
            }
        }
    },
};

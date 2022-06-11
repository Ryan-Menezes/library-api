const boom = require('@hapi/boom');

const { authors: authorsReposiory } = require('../repositories/index');
const responseUtil = require('../utils/response.util');

const type = 'authors';

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const authors = await authorsReposiory.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, authors)).code(200);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const author = await authorsReposiory.findOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, author)).code(200);
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
            const author = await authorsReposiory.create(data);

            return h.response(responseUtil.parse(req, type, author)).code(201);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;
            const author = await authorsReposiory.update(data, { slug });

            if (!author) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, author)).code(200);
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
            const author = await authorsReposiory.removeOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, author)).code(200);
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

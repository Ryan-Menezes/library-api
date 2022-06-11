const boom = require('@hapi/boom');

const { categories: categoriesReposiory } = require('../repositories/index');
const responseUtil = require('../utils/response.util');

const type = 'categories';

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const categories = await categoriesReposiory.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, categories)).code(200);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const category = await categoriesReposiory.findOne({ slug });

            if (!category) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, category)).code(200);
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
            const category = await categoriesReposiory.create(data);

            return h.response(responseUtil.parse(req, type, category)).code(201);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;
            const category = await categoriesReposiory.update(data, { slug });

            if (!category) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, category)).code(200);
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
            const category = await categoriesReposiory.removeOne({ slug });

            if (!category) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, category)).code(200);
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

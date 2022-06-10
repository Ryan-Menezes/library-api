const boom = require('@hapi/boom');

const { users: usersReposiory } = require('../repositories/index');
const responseUtil = require('../utils/response');

const type = 'users';

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const users = await usersReposiory.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, users)).code(200);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    show: async (req, h) => {
        try {
            const { id } = req.params;
            const user = await usersReposiory.findById(id);

            if (!user){
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, user)).code(200);
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
            const user = await usersReposiory.create(data);

            return h.response(responseUtil.parse(req, type, user)).code(201);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    update: async (req, h) => {
        try {
            const { id } = req.params;
            const data = req.payload;
            const user = await usersReposiory.update(data, { _id: id });

            return h.response(responseUtil.parse(req, type, user)).code(200);
        } catch (error) {
            throw boom.badImplementation(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { id } = req.params;
            const user = await usersReposiory.removeById(id);

            if (!user){
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, user)).code(200);
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

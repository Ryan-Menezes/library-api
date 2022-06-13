const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const {
    books: booksRepository,
    categories: categoriesRepository,
} = require('../repositories/index');

const type = categoriesRepository.type;

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const categories = await categoriesRepository.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, categories)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const category = await categoriesRepository.findOne({ slug });

            if (!category) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, category)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    create: async (req, h) => {
        try {
            const data = req.payload;
            const category = await categoriesRepository.create(data);

            return h.response(responseUtil.parse(req, type, category)).code(201);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;
            const category = await categoriesRepository.update(data, { slug });

            if (!category) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, category)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { slug } = req.params;
            const category = await categoriesRepository.removeOne({ slug });

            if (!category) {
                throw new Error('Not Found');
            }

            await booksRepository.removeCategories(category._id);

            return h.response(responseUtil.parse(req, type, category)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

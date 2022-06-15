const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const strUtil = require('../utils/str.util');
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

            // Slugify
            data.slug = !data.slug ? strUtil.slugify(data.name) : strUtil.slugify(data.slug);

            // Save data
            const category = await categoriesRepository.create(data);

            // Response data
            return h.response(responseUtil.parse(req, type, category)).code(201);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;

            // Slugify
            if (!data.slug) {
                delete data.slug;
            } else {
                data.slug = strUtil.slugify(data.slug);
            }

            // Save data and verify if exists
            const category = await categoriesRepository.update(data, { slug });

            if (!category) {
                throw new Error('Not Found');
            }

            // Response data
            return h.response(responseUtil.parse(req, type, category)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { slug } = req.params;

            // Remove data
            const category = await categoriesRepository.removeOne({ slug });

            if (!category) {
                throw new Error('Not Found');
            }

            // Remove relathionships with books
            await booksRepository.removeCategories(category._id);

            // Response data
            return h.response(responseUtil.parse(req, type, category)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

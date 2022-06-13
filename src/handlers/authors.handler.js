const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const {
    books: booksRepository,
    authors: authorsRepository,
} = require('../repositories/index');

const type = authorsRepository.type;

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const authors = await authorsRepository.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, type, authors)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const author = await authorsRepository.findOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    create: async (req, h) => {
        try {
            const data = req.payload;
            const author = await authorsRepository.create(data);

            return h.response(responseUtil.parse(req, type, author)).code(201);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    update: async (req, h) => {
        try {
            const { slug } = req.params;
            const data = req.payload;
            const author = await authorsRepository.update(data, { slug });

            if (!author) {
                throw new Error('Not Found');
            }

            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { slug } = req.params;
            const author = await authorsRepository.removeOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }

            await booksRepository.removeAuthors(author._id);

            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

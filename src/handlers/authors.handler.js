const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const storageUtil = require('../utils/storage.util');
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
        let file_info = null;

        try {
            const data = req.payload;
            
            // Upload avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }

            // Save data
            const author = await authorsRepository.create(data);

            // Response data
            return h.response(responseUtil.parse(req, type, author)).code(201);
        } catch (error) {
            if (file_info) {
                await storageUtil.remove(file_info.filename);
            }

            errorUtil.parse(error);
        }
    },

    update: async (req, h) => {
        let file_info = null;

        try {
            const { slug } = req.params;
            const data = req.payload;

            // Upload new avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }

            // Save data and verify if exists
            const author = await authorsRepository.update(data, { slug });

            if (!author) {
                throw new Error('Not Found');
            }

            // Remove old avatar file
            if (author.avatar) {
                await storageUtil.remove(author.avatar);
            }

            // Response data
            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            if (file_info) {
                await storageUtil.remove(file_info.filename);
            }

            errorUtil.parse(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { slug } = req.params;

            // Remove data
            const author = await authorsRepository.removeOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }

            // Remove avatar file
            if (author.avatar) {
                await storageUtil.remove(author.avatar);
            }
            
            // Remove relathionships with books
            await booksRepository.removeAuthors(author._id);

            // Response data
            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

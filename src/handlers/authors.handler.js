const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const storageUtil = require('../utils/storage.util');
const strUtil = require('../utils/str.util');
const urlUtil = require('../utils/url.util');
const {
    books: booksRepository,
    authors: authorsRepository,
} = require('../repositories/index');

const type = authorsRepository.type;
const typeBook = booksRepository.type;

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const authors = await authorsRepository.get(filter, (page - 1) * limit, limit);

            // Set avatar url
            authors.map(author => author.avatar = urlUtil.setUrlUploads(author.avatar));

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

            // Set avatar url
            author.avatar = urlUtil.setUrlUploads(author.avatar);

            return h.response(responseUtil.parse(req, type, author)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    create: async (req, h) => {
        let file_info = null;

        try {
            const data = req.payload;

            // Slugify
            data.slug = !data.slug ? strUtil.slugify(data.name) : strUtil.slugify(data.slug);
            
            // Upload avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }

            // Save data
            const author = await authorsRepository.create(data);

            // Set avatar url
            author.avatar = urlUtil.setUrlUploads(author.avatar);

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

            // Search old author and verify if exists
            const author_old = await authorsRepository.findOne({ slug });
            if (!author_old) {
                throw new Error('Not Found');
            }

            // Slugify
            if (!data.slug) {
                delete data.slug;
            } else {
                data.slug = strUtil.slugify(data.slug);
            }

            // Upload new avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }

            // Save data
            const author = await authorsRepository.update(data, { slug });

            // Set avatar url
            author.avatar = urlUtil.setUrlUploads(author.avatar);

            // Remove old avatar file
            if (data.avatar && author_old.avatar) {
                await storageUtil.remove(author_old.avatar);
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

    // -------------------------------------------
    // Relationships - Books
    // -------------------------------------------

    booksAll: async (req, h) => {
        try {
            const { slug } = req.params;
            const { page = 1, limit = 10, ...filter } = req.query;
            
            const author = await authorsRepository.findOne({ slug });

            if (!author) {
                throw new Error('Not Found');
            }
            
            filter.authors = author._id;
            const books = await booksRepository.get(filter, (page - 1) * limit, limit);

            // Set poster url
            books.map(book => book.poster = urlUtil.setUrlUploads(book.poster));

            return h.response(responseUtil.parse(req, typeBook, books)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

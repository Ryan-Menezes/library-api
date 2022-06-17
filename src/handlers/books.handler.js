const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const storageUtil = require('../utils/storage.util');
const strUtil = require('../utils/str.util');
const urlUtil = require('../utils/url.util');
const {
    books: booksRepository,
    categories: categoriesRepository,
    authors: authorsRepository,
} = require('../repositories/index');

const type = booksRepository.type;
const typeCategory = categoriesRepository.type;
const typeAuthor = authorsRepository.type;

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const books = await booksRepository.get(filter, page - 1, limit);

            // Set poster url
            books.map(book => book.poster = urlUtil.setUrlUploads(book.poster));

            return h.response(responseUtil.parse(req, type, books)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    show: async (req, h) => {
        try {
            const { slug } = req.params;
            const book = await booksRepository.findOne({ slug });

            if (!book) {
                throw new Error('Not Found');
            }

            // Set poster url
            book.poster = urlUtil.setUrlUploads(book.poster);

            return h.response(responseUtil.parse(req, type, book)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    create: async (req, h) => {
        let file_info = null;

        try {
            const data = req.payload;

            // Slugify
            data.slug = !data.slug ? strUtil.slugify(data.title) : strUtil.slugify(data.slug);
            
            // Upload poster file
            if (data.poster) {
                file_info = await storageUtil.upload(data.poster);
                data.poster = file_info.filename;
            }

            // Save data
            const book = await booksRepository.create(data);

            // Set poster url
            book.poster = urlUtil.setUrlUploads(book.poster);

            // Response data
            return h.response(responseUtil.parse(req, type, book)).code(201);
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

            // Slugify
            if (!data.slug) {
                delete data.slug;
            } else {
                data.slug = strUtil.slugify(data.slug);
            }    

            // Upload new poster file
            if (data.poster) {
                file_info = await storageUtil.upload(data.poster);
                data.poster = file_info.filename;
            }

            // Save data and verify if exists
            const book = await booksRepository.update(data, { slug });

            if (!book) {
                throw new Error('Not Found');
            }

            // Remove old poster file
            if (data.poster && book.poster) {
                await storageUtil.remove(book.poster);
            }

            // Response data
            return h.response(responseUtil.parse(req, type, book)).code(200);
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
            const book = await booksRepository.removeOne({ slug });

            if (!book) {
                throw new Error('Not Found');
            }

            // Remove poster file
            if (book.poster) {
                await storageUtil.remove(book.poster);
            }

            // Response data
            return h.response(responseUtil.parse(req, type, book)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    // -------------------------------------------
    // Relationships - Categories
    // -------------------------------------------

    categoriesAll: async (req, h) => {
        try {
            const { slug } = req.params;
            const { page = 1, limit = 10, ...filter } = req.query;
            
            const book = await booksRepository.findOneAll({ slug });

            if (!book) {
                throw new Error('Not Found');
            }
            
            filter._id = { $in: book.categories };
            const categories = await categoriesRepository.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, typeCategory, categories)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    categoriesAdd: async (req, h) => {
        try {
            const { slug, slug_category } = req.params;

            const category = await categoriesRepository.findOne({ slug: slug_category });
            if (!category) {
                throw new Error('Not Found');
            }
            
            const book = await booksRepository.findOne({ slug });
            if (!book) {
                throw new Error('Not Found');
            }

            const result = await booksRepository.addCategory(book._id, category._id);

            return h.response(responseUtil.parse(req, type, result)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    categoriesRemove: async (req, h) => {
        try {
            const { slug, slug_category } = req.params;

            const category = await categoriesRepository.findOne({ slug: slug_category });
            if (!category) {
                throw new Error('Not Found');
            }
            
            const book = await booksRepository.findOne({ slug });
            if (!book) {
                throw new Error('Not Found');
            }

            const result = await booksRepository.removeCategory(book._id, category._id);

            return h.response(responseUtil.parse(req, typeCategory, result)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    // -------------------------------------------
    // Relationships - Authors
    // -------------------------------------------

    authorsAll: async (req, h) => {
        try {
            const { slug } = req.params;
            const { page = 1, limit = 10, ...filter } = req.query;
            
            const book = await booksRepository.findOneAll({ slug });

            if (!book) {
                throw new Error('Not Found');
            }
            
            filter._id = { $in: book.authors };
            const authors = await authorsRepository.get(filter, page - 1, limit);

            return h.response(responseUtil.parse(req, typeAuthor, authors)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    authorsAdd: async (req, h) => {
        try {
            const { slug, slug_author } = req.params;

            const author = await authorsRepository.findOne({ slug: slug_author });
            if (!author) {
                throw new Error('Not Found');
            }
            
            const book = await booksRepository.findOne({ slug });
            if (!book) {
                throw new Error('Not Found');
            }

            const result = await booksRepository.addAuthor(book._id, author._id);

            return h.response(responseUtil.parse(req, type, result)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    authorsRemove: async (req, h) => {
        try {
            const { slug, slug_author } = req.params;

            const author = await authorsRepository.findOne({ slug: slug_author });
            if (!author) {
                throw new Error('Not Found');
            }
            
            const book = await booksRepository.findOne({ slug });
            if (!book) {
                throw new Error('Not Found');
            }

            const result = await booksRepository.removeAuthor(book._id, author._id);

            return h.response(responseUtil.parse(req, typeAuthor, result)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

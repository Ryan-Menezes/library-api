const { book: BookModel } = require('../models/index');
const mongodbUtil = require('../utils/mongodb.util');

module.exports = {
    type: 'books',

    get: (filter = {}, skip = 0, limit = 10) => BookModel.find(mongodbUtil.parseFilter(filter), { images: false, categories: false, authors: false, __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => BookModel.findOne(filter, { images: false, categories: false, authors: false, __v: false }).lean(),

    findOneAll: (filter = {}) => BookModel.findOne(filter, { __v: false }).lean(),

    findById: function(id) {
        return this.findOne({ _id: id });
    },

    create: async function(data) {
        const book = new BookModel(data);
        await book.save();

        return this.findById(book._id);
    },

    update: async function(data, filter) {
        await BookModel.updateOne(filter, data);
        return this.findOne(filter);
    },

    removeOne: async function(filter) {
        const book = await this.findOne(filter);
        await BookModel.deleteOne(filter);
        return book;
    },

    removeById: async function(id) {
        const book = await this.findById(id);
        await BookModel.deleteOne({ _id: id });
        return book;
    },

    addImage: async function(book_id, filename) {
        await this.update({
            $addToSet: {
                images: filename,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    removeImage: async function(book_id, filename) {
        await this.update({
            $pull: {
                images: filename,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    addCategory: async function(book_id, category_id) {
        await this.update({
            $addToSet: {
                categories: category_id,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    removeCategory: async function(book_id, category_id) {
        await this.update({
            $pull: {
                categories: category_id,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    removeCategories: (category_id) => BookModel.updateMany({}, {
        $pull: {
            categories: category_id,
        },
    }),

    addAuthor: async function(book_id, author_id) {
        await this.update({
            $addToSet: {
                authors: author_id,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    removeAuthor: async function(book_id, author_id) {
        await this.update({
            $pull: {
                authors: author_id,
            },
        }, { _id: book_id });

        return this.findById(book_id);
    },

    removeAuthors: (author_id) => BookModel.updateMany({}, {
        $pull: {
            authors: author_id,
        },
    }),
};

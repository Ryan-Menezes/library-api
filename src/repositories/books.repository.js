const { book: BookModel } = require('../models/index');

module.exports = {
    type: 'books',

    get: (filter = {}, skip = 0, limit = 10) => BookModel.find(filter, { images: false, categories: false, authors: false, __v: false }).skip(skip).limit(limit).lean(),

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

    addImage: (book_id, filename) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $addToSet: {
            images: filename,
        },
    }),

    removeImage: (book_id, filename) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $pull: {
            images: filename,
        },
    }),

    addCategory: (book_id, category_id) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $addToSet: {
            categories: category_id,
        },
    }),

    removeCategory: (book_id, category_id) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $pull: {
            categories: category_id,
        },
    }),

    removeCategories: (category_id) => BookModel.updateMany({}, {
        $pull: {
            categories: category_id,
        },
    }),

    addAuthor: (book_id, author_id) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $addToSet: {
            authors: author_id,
        },
    }),

    removeAuthor: (book_id, author_id) => BookModel.findOneAndUpdate({ _id: book_id }, {
        $pull: {
            authors: author_id,
        },
    }),

    removeAuthors: (author_id) => BookModel.updateMany({}, {
        $pull: {
            authors: author_id,
        },
    }),
};

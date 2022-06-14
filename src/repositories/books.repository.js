const { book: BookModel } = require('../models/index');

module.exports = {
    type: 'books',

    get: (filter = {}, skip = 0, limit = 10) => BookModel.find(filter, { images: false, categories: false, authors: false, __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => BookModel.findOne(filter, { images: false, categories: false, authors: false, __v: false }).lean(),

    findOneAll: (filter = {}) => BookModel.findOne(filter, { __v: false }).lean(),

    findById: (id) => BookModel.findOne({ _id: id }, { images: false, categories: false, authors: false, __v: false }).lean(),

    create: (data) => {
        const book = new BookModel(data);
        return book.save();
    },

    update: (data, filter) => BookModel.findOneAndUpdate(filter, data),

    removeOne: async (filter) => {
        const book = await BookModel.findOne(filter, { images: false, categories: false, authors: false, __v: false }).lean();
        await BookModel.deleteOne(filter);

        return book;
    },

    removeById: async (id) => {
        const book = await BookModel.findOne({ _id: id }, { images: false, categories: false, authors: false, __v: false }).lean();
        await BookModel.deleteOne({ _id: id });

        return book;
    },

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

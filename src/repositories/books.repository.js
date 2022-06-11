const { book: BookModel } = require('../models/index');

module.exports = {
    get: (filter = {}, skip = 0, limit = 10) => BookModel.find(filter, { __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => BookModel.findOne(filter, { __v: false }).lean(),

    findById: (id) => BookModel.findOne({ _id: id }, { __v: false }).lean(),

    create: (data) => {
        const book = new BookModel(data);
        return book.save();
    },

    update: (data, filter) => BookModel.findOneAndUpdate(filter, data),

    removeOne: async (filter) => {
        const book = await BookModel.findOne(filter, { __v: false }).lean();
        await BookModel.deleteOne(filter);

        return book;
    },

    removeById: async (id) => {
        const book = await BookModel.findOne({ _id: id }, { __v: false }).lean();
        await BookModel.deleteOne({ _id: id });

        return book;
    },
};

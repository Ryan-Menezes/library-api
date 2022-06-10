const { book: BookModel } = require('../models/index');

module.exports = {
    get: (filter = {}, skip = 0, limit = 10) => BookModel.find(filter, { __v: false }).skip(skip).limit(limit).lean(),

    find: (filter = {}) => BookModel.findOne(filter, { __v: false }).lean(),

    create: (data) => {
        const book = new BookModel(data);
        return book.save();
    },

    update: (data, filter) => BookModel.findOneAndUpdate(filter, data),

    findById: (id) => BookModel.findOne({ _id: id }, { __v: false }).lean(),

    removeById: async (id) => {
        const book = await BookModel.findOne({ _id: id }, { __v: false }).lean();
        await BookModel.deleteOne({ _id: id });

        return book;
    },
};

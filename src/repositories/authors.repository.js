const { author: AuthorModel } = require('../models/index');

module.exports = {
    type: 'authors',

    get: (filter = {}, skip = 0, limit = 10) => AuthorModel.find(filter, { __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => AuthorModel.findOne(filter, { __v: false }).lean(),

    findById: (id) => AuthorModel.findOne({ _id: id }, { __v: false }).lean(),

    create: (data) => {
        const author = new AuthorModel(data);
        return author.save();
    },

    update: (data, filter) => AuthorModel.findOneAndUpdate(filter, data),

    removeOne: async (filter) => {
        const author = await AuthorModel.findOne(filter, { __v: false }).lean();
        await AuthorModel.deleteOne(filter);

        return author;
    },

    removeById: async (id) => {
        const author = await AuthorModel.findOne({ _id: id }, { __v: false }).lean();
        await AuthorModel.deleteOne({ _id: id });

        return author;
    },
};

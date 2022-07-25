const { author: AuthorModel } = require('../models/index');
const mongodbUtil = require('../utils/mongodb.util');

module.exports = {
    type: 'authors',

    get: (filter = {}, skip = 0, limit = 10) => AuthorModel.find(mongodbUtil.parseFilter(filter), { __v: false }).skip(skip).limit(limit).lean(),

    getAll: (filter = {}) => AuthorModel.find(mongodbUtil.parseFilter(filter), { __v: false }).lean(),

    findOne: (filter = {}) => AuthorModel.findOne(filter, { __v: false }).lean(),

    findById: function(id) {
        return this.findOne({ _id: id });
    },

    create: async function(data) {
        const author = new AuthorModel(data);
        await author.save();

        return this.findById(author._id);
    },

    update: async function(data, filter) {
        await AuthorModel.updateOne(filter, data);
        return this.findOne(filter);
    },

    removeOne: async function(filter) {
        const author = await this.findOne(filter);
        await AuthorModel.deleteOne(filter);
        return author;
    },

    removeById: async function(id) {
        const author = await this.findById(id);
        await AuthorModel.deleteOne({ _id: id });
        return author;
    },
};

const { category: CategoryModel } = require('../models/index');
const mongodbUtil = require('../utils/mongodb.util');

module.exports = {
    type: 'categories',

    get: (filter = {}, skip = 0, limit = 10) => CategoryModel.find(mongodbUtil.parseFilter(filter), { __v: false }).skip(skip).limit(limit).lean(),

    getAll: (filter = {}) => CategoryModel.find(mongodbUtil.parseFilter(filter), { __v: false }).lean(),

    findOne: (filter = {}) => CategoryModel.findOne(filter, { __v: false }).lean(),

    findById: function(id) {
        return this.findOne({ _id: id });
    },

    create: async function(data) {
        const category = new CategoryModel(data);
        await category.save();
        return this.findById(category._id);
    },

    update: async function(data, filter) {
        await CategoryModel.updateOne(filter, data);
        return this.findOne(filter);
    },

    removeOne: async function(filter) {
        const category = await this.findOne(filter);
        await CategoryModel.deleteOne(filter);
        return category;
    },

    removeById: async function(id) {
        const category = await this.findById(id);
        await CategoryModel.deleteOne({ _id: id });
        return category;
    },
};

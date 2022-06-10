const { category: CategoryModel } = require('../models/index');

module.exports = {
    get: (filter = {}, skip = 0, limit = 10) => CategoryModel.find(filter, { __v: false }).skip(skip).limit(limit).lean(),

    find: (filter = {}) => CategoryModel.findOne(filter, { __v: false }).lean(),

    create: (data) => {
        const category = new CategoryModel(data);
        return category.save();
    },

    update: (data, filter) => CategoryModel.findOneAndUpdate(filter, data),

    findById: (id) => CategoryModel.findOne({ _id: id }, { __v: false }).lean(),

    removeById: async (id) => {
        const category = await CategoryModel.findOne({ _id: id }, { __v: false }).lean();
        await CategoryModel.deleteOne({ _id: id });

        return category;
    },
};

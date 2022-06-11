const { user: UserModel } = require('../models/index');
const hashUtil = require('../utils/hash.util');

module.exports = {
    get: (filter = {}, skip = 0, limit = 10) => UserModel.find(filter, { password: false, __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => UserModel.findOne(filter, { password: false, __v: false }).lean(),

    findById: (id) => UserModel.findOne({ _id: id }, { password: false, __v: false }).lean(),

    create: async (data) => {
        if(data.password){
            data.password = await hashUtil.generate(data.password);
        }

        const user = new UserModel(data);
        return user.save();
    },

    update: async (data, filter) => {
        if(data.password){
            data.password = await hashUtil.generate(data.password);
        }

        return UserModel.findOneAndUpdate(filter, data)
    },

    removeOne: async (filter) => {
        const user = await UserModel.findOne(filter, { __v: false }).lean();
        await UserModel.deleteOne(filter);

        return user;
    },

    removeById: async (id) => {
        const user = await UserModel.findOne({ _id: id }, { password: false, __v: false }).lean();
        await UserModel.deleteOne({ _id: id });

        return user;
    },
};

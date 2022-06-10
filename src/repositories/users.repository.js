const { user: UserModel } = require('../models/index');
const hashUtil = require('../utils/hash');

module.exports = {
    get: (filter = {}, skip = 0, limit = 10) => UserModel.find(filter, { password: false, __v: false }).skip(skip).limit(limit).lean(),

    find: (filter = {}) => UserModel.findOne(filter, { password: false, __v: false }).lean(),

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

    findById: (id) => UserModel.findOne({ _id: id }, { password: false, __v: false }).lean(),

    removeById: async (id) => {
        const user = await UserModel.findOne({ _id: id }, { password: false, __v: false }).lean();
        await UserModel.deleteOne({ _id: id });

        return user;
    },
};

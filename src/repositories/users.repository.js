const { user: UserModel } = require('../models/index');
const hashUtil = require('../utils/hash.util');
const mongodbUtil = require('../utils/mongodb.util');

module.exports = {
    type: 'users',

    get: (filter = {}, skip = 0, limit = 10) => UserModel.find(mongodbUtil.parseFilter(filter), { password: false, __v: false }).skip(skip).limit(limit).lean(),

    findOne: (filter = {}) => UserModel.findOne(filter, { password: false, __v: false }).lean(),

    findById: function(id) {
        return this.findOne({ _id: id });
    },

    findUsernameAuth: (username) => UserModel.findOne({ username }, { __v: false }).lean(),

    create: async function(data) {
        if(data.password){
            data.password = await hashUtil.generate(data.password);
        }

        const user = new UserModel(data);
        await user.save();

        return this.findById(user._id);
    },

    update: async function(data, filter) {
        if(data.password){
            data.password = await hashUtil.generate(data.password);
        }

        await UserModel.updateOne(filter, data);
        return this.findOne(filter);
    },

    removeOne: async function(filter) {
        const user = await this.findOne(filter);
        await UserModel.deleteOne(filter);
        return user;
    },

    removeById: async function(id) {
        const user = await this.findById(id);
        await UserModel.deleteOne({ _id: id });
        return user;
    },
};

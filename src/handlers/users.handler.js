const responseUtil = require('../utils/response.util');
const errorUtil = require('../utils/error.util');
const storageUtil = require('../utils/storage.util');
const urlUtil = require('../utils/url.util');
const { users: usersRepository } = require('../repositories/index');

const type = usersRepository.type;

module.exports = {
    index: async (req, h) => {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;

            const users = await usersRepository.get(filter, (page - 1) * limit, limit);

            // Set avatar url
            users.map(user => user.avatar = urlUtil.setUrlUploads(user.avatar));
            
            return h.response(responseUtil.parse(req, type, users)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    show: async (req, h) => {
        try {
            const { id } = req.params;
            const user = await usersRepository.findById(id);

            if (!user) {
                throw new Error('Not Found');
            }

            // Set avatar url
            user.avatar = urlUtil.setUrlUploads(user.avatar);

            return h.response(responseUtil.parse(req, type, user)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },

    create: async (req, h) => {
        let file_info = null;

        try {
            const data = req.payload;
            
            // Upload avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }
            
            // Save data
            const user = await usersRepository.create(data);

            // Set avatar url
            user.avatar = urlUtil.setUrlUploads(user.avatar);

            // Response data
            return h.response(responseUtil.parse(req, type, user)).code(201);
        } catch (error) {
            if (file_info) {
                await storageUtil.remove(file_info.filename);
            }

            errorUtil.parse(error);
        }
    },

    update: async (req, h) => {
        let file_info = null;

        try {
            const { id } = req.params;
            const data = req.payload;

            // Search old user and verify if exists
            const user_old = await usersRepository.findOne({ _id: id });
            if (!user_old) {
                throw new Error('Not Found');
            }

            // Upload new avatar file
            if (data.avatar) {
                file_info = await storageUtil.upload(data.avatar);
                data.avatar = file_info.filename;
            }

            // Save data
            const user = await usersRepository.update(data, { _id: id });

            // Set avatar url
            user.avatar = urlUtil.setUrlUploads(user.avatar);

            // Remove old avatar file
            if (data.avatar && user_old.avatar) {
                await storageUtil.remove(user_old.avatar);
            }

            // Response data
            return h.response(responseUtil.parse(req, type, user)).code(200);
        } catch (error) {
            if (file_info) {
                await storageUtil.remove(file_info.filename);
            }

            errorUtil.parse(error);
        }
    },

    delete: async (req, h) => {
        try {
            const { id } = req.params;

            // Remove data
            const user = await usersRepository.removeById(id);

            if (!user) {
                throw new Error('Not Found');
            }

            // Remove avatar file
            if (user.avatar) {
                await storageUtil.remove(user.avatar);
            }

            // Response data
            return h.response(responseUtil.parse(req, type, user)).code(200);
        } catch (error) {
            errorUtil.parse(error);
        }
    },
};

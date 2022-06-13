const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
    }),
};

const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6),
        avatar: Joi.any(),
    }),
};

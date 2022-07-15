const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().allow(''),
        description: Joi.string().allow(''),
        avatar: Joi.any(),
    }),
};

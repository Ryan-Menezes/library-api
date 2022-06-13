const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        description: Joi.string(),
        avatar: Joi.any(),
    }),
};

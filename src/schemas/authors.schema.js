const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        name: Joi.string().required(),
        slug: Joi.string(),
        description: Joi.string(),
        avatar: Joi.any(),
    }),
};

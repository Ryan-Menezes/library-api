const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        title: Joi.string().required(),
        slug: Joi.string(),
        visible: Joi.boolean().default(false),
        volume: Joi.number().required(),
        edition: Joi.number().required(),
        release_date: Joi.date().required(),
        description: Joi.string(),
        details: Joi.string(),
    }),
};

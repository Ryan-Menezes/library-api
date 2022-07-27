const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        title: Joi.string().required(),
        slug: Joi.string().allow(''),
        visible: Joi.boolean().default(false),
        volume: Joi.number().required(),
        edition: Joi.number().required(),
        pages: Joi.number().required(),
        language: Joi.string().allow(''),
        release_date: Joi.date().required(),
        description: Joi.string().allow(''),
        details: Joi.string().allow(''),
        poster: Joi.any(),
    }),
};

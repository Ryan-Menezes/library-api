const Joi = require('joi');

module.exports = {
    payload: Joi.object({
        title: Joi.string().required(),
        slug: Joi.string().required(),
        volume: Joi.number().required(),
        edition: Joi.number().required(),
        release_date: Joi.date().required(),
    }),
};

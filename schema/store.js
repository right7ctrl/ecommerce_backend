const Joi = require('@hapi/joi');

const store = Joi.object({
    store_id: Joi.number().min(0).required(),
    page: Joi.number().min(0).required(),
    limit: Joi.number().min(0).required(),
});

module.exports = store;
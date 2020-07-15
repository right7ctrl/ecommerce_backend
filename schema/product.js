const Joi = require('@hapi/joi');

const product = Joi.object({
    limit: Joi.number().min(0).required(),
    page: Joi.number().min(0).required(),
});

const category = Joi.object({
    limit: Joi.number().min(0).required(),
    page: Joi.number().min(0).required(),
    category_id: Joi.number().min(0).max(99999999999).required()
});

const single = Joi.object({
    product_id: Joi.number().min(0).required(),
});
const related = Joi.object({
    category_id: Joi.number().min(0).max(99999999999).required()
});

module.exports = [category, product, single, related];
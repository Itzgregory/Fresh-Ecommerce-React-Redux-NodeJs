const Joi = require('joi');

const orderValidation = {
    createOrder: () => Joi.object({
        items: Joi.array().items(
            Joi.object({
                productId: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required().messages({
                    'string.empty': 'Product ID is required',
                    'string.pattern.base': 'Invalid Product ID format'
                }),
                name: Joi.string().required().messages({
                    'string.empty': 'Product name is required'
                }),
                price: Joi.number().positive().precision(2).required().messages({
                    'number.base': 'Price must be a valid number',
                    'number.positive': 'Price must be greater than 0'
                }),
                quantity: Joi.number().integer().min(1).required().messages({
                    'number.base': 'Quantity must be a valid number',
                    'number.min': 'Quantity must be at least 1'
                }),
                total: Joi.number().positive().precision(2).required().messages({
                    'number.base': 'Total must be a valid number',
                    'number.positive': 'Total must be greater than 0'
                })
            })
        ).min(1).required().messages({
            'array.min': 'Order must contain at least one item',
            'array.base': 'Order items must be an array'
        })
    }).unknown(false),

    updateOrder: () => Joi.object({
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required().messages({
            'string.empty': 'Order status is required',
            'any.only': 'Invalid order status'
        })
    }).unknown(false)
};

module.exports = { orderValidation };
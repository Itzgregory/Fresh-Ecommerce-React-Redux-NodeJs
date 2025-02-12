const Joi = require('joi');

const productValidation = {
    createProduct: () => Joi.object({
        name: Joi.string().trim().min(3).max(30).required().messages({
            'string.empty': 'Product name is required',
            'string.min': 'Product name must be at least 3 characters long',
            'string.max': 'Product name cannot exceed 30 characters'
        }),
        description: Joi.string().trim().min(3).max(100).required().messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 3 characters long',
            'string.max': 'Description cannot exceed 100 characters'
        }),
        code: Joi.string().alphanum().min(6).max(15).required().messages({
            'string.empty': 'Product code is required',
            'string.alphanum': 'Code must contain only letters and numbers',
            'string.min': 'Code must be at least 6 characters long',
            'string.max': 'Code cannot exceed 15 characters'
        }),
        category: Joi.string().trim().required().messages({
            'string.empty': 'Product category is required'
        }),
        price: Joi.number().positive().precision(2).required().messages({
            'number.base': 'Price must be a valid number',
            'number.positive': 'Price must be greater than 0'
        }),
        stock: Joi.number().integer().min(0).required().messages({
            'number.base': 'Stock must be a valid number',
            'number.min': 'Stock cannot be negative'
        }),
        photos: Joi.array().items(
            Joi.object({
                url: Joi.string().uri().required().messages({
                    'string.empty': 'Photo URL is required',
                    'string.uri': 'Photo URL must be a valid URI'
                }),
                id: Joi.string().trim().required().messages({
                    'string.empty': 'Photo ID is required'
                })
            })
        ).max(5).messages({
            'array.max': 'You can upload a maximum of 5 photos'
        }).optional()
    }).unknown(false),

    updateProduct: () => Joi.object({
        name: Joi.string().trim().min(3).max(30).optional(),
        description: Joi.string().trim().min(3).max(100).optional(),
        code: Joi.string().alphanum().min(6).max(15).optional(),
        category: Joi.string().trim().optional(),
        price: Joi.number().positive().precision(2).optional(),
        stock: Joi.number().integer().min(0).optional(),
        photos: Joi.array().items(
            Joi.object({
                url: Joi.string().uri().required(),
                id: Joi.string().trim().required()
            })
        ).max(5).optional()
    }).unknown(false),

    updateStock: () => Joi.object({
        id: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required().messages({
            'string.empty': 'Product ID is required',
            'string.pattern.base': 'Invalid Product ID format'
        }),
        count: Joi.number().integer().min(1).required().messages({
            'number.base': 'Count must be a valid number',
            'number.min': 'Count must be at least 1'
        })
    }).unknown(false)
};

module.exports = { productValidation };

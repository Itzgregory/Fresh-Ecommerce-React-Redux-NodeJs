const Joi = require('joi');

const formatValidationResponse = (error) => ({
    success: false,
    message: error.details.map(err => err.message).join(', '),
    data: null,
});

const userValidation = {
    signupSchema: () => Joi.object({
        username: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot exceed 30 characters'
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }),
        password: Joi.string().min(5)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/)
            .required()
            .messages({
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least 5 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }),
        confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict()
        .messages({
            'string.empty': 'Confirm Password cannot be empty',
            'any.only': 'Confirm password does not match password',
            'any.required': 'Confirm Password is required'
        }),
        name: Joi.string().required().messages({
            'string.empty': 'Name cannot be empty',
        }),
        surname: Joi.string().required().messages({
            'string.empty': 'Surname cannot be empty',
        }),
        phone: Joi.string().pattern(/^\+?[\d\s-]{5,}$/).required().messages({
            'string.empty': 'Phone number cannot be empty',
            'string.pattern.base': 'Invalid phone number format'
        }),
        photo: Joi.string().uri().allow('', null).optional().messages({
            'string.uri': 'Photo must be a valid URL',
        })
    }).unknown(false),

    loginSchema: () => Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }),
        password: Joi.string().min(5)
            .required()
            .messages({
                'string.empty': 'Password cannot be empty',
        }),
    }).unknown(false),
};

module.exports = { userValidation };

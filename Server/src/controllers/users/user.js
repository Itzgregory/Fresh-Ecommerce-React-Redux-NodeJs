const { userService } = require("../../services/index");
const {userValidation} = require("../../helpers/validation/userValidation/userValidation");
const setAuthAndCsrfCookies = require("../../helpers/cookieAndCsrfToken/AuthAndCsrfCookies")

const userControllers = () => {
    return {
        getLogin: async (req, res) => {
            try {
                const { error } = userValidation.loginSchema().validate(req.body, { abortEarly: false });
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error.details.map(err => err.message).join(', '),
                        data: null,
                    });
                }
        
                const { email, password } = req.body;
                const result = await userService.authenticateUser(email, password);
        
                if (result.success) {
                    setAuthAndCsrfCookies(res, result.data.token);
                }
        
                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: {
                        id: result.data?.id,
                        email: result.data?.email,
                        username: result.data?.username,
                        role: result.data?.role,
                        token: result.data?.token
                    }
                });
            } catch (err) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Internal server error',
                    data: null,
                });
            }
        },

        postSignup: async (req, res) => {
            try {
                const { error } = userValidation.signupSchema().validate(req.body, { abortEarly: false });
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error.details.map(err => err.message).join(', '),
                        data: null,
                    });
                }
        
                const result = await userService.registerUser(req.body);
        
                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data,
                });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    data: null,
                });
            }
        },
        
        logoutUser: async (req, res, next) => {
            try {
                const token = req.cookies.auth_token;
                const result = await userService.logoutUser(token);

                if (result.success) {
                    res.clearCookie('auth_token');
                    res.clearCookie('XSRF-TOKEN');
                }

                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data,
                });
            } catch (err) {
                next(err);
            }
        },

        getLoggedUser: (req, res) => {
            res.status(200).json({
                success: true,
                message: 'Logged user retrieved successfully',
                data: req.user,
            });
        }
    };
};

module.exports = userControllers;

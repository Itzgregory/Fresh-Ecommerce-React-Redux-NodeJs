const { generateNormalToken } = require('../../../config/index');
const { userValidation } = require('../../helpers/validation/userValidation/userValidation');
const {logerror } = require("../../helpers/logger");

class UserService {
    constructor(userModel, securityConfig) {
        this.userModel = userModel;
        this.securityConfig = securityConfig;
    }

    async authenticateUser(email, password) {
        try {
            if (!email || !password) {
                return { status: 400, success: false, message: 'Provide email and password', data: null };
            }
    
            const normalizedEmail = email.trim().toLowerCase();
    
            const user = await this.userModel.findOne({ email: normalizedEmail });
            if (!user) {
                logerror.error('User not found:', email);
                return { status: 401, success: false, message: 'Invalid credentials', data: null };
            }
    
            const isValidPassword = await this.securityConfig.verifyPassword(user.password, password);
            if (!isValidPassword) {
                logerror.error('Invalid password for user:', email);
                return { status: 401, success: false, message: 'Invalid credentials', data: null };
            }
    
            let accessToken;
            try {
                accessToken = await generateNormalToken(user);
            } catch (tokenError) {
                logerror.error('Error generating token:', tokenError);
                return { status: 500, success: false, message: 'Token generation failed', data: null };
            }
    
            user.tokens = [accessToken];
            user.lastLogin = new Date();
    
            try {
                await user.save();
            } catch (saveError) {
                logerror.error('Error saving user:', saveError);
                return { status: 500, success: false, message: 'Database update failed', data: null };
            }
    
            const result = { 
                status: 200, 
                success: true, 
                message: 'Authentication successful', 
                data: { 
                    id: user._id, 
                    email: user.email, 
                    username: user.username, 
                    role: user.role, 
                    token: accessToken 
                } 
            };
            
            return result;
            
        } catch (err) {
            logerror.error('Unexpected error authenticating user:', err);
            return { status: 500, success: false, message: 'Authentication failed', data: null };
        }
    }
    
    
    async verifyAuthToken(req, res, next) {
        try {
            const token = req.cookies.auth_token;
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required',
                    data: null
                });
            }

            const user = await this.userModel.findOne({ tokens: token });
            if (!user) {
                res.clearCookie('auth_token');
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                    data: null
                });
            }

            req.user = user;
            req.token = token;
            next();
        } catch (err) {
            logerror.error('Token verification error:', err);
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
                data: null
            });
        }
    }

    async registerUser(userData) {
        try {
            const existingUser = await this.userModel.findOne({ 
                $or: [{ email: userData.email }, { username: userData.username }]
            });

            if (existingUser) {
                return { status: 409, success: false, message: 'User already exists', data: null };
            }

            const hashedPassword = await this.securityConfig.hashPassword(userData.password);
            const user = new this.userModel({ ...userData, password: hashedPassword, tokens: [], lastLogin: null });
            await user.save();

            const userResponse = user.toObject();
            delete userResponse.password;
            delete userResponse.tokens;

            return { status: 201, success: true, message: 'User registered successfully', data: userResponse };
        } catch (err) {
            logerror.error('Error registering user:', err);
            return { status: 500, success: false, message: 'Registration failed', data: null };
        }
    }

    async logoutUser(accessToken) {
        try {
            if (!accessToken) {
                return { status: 400, success: false, message: 'No token provided', data: null };
            }

            const user = await this.userModel.findOne({ tokens: accessToken });
            if (!user) {
                return { status: 401, success: false, message: 'Invalid token', data: null };
            }

            user.tokens = user.tokens.filter(token => token !== accessToken);
            await user.save();

            return { status: 200, success: true, message: 'Logout successful', data: null };
        } catch (err) {
            logerror.error('Error logging out user:', err);
            return { status: 500, success: false, message: 'Logout failed', data: null };
        }
    }

    async getUserProfile(userId) {
        try {
            const user = await this.userModel.findById(userId).select('-password -tokens');
            if (!user) {
                return { status: 404, success: false, message: 'User not found', data: null };
            }

            return { status: 200, success: true, message: 'User profile retrieved', data: user };
        } catch (err) {
            logerror.error('Get profile error:', err);
            return { status: 500, success: false, message: 'Failed to get user profile', data: null };
        }
    }
}

module.exports = UserService;

const express = require('express');
const {authMiddleware} = require('../../middleware/authentication/authMiddleware');
const { userControllers } = require('../../controllers/index');
const adminMiddleware = require('../../middleware/role/isAdmin')

const router = express.Router();

module.exports = routerUsers = () => {
    router        
    .post('/login', userControllers.getLogin)
    .post('/signup',  userControllers.postSignup) 
    .post('/logout', authMiddleware, userControllers.logoutUser)
    .get('/user', authMiddleware, adminMiddleware, userControllers.getLoggedUser)
     
    return router;
};
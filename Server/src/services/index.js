const Dao = require("../dal/Dao")
const UserService = require("./user/user")
const productService = require("./products/products")
const cartServices = require('./cart/cart')
const orderServices = require('./orders/order')
const {securityConfig} = require('../../config/index')
const {userModel} = require('../models/index')

module.exports = {
    productService: productService(Dao), 
    cartServices: cartServices(Dao),
    orderServices: orderServices(Dao),
    userService: new UserService(userModel, securityConfig)
}
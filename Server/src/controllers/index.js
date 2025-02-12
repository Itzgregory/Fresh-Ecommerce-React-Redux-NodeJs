const services = require('../services')
const productsControllers = require('./products/products')
const { save, destroy } = require('../middleware/cloudinary/cloudinary')
const userControllers = require('./users/user')
const cartControllers = require('./cart/cart')
const ordersControllers = require('./orders/orders')

const  sendMail  = require('../templates/purchased-email')


module.exports = {
    productsControllers: productsControllers(services, save, destroy),
    userControllers: userControllers(),
    cartControllers: cartControllers(services),
    ordersControllers : ordersControllers(services, sendMail)

}
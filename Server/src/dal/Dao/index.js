const productsDao = require('./products/products')
const cartDao = require('./cart/cart')
const models = require('../../models')
const orderDao = require('./orders/order')

module.exports = {
    productsDao: productsDao(models),
    cartDao: cartDao(models),
    orderDao: orderDao(models)
}
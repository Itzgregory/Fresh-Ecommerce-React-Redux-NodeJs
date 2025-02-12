const router = require('express').Router();
const { ordersControllers } = require('../../controllers/index')

module.exports = () => {
    router
        .post("/save", ordersControllers.saveOrder)
        .delete('/deleteall', ordersControllers.deleteAllOrder)
        .get('/list', ordersControllers.listAllOrder)
        .get('/list/:id', ordersControllers.listOrderById)
        .put('/update/:id', ordersControllers.updateOrder)
        .delete('/delete/:id', ordersControllers.deleteOrderById)
    return router
}
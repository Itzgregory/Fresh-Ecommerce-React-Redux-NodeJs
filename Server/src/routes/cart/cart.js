const router = require('express').Router();
const { cartControllers } = require('../../controllers')

module.exports = () => {
    router
        .get("/list", cartControllers.cartList)
        .post("/save", cartControllers.saveCart)
        .put('/update', cartControllers.updateProductCart)
        .delete('/delete/:id', cartControllers.deleteProductCart)
        .delete('/deleteAll/:id', cartControllers.deleteAllProductsCart)
    return router
}
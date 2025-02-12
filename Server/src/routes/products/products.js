const router = require('express').Router();
const { productsControllers } = require("../../controllers");
const {authMiddleware} = require('../../middleware/authentication/authMiddleware');
const adminMiddleware = require('../../middleware/role/isAdmin')


module.exports = () => {
    router        
        .get("/list", productsControllers.listProducts)
        .post("/upload", authMiddleware, adminMiddleware, productsControllers.saveProducts)
        .put("/update/:id", productsControllers.updateById)
        .delete("/delete/:id", productsControllers.deleteById)
        .get("/detail/:id", productsControllers.listById)
        .get("/category/:id", productsControllers.listByCategory)        
    return router;
};
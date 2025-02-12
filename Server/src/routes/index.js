const router = require('express').Router();
const express = require('express');
const cors = require('cors');
const routerUsers = require('./users/user')
const routerProducts  = require("./products/products")
const routerCart = require('./cart/cart')
const routerOrder = require('./orders/orders')
module.exports = routerConfig = () => {
 
  router
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(
    cors({
      credentials: true,
      origin: ["http://localhost:8080", "http://localhost:3000"]
    })
  );
  
  // Productos Routes (Solo Admin)
  router.use('/products',routerProducts());
  router.use('/', routerUsers())
  router.use('/cart', routerCart())   
  router.use('/orders', routerOrder())
    return router;
  };
  
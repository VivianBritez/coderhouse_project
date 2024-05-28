const express = require('express');
const router = express.Router()
const cartRouter = require('./carts.controller');
const productRouter  = require('./products.controller');

router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter)

module.exports = router


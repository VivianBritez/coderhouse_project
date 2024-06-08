const express = require('express');
const router = express.Router()
const cartRouter = require('./carts.router');
const productRouter  = require('./products.router');

router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter)

module.exports = router


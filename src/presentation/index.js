const express = require('express');
const router = express.Router()
const cartRouter = require('./carts.controller');
const productRouter  = require('./products.controller');

router.use('/products', productRouter);
router.use('/cart', cartRouter)

module.exports = router


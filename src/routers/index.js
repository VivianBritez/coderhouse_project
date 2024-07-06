const express = require('express');
const router = express.Router()
const cartRouter = require('./carts.router');
const productRouter  = require('./products.router');
const realTimeProducts = require('./productRealTime')
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter)
router.use('/realTimeProducts', realTimeProducts )
router.use('/home', realTimeProducts )
module.exports = router


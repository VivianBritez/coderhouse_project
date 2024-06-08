const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/:id', cartController.getCartById)
router.post('/', cartController.validate, cartController.createCart)
router.post('/:cid/product/:pid', cartController.addToCart)

module.exports = router
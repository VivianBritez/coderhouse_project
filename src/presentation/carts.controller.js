const express = require('express')
const router = express.Router();
const yup = require('yup');
const { CartService } = require('../domain/cart.service')
const ResponseHandler = require('../utils/response')

router.get('/', (req, res) => {
    res.send('List of products');
});
router.get('/:id', (req, res) => {
    res.send(`Details of product with id ${req.params.id}`);
});
router.post('/',async (req, res) => {
    try {
        const cartService = new CartService()
        const data = await cartService.createCart(req.body);
        console.log('data', data.isValidate === false, data.message);
        if(data.isValidate === false){
            return ResponseHandler.badRequest(res, data.message)
        }
        return ResponseHandler.successCreated(res, data.body, data.message)
       
    } catch (error) {
       return ResponseHandler.internalError(res) 
    }
});

module.exports = router
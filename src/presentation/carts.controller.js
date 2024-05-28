const express = require('express')
const router = express.Router();
const yup = require('yup');
const { CartService } = require('../domain/cart.service')
const ResponseHandler = require('../utils/response')


const productSchema = yup.object().shape({
  id: yup.string().required(),
  quantity: yup.number().required(),
}).strict().noUnknown(true, (unknownField) => `Unknown field: ${unknownField.unknown} is not allowed`);

const bodySchema = yup.object().shape({
  products: yup.array().of(productSchema).required(),
}).strict().noUnknown(true, (unknownField) => `Unknown field: ${unknownField.unknown} is not allowed`);

const validateBody = async (req, res, next) => {
  try {
    await bodySchema.validate(req.body);
    next();
  } catch (error) {
    res.status(502).send(error.errors[0]);
  }
};

router.get('/', (req, res) => {
  res.send('List of products');
});
router.get('/:id', async (req, res) => {
  try {
    const cartService = new CartService()
    const data = await cartService.getAllCartById(req.params.id)
    console.log("data => list cart", data)
    if (data.length === 0) {
      ResponseHandler.badRequest(res, 'This id doesn´t exist')
    } return ResponseHandler.success(res, data)
  } catch (error) {
    return ResponseHandler.internalError(res, error)
  }
});
router.post('/', validateBody, async (req, res) => {

  try {
    const cartService = new CartService()
    const data = await cartService.createCart(req.body);
    console.log('data', data.isValidate === false, data.message);
    if (data.isValidate === false) {
      return ResponseHandler.badRequest(res, data.message)
    }
    return ResponseHandler.successCreated(res, data.body, data.message)

  } catch (error) {
    return ResponseHandler.internalError(res)
  }
});


 router.post('/:cid/:pid', async (req, res) => {

  try {
    const cartService = new CartService()
    const data = await cartService.addToCart(req.params.cid, req.params.pid);
    
    if (data?.message) {
      return ResponseHandler.badRequest(res, data.message)
    }
    return ResponseHandler.successCreated(res, data, data.message)

  } catch (error) {
    console.log(error)
    return ResponseHandler.internalError(res)
  }
});
module.exports = router
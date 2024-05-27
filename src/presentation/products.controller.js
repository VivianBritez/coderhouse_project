const { Router } = require('express')
const router = Router();
const yup = require('yup');
const { ProductService } = require('../domain/products.service');
const ResponseHandler = require('../utils/response')
const productScheme = yup.object().shape({
  'title': yup.string().required(),
  'description': yup.string().required(),
  'code': yup.string().required(),
  'price': yup.number().required(),
  'stock': yup.number().required(),
  'category': yup.string(),
  'thumbnails': yup.string()
}).strict().noUnknown(true, (unknownField) => `Unknown field: ${unknownField.unknown} is not allowed`);

const validateProduct = async (req, res, next) => {
  try {
    await productScheme.validate(req.body);
    next();
  } catch (error) {
    res.status(400).send(error.errors[0]);
  }
};

router.get('/', async (req, res) => {
  try {
    const data = await ProductService.getAllProducts()
    return ResponseHandler.success(res, data, 'List of products')
  } catch (error) {
    return ResponseHandler.internalError(res)
  }
});

router.get('/:id', async (req, res) => {
  console.log("starting product by id")
  try {
    
    const data = await ProductService.getById(req.params.id)
    if(data?.message){ return ResponseHandler.badRequest(res, data.message)}
    else {
    ResponseHandler.success(res, data[0], 'Product')}
  } catch (error) {
    return ResponseHandler.internalError(res)
  }
});

router.post('/', validateProduct, async (req, res) => {
  console.log("starting create product")
  try {
    const productService = new ProductService();
    const data = await productService.createProduct(req.body);
    if (data?.message) {
      return ResponseHandler.badRequest(res, data.message)
    }
    return ResponseHandler.successCreated(res, data, 'Product created')
  } catch (error) {

    console.error(error);
    return ResponseHandler.internalServerError(res);
  }
});

router.put('/:id', validateProduct, async (req, res) => {
  console.log("starting updated product", req.params.id)
  try {
    const productService = new ProductService();
    const data = await productService.updateProduct(req.params.id, req.body);
    if (data?.message) {
      return ResponseHandler.badRequest(res, data.message)
    }
    return ResponseHandler.successCreated(res, data, 'Product updated')
  } catch (error) {
    console.error(error);
    return ResponseHandler.internalServerError(res);
  }
});

router.delete('/:id', validateProduct, async (req, res) => {
  console.log("starting delete product", req.params.id)
  try {
    const productService = new ProductService();
    const data = await productService.deleteProduct(req.params.id);
    if (data?.message) {
      return ResponseHandler.badRequest(res, data.message)
    }
    return ResponseHandler.success(res, data, 'Product deleted')
  } catch (error) {
    console.error(error);
    return ResponseHandler.internalServerError(res);
  }
});

module.exports = router;

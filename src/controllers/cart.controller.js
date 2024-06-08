const bodySchema = require('../dtos/cart.dto');
const { CartService } = require('../managers/cart.service');
const ResponseHandler = require('../utils/response');
const validate = require('../middlewares/dto.validator')
// Función para obtener un carrito por ID
const getCartById = async (req, res) => {
  try {
    const cartService = new CartService();
    const data = await cartService.getAllCartById(req.params.id);
    if (data.length === 0) {
      return ResponseHandler.notFound(res, 'This id doesn´t exist');
    }
    return ResponseHandler.success(res, data);
  } catch (error) {
    return ResponseHandler.internalError(res, error);
  }
};

// Función para crear un nuevo carrito
const createCart = async (req, res) => {
  try {
    const cartService = new CartService();
    const data = await cartService.createCart(req.body);
    if (data.isValidate === false) {
      return ResponseHandler.notFound(res, data.message);
    }
    return ResponseHandler.successCreated(res, data.body, data.message);
  } catch (error) {
    return ResponseHandler.internalError(res);
  }
};

// Función para agregar un producto a un carrito específico
const addToCart = async (req, res) => {
  try {
    const cartService = new CartService();
    const data = await cartService.addToCart(req.params.cid, req.params.pid);
    if (data?.message) {
      return ResponseHandler.notFound(res, data.message);
    }
    return ResponseHandler.successCreated(res, data, data.message);
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalError(res);
  }
};

module.exports = {
  getCartById,
  createCart,
  addToCart,
  validate : validate(bodySchema)
};

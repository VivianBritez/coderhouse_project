const productScheme = require('../dtos/products.dto');
const validate = require('../middlewares/dto.validator');
const ResponseHandler = require('../utils/response');
const {ProductService} = require('../managers/products.service')


// Función para obtener todos los productos
const getAllProducts = async (req, res) => {
    console.log("get all products")
    try {
        const data = await ProductService.getAllProducts();
        return ResponseHandler.success(res, data, 'List of products');
    } catch (error) {
        console.log("error", error)
        return ResponseHandler.internalError(res);
    }
};

// Función para obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const data = await ProductService.getById(req.params.id);
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        } else {
            return ResponseHandler.success(res, data[0], 'Product');
        }
    } catch (error) {
        return ResponseHandler.internalError(res);
    }
};

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.createProduct(req.body);
        console.log("data", data)
        if (data?.message) {
            return ResponseHandler.badRequest(res, data.message);
        }
        return ResponseHandler.successCreated(res, data, 'Product created');
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};

// Función para actualizar un producto por ID
const updateProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.updateProduct(req.params.id, req.body);
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        }
        return ResponseHandler.successCreated(res, data, 'Product updated');
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};

// Función para eliminar un producto por ID
const deleteProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.deleteProduct(req.params.id);
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        }
        return ResponseHandler.success(res, data, 'Product deleted');
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validate: validate(productScheme) // Middleware de validación con esquema definido
};
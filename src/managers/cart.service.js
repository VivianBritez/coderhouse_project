const fs = require('fs').promises;
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const CartRepository = require('../implementation/repository/CartRespository');
const { ProductService } = require('../managers/products.service')
const MODULE = 'Cart'
const fileCart = path.resolve('src/implementation/datos/cart.json')
const productFile = path.resolve('src/implementation/datos/products.json')

const getData = async (file) => {
    return await fs.readFile(file, 'utf8');
}


class CartService {
    constructor() {
        this.cartRepository = new CartRepository()
    }

    async getCartList() {
        try {
            return await CartRepository.getData()
        } catch (error) {

            return []
        }
    }
    async getAllProducts() {
        try {
            let products = await ProductService.getAll()
            console.log("procuts", products)
            return products
        } catch (error) {
            return []
        }
    }
    async validateProducts(products) {
        try {
            const validProducts = [];
            for (const prod of products) {
                const obj = {}
                const product = await ProductService.getById(prod.id)
                if (product) {
                    obj._id = prod.id
                    obj.quantity= prod.quantity
                    validProducts.push(obj);
                } else {
                    return {
                        error: true,
                        message: (`Product with ID ${prod.id} not found.`)
                    }
                }
            }
            return validProducts;
        } catch (error) {
            return {
                error: true,
                message: (`Product with ID ${error.value} not found.`)
            };
        }




    }
    async createCart(body) {
        try {
            const data = await this.validateProducts(body.products);
            if (data.error) {
                return data
            }

            const createdCart = await this.cartRepository.createCart({ products: data });
            return createdCart
        } catch (error) {
            console.log("create cart ", error.message, error.value)
            return error
        }

    }

    async addToCart(cid, body) {
        try {
            // Verificar si el carrito existe
            const cartExists = await this.cartRepository.findCartById(cid)
            if (!cartExists) {
                return {
                    error: true,
                    mss: `El carrito con ID ${cid} no existe.`,
                };
            }
            const arrProduct = []
            for (const product of body.products) {
                const obj = {}
                const existingProduct = await ProductService.getById(product.id);

                if (!existingProduct) {
                    return {
                        error: true,
                        mss: `El producto con ID ${product.id} no existe.`,
                    };
                }
                obj._id = product.id,
                obj.quantity = product.quantity
                arrProduct.push(obj)

            }

            const add = await this.cartRepository.addToCart(cartExists, arrProduct);
            return add;
        } catch (error) {
            return {
                error: true,
                mss: `Error al agregar productos al carrito: ${error.message}`,
            };
        }
    }

    async getAllCartById(id) {
        try {
            const carts = await this.cartRepository.findCartById(id)
            return carts
        } catch (error) {
            console.log("error cart", error)
        }
    }


    async updateCartProduct(cid, pid, body) {
        try {
            const cart = await this.getAllCartById(cid);
            cart.products.map(prod => {
                if (pid ==  prod._id._id) {
                    prod.quantity = body.quantity
                }
            })
            const add = await this.cartRepository.updateCart(cart);
            return add;
        } catch (error) {
            console.log(error)
            return {
                error: true,
                mss: `This id doesn-t exits ${error.stringValue}`
            }
        }

    }

    async deleteProductById(cid, pid) {
  
        try {
            const cart = await this.getAllCartById(cid);
            const arrayProd = []

            cart.products.map(prod => {
                if (pid !=  prod._id._id) {
                    arrayProd.push(prod)
                }
            })
             const add = await this.cartRepository.addToCart(cart, arrayProd);
            return add; 
        } catch (error) {
            console.log(error)
            return {
                error: true,
                mss: `This id doesn-t exits ${error.stringValue}`
            }
        }

    }

    async cleanCart(cid) {
        try {
            const cart = await this.getAllCartById(cid);
            const add = await this.cartRepository.addToCart(cart, []);
            return add;
        } catch (error) {
            console.log(error)
            return {
                error: true,
                mss: `This id doesn-t exits ${error.stringValue}`
            }
        }

    }



}

module.exports.CartService = CartService
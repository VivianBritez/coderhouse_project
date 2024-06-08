const fs = require('fs').promises;
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const MODULE = 'Cart'
const fileCart = path.resolve('src/implementation/datos/cart.json')
const productFile = path.resolve('src/implementation/datos/products.json')

const getData = async (file ) =>{
    return await fs.readFile(file, 'utf8');
}

class CartService {
    constructor() { }

    async getCartList() {
        try {
            let carts = await getData(fileCart);
            carts = JSON.parse(carts);
            return carts
        } catch (error) {

            return []
        }
    }
    async getAllProducts() {
        try {
            let products = await getData(productFile);
            products = JSON.parse(products);
            return products
        } catch (error) {
            return []
        }
    }
    async validateProducts(products, body, id) {
        try {

            let data = []
            const doesntExits = []
            body.map(e => {
                const productExists = products.some(product => product.id === e.id);
                let obj = {
                    id: id,
                    products: e
                };

                if (productExists) {
                    data.push(obj)
                } else {
                    doesntExits.push(e);
                }

            });
            const listProduct = []
            let newCart = [{ id: id, products: listProduct }]

            const invalidProductIds = doesntExits.map(item => item.id);

            data.map(e => e.products).filter(item => {

                let obj = {}
                if (invalidProductIds !== item.id) {
                    obj.id = item.id
                    obj.quantity = item.quantity
                    listProduct.push(obj)
                }
            });

            console.log('new cart', newCart);

            newCart = listProduct.length === 0 ? [] : [{ id: id, products: listProduct }]

            return {
                validate: newCart,
                noValidate: doesntExits.map(e => e.id)
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }
    async createCart(body) {
        console.log(`${MODULE}, creating cart`);
        body.id = uuidv4();
        try {
            const products = await this.getAllProducts();
            const data = await this.validateProducts(products, body.products, body.id);
            console.log("validacion ", data)
            const cartsList = await this.getCartList();
            if (data.validate.length > 0) cartsList.push(data.validate[0]);
            await fs.writeFile(fileCart, JSON.stringify(cartsList));
            let message, isValidate;
            if (data.noValidate.length > 0 && data.validate.length === 0) {
                message = `No se pudo crear el carrito por que no existen los ids 
                 ${data.noValidate} enviados`
                isValidate = false
            } else if (data.noValidate.length > 0 && data.validate.length > 0) {

                message = `Algunos productos seleccionados ya no existen o hubo un error revisar los ids 
                ${data.noValidate} enviados`
                isValidate = true

            } else if (data.noValidate.length == 0 && data.validate.length > 0) {
                message = 'Se ha creado exitosamente'
                isValidate = true

            }
            body = data.validate
            return { message, body, isValidate }
        } catch (error) {
            console.error(error)
            return null
        }

    }

    async addToCart(cid, pid) {
        try {

            const productList = await this.getAllProducts();
            const prod = productList.filter(e => e.id === pid);
            console.log("prod", prod)
            const cart = await this.getAllCartById(cid);
            if (prod.length == 0 || cart.length == 0) {
                return { message: `Not found with this # ${cid}` }
            }
            const existingProductIndex = cart[0].products.findIndex(p => p.id === pid);
            if (existingProductIndex !== -1) {
                cart[0].products[existingProductIndex].quantity += 1;
            } else {
                cart[0].products.push({ id: pid, quantity: 1 });
            }

            const listAllCarts = await this.getCartList();
            const index = listAllCarts.findIndex(cart => cart.id === cid);

            if (index !== -1) {
                listAllCarts[index] = cart[0];
            }

            await fs.writeFile(fileCart, JSON.stringify(listAllCarts))
            return cart[0]
        } catch (error) {
            console.log(error)
            return null;
        }

    }

    async getAllCartById(id) {

        console.log("starting get Cart by id", id)
        try {
            const carts = await this.getCartList()
            return carts.filter(cart => cart.id === id);
        } catch (error) {
            return null;
        }
    }

}

module.exports.CartService = CartService
const fs = require('fs').promises;
const path = require('path');
const filePath = path.resolve('src/implementation/datos/products.json');
const { v4: uuidv4 } = require('uuid');
let io;




function validateCode(body, productList, duplicate) {
   return  productList.some(product => product.code === body.code);
}


class ProductService {
    constructor() { }

    static initializeSocket(socketIo) {
        io = socketIo;
    }
    static async getAllProducts() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const products = JSON.parse(data);
            return products
        } catch (error) {
            console.log("error", error)
            return null;

        }
    }
    static async getById(id) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const products = JSON.parse(data);
            const productById = products.filter(e => e.id === id)
            if (productById.length === 0) { return { message: `Not found product whit this id:  ${id}` } }
            return productById
        } catch (error) {
            console.log("error", error)
            return null;

        }
    }

    async createProduct(body) {
        try {

            body.id = uuidv4();
            body.status = true;
            body.thumbnails = JSON.stringify(['img/product01', 'img/product02']);
            let products = await fs.readFile(filePath, 'utf8');
            products = JSON.parse(products);
           if(validateCode(body, products)){
            return {message: 'The code already exits'}
           }
            products.push(body)
            await fs.writeFile(filePath, JSON.stringify(products));
            await this.getAllProductsSocket()
            return body
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    async updateProduct(id, body) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            let products = JSON.parse(data);
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) { products[index] = { id, thumbnails: body.thumbnails == undefined ? '' : body.thumbnails, ...body } } else { return { message: `Not found products whit this ${id}` } }
            await fs.writeFile(filePath, JSON.stringify(products));
            await this.getAllProductsSocket()
            return body
        } catch (error) {
            console.error(error)
            return null;

        }
    }

    async deleteProduct(id) {

        console.log("product id a eliminar", id)
        try {
            const data = await fs.readFile(filePath, 'utf8');
            let products = JSON.parse(data);

            const index = products.findIndex(product => product.id === id);
            console.log("index", index)
            if (index !== -1) { products = products.filter(e => e.id !== id) } else { return { message: `Not found products whit this ${id}` } }
            await fs.writeFile(filePath, JSON.stringify(products));
            await this.getAllProductsSocket()
            return id

        } catch (error) {
            console.error(error)
            return null;

        }
    }


    async getAllProductsSocket() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const products = JSON.parse(data);
            if (io) {
                io.emit('productsUpdated', products); // Emitir la lista de productos a través de Socket.io
            } else {
                console.error("Socket.io no está inicializado.");
            }
            return products;
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
            throw error;
        }
    }

}
module.exports.ProductService = ProductService
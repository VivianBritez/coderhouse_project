const Product = require('../schema/product.schema');

class ProductRepository {
  async create(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(productId, productData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, { new: true, runValidators: true });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async findByCode(code) {
    try {
      const product = await Product.findOne({ code });
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductRepository();

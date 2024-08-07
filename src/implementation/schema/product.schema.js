const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available:{
    type: Boolean,
    default: true
  },
 thumbnails:{
  type: String,
  default :JSON.stringify(['img/product01', 'img/product02'])
 }
}, {
  timestamps: true 
});

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

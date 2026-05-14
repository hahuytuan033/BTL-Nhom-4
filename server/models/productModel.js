const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    status: { type: String, default: 'Có sẵn' }, // 'Có sẵn', 'Sắp hết', 'Hết hàng'
    description: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };

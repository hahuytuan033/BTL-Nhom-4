const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    userEmail: { type: String }, // Link to user
    amount: { type: Number, required: true },
    status: { type: String, default: 'Chờ xác nhận' }, // 'Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Hoàn thành'
    items: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };

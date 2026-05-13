const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/btl_nhom_4';

async function connectDb() {
    try {
        console.log('⏳ Đang kết nối đến MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Kết nối thành công đến MongoDB!');
    } catch (error) {
        console.error('❌ Lỗi kết nối đến MongoDB:');
        console.error('- Kiểm tra lại MONGODB_URI trong file .env. xem đã chuẩn chưa???');
        console.error('- Lỗi chi tiết:', error.message);
        throw error;
    }
}

module.exports = { connectDb };

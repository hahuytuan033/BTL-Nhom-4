const { connectDb } = require('../config/db');

async function createUser(userData) {
    const { bucket } = await connectDb();
    const collection = bucket.defaultCollection();
    
    // Sử dụng email làm ID để đảm bảo không bị trùng
    const docId = `user::${userData.email}`;
    
    try {
        await collection.upsert(docId, {
            ...userData,
            type: 'user', // Để phân biệt với các loại dữ liệu khác (product, order)
            createdAt: new Date().toISOString()
        });
        console.log(`👤 Đã tạo/cập nhật user: ${userData.email}`);
        return true;
    } catch (error) {
        console.error('❌ Lỗi khi tạo user:', error.message);
        throw error;
    }
}

module.exports = { createUser };

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    status: { type: String, default: 'active' },
    type: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createUser(userData) {
    try {
        // Sử dụng email làm filter để upsert giống logic cũ của Couchbase
        const user = await User.findOneAndUpdate(
            { email: userData.email },
            { ...userData },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log(`👤 Đã tạo/cập nhật user: ${user.email}`);
        return user;
    } catch (error) {
        console.error('❌ Lỗi khi tạo user:', error.message);
        throw error;
    }
}

module.exports = { User, createUser };

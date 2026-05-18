const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function() { return this.provider === 'local'; } 
    },
    role: { type: String, default: 'user' },
    status: { type: String, default: 'active' },
    provider: { type: String, default: 'local' }, // 'local', 'google', etc.
    providerId: { type: String },
    avatar: { type: String },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now }
});

// Mã hóa mật khẩu trước khi lưu (Sửa lỗi: Không dùng 'next' với async)
userSchema.pre('save', async function() {
    if (!this.isModified('password') || !this.password) return;
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

// Phương thức kiểm tra mật khẩu
userSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };

const { Product } = require('../models/productModel');

// @desc    Lấy danh sách tất cả sản phẩm
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Tạo sản phẩm mới
// @route   POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const productData = { ...req.body };
        
        // Nếu có file ảnh được upload qua Cloudinary, Multer sẽ đặt URL vào req.file.path
        if (req.file) {
            productData.image = req.file.path;
        }

        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Xóa sản phẩm
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.json({ message: 'Đã xóa sản phẩm' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

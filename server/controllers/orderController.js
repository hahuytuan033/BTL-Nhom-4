const { Order } = require('../models/orderModel');

// @desc    Lấy danh sách tất cả đơn hàng
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Lấy danh sách đơn hàng của người dùng
// @route   GET /api/orders/myorders?email=...
exports.getUserOrders = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: 'Email là bắt buộc' });
        }
        const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Cập nhật trạng thái đơn hàng
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, returnReason } = req.body;
        const updateData = { status };
        if (returnReason !== undefined) {
            updateData.returnReason = returnReason;
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        if (order) {
            // Emit Socket.io event for real-time order update
            if (req.io) {
                req.io.emit('update_order', order);
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
    try {
        const { customer, userEmail, phone, address, amount, items } = req.body;
        
        if (!customer || !phone || !address || !amount) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ tên người nhận, số điện thoại và địa chỉ giao hàng.' });
        }

        // Tạo mã đơn hàng ngẫu nhiên (Ví dụ: N4-XXXXXX)
        const orderNumber = 'N4-' + Math.floor(100000 + Math.random() * 900000);

        const order = new Order({
            orderNumber,
            customer,
            userEmail,
            phone,
            address,
            amount,
            items: items || 1
        });

        await order.save();

        // Emit Socket.io event for real-time notification
        if (req.io) {
            req.io.emit('new_order', order);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


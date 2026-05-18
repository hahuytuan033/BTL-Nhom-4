const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus, getUserOrders } = require('../controllers/orderController');

router.route('/')
    .get(getOrders);

router.get('/myorders', getUserOrders);

router.route('/:id/status')
    .put(updateOrderStatus);

module.exports = router;

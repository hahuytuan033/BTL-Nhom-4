const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus, getUserOrders, createOrder } = require('../controllers/orderController');

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.get('/myorders', getUserOrders);

router.route('/:id/status')
    .put(updateOrderStatus);

module.exports = router;

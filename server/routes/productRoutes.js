const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { uploadCloud } = require('../config/cloudinary');

router.route('/')
    .get(getProducts)
    .post(uploadCloud.single('image'), createProduct);

router.route('/:id')
    .delete(deleteProduct);

module.exports = router;

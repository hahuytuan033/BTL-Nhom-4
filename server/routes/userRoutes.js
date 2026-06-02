const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, updateUserStatus, getWishlist, toggleWishlist, getCart, updateCart } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/:id/status').put(updateUserStatus);

router.get('/wishlist', getWishlist);
router.post('/wishlist/toggle', toggleWishlist);

router.get('/cart', getCart);
router.post('/cart', updateCart);

module.exports = router;

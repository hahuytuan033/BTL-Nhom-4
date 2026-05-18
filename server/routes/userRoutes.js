const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, updateUserStatus, getWishlist, toggleWishlist } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/:id/status').put(updateUserStatus);

router.get('/wishlist', getWishlist);
router.post('/wishlist/toggle', toggleWishlist);

module.exports = router;

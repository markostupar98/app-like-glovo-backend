const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user routes
router.get('/:userId/profile', userController.getUserProfile);
router.put('/:userId/profile', userController.updateUserProfile);


module.exports = router;

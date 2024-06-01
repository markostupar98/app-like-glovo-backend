const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user routes
router.get('/:userId/profile', userController.getUserProfile);

module.exports = router;

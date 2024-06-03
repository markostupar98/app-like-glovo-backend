const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user routes
router.get('/:userId/profile', userController.getUserProfile);
router.put('/:userId/profile', userController.updateUserProfile);
router.post('/save-token', userController.saveNotificationToken);
router.post('/save-driver-token', userController.saveDriverNotificationToken);


module.exports = router;

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, notificationController.listNotifications);
router.post('/:id/read', authenticate, notificationController.markAsRead);

module.exports = router; 
const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', tipController.listTips); // /api/tips?plantId=&search=&sort=
router.post('/', authenticate, tipController.createTip);
router.put('/:id', authenticate, tipController.updateTip);
router.delete('/:id', authenticate, tipController.deleteTip);
router.post('/:id/upvote', authenticate, tipController.upvoteTip);

module.exports = router; 
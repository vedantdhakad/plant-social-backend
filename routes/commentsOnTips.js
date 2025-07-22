const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentOnTipController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:tipId', commentController.listComments);
router.post('/:tipId', authenticate, commentController.addComment);
router.put('/edit/:id', authenticate, commentController.editComment);
router.delete('/delete/:id', authenticate, commentController.deleteComment);

module.exports = router; 
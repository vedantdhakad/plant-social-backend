const express = require('express');
const router = express.Router();
const { getComments, getComment, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', getComments);
router.get('/:id', getComment);
router.post('/', authenticate, createComment);
router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router; 
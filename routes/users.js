const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:id', userController.getUserProfile);
router.put('/:id', authenticate, userController.updateUserProfile);
router.post('/:id/follow', authenticate, userController.followUser);
router.post('/:id/unfollow', authenticate, userController.unfollowUser);
router.get('/:id/followers', userController.getFollowers);
router.get('/:id/following', userController.getFollowing);
router.get('/:id/tips', userController.getUserTips);
router.get('/:id/plants', userController.getUserPlants);
router.get('/feed/main', authenticate, userController.getSocialFeed);

module.exports = router; 
const express = require('express');
const router = express.Router();
const myPlantController = require('../controllers/myPlantController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, myPlantController.listUserPlants);
router.post('/', authenticate, myPlantController.addUserPlant);
router.post('/:id/action', authenticate, myPlantController.logCareAction);
router.get('/:id/badges', authenticate, myPlantController.getPlantBadges);

module.exports = router; 
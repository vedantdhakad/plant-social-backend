const express = require('express');
const router = express.Router();
const { searchPlants, getPlant } = require('../controllers/plantController');

router.get('/', searchPlants); // /api/plants?search=...
router.get('/:id', getPlant);  // /api/plants/:id

module.exports = router; 
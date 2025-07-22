const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), scanController.scanPlant);

module.exports = router; 
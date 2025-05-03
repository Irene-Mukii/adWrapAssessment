const express = require('express');
const staticMediaController = require('../controllers/staticMediaController');

const router = express.Router();
//const staticMediaController = new StaticMediaController();

// Define routes
router.get('/', (req, res) => staticMediaController.getAllStaticMedia(req, res));
router.get('/:id', (req, res) => staticMediaController.getStaticMediaById(req, res));
router.post('/', (req, res) => staticMediaController.createStaticMediaWithFaces(req, res));

module.exports = router;
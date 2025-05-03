const express = require('express');
const streetPoleMediaController = require('../controllers/streetPoleMediaController');

const router = express.Router();
//const streetPoleMediaController = new StreetPoleMediaController();

// Define routes
router.get('/', (req, res) => streetPoleMediaController.getAllStreetPoleMedia(req, res));
router.get('/:id', (req, res) => streetPoleMediaController.getStreetPoleMediaById(req, res));
router.post('/', (req, res) => streetPoleMediaController.createStreetPoleMediaWithRoutes(req, res));

module.exports = router;
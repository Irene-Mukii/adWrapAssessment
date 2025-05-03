const express = require('express');
const faceController = require('../controllers/faceController');

const router = express.Router();
//const faceController = new FaceController();

// Define routes
router.get('/', (req, res) => faceController.getAllFaces(req, res));
router.get('/:id', (req, res) => faceController.getFaceById(req, res));
router.post('/', (req, res) => faceController.createFace(req, res));

module.exports = router;
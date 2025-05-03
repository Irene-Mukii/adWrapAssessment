const express = require('express');
const routeController = require('../controllers/routeController');

const router = express.Router();
//const routeController = new RouteController();

// Define routes
router.get('/', (req, res) => routeController.getAllRoutes(req, res));
router.get('/:id', (req, res) => routeController.getRouteById(req, res));
router.post('/', (req, res) => routeController.createRoute(req, res));

module.exports = router;
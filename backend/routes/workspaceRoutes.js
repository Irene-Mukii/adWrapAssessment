const express = require('express');
const workspaceController = require('../controllers/workspaceController');

const router = express.Router();
//const workspaceController = new WorkspaceController();

// Define routes
router.get('/', (req, res) => workspaceController.getAllWorkspaces(req, res));
router.get('/:id', (req, res) => workspaceController.getWorkspaceById(req, res));
router.post('/', (req, res) => workspaceController.createWorkspace(req, res));

module.exports = router;
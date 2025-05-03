const workspaceService = require('../services/workspaceService');

class WorkspaceController {
  /**
   * Get all workspaces.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllWorkspaces(req, res) {
    try {
      const workspaces = await workspaceService.getAllWorkspaces();
      res.status(200).json(workspaces);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a workspace by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getWorkspaceById(req, res) {
    try {
      const { id } = req.params;
      console.log('Fetching workspace by ID:', id); // Debugging log
      const workspace = await workspaceService.getWorkspaceById(id);
      if (!workspace) {
        return res.status(404).json({ error: 'Workspace not found' });
      }
      res.status(200).json(workspace);
    } catch (error) {
        console.error('Error in getWorkspaceById:', error); // Debugging log
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a new workspace with optional nested media items.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createWorkspace(req, res) {
    try {
      const { workspaceData, staticMediaData, streetPoleMediaData } = req.body;

      // Add the current timestamp to the workspace data
      const timestamp = new Date();
      const workspaceWithTimestamp = {
        ...workspaceData,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const result = await workspaceService.createWorkspace(
        workspaceWithTimestamp,
        staticMediaData,
        streetPoleMediaData
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WorkspaceController();
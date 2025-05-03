const { Workspace } = require('../models');
const WorkspaceDto = require('../dtos/workspaceDto');
const staticMediaService = require('./staticMediaService');
const streetPoleMediaService = require('./streetPoleMediaService');

class WorkspaceService {
  /**
   * Get all workspace records.
   * @returns {Promise<WorkspaceDto[]>} Array of WorkspaceDto objects.
   */
  async getAllWorkspaces() {
    const workspaces = await Workspace.findAll();
    return workspaces.map(workspace => new WorkspaceDto(workspace));
  }

  /**
   * Get a workspace record by ID.
   * @param {number} id - The ID of the workspace.
   * @returns {Promise<WorkspaceDto|null>} WorkspaceDto object or null if not found.
   */
  async getWorkspaceById(id) {
    try {
    const workspace = await Workspace.findByPk(id);
    if (!workspace) {
      return null;
    }
    console.log('Workspace found:', workspace);
    return new WorkspaceDto(workspace);
    }
    catch (error) {
      console.error('Error fetching workspace by ID:', error);
      throw new Error('Error fetching workspace by ID');
    }
  }

  /**
   * Create a workspace and optionally create associated media items.
   * @param {Object} workspaceData - The workspace data.
   * @param {Array<Object>} staticMediaData - Array of static media data (optional).
   * @param {Array<Object>} streetPoleMediaData - Array of street pole media data (optional).
   * @returns {Promise<Object>} The created workspace with associated media items.
   */
  async createWorkspace(workspaceData, staticMediaData = [], streetPoleMediaData = []) {
    // Create the workspace
    const workspace = await Workspace.create(workspaceData);

    // Create associated static media with faces
    const staticMediaResults = await Promise.all(
      staticMediaData.map(async ({ staticMedia, faces }) => {
        return staticMediaService.createStaticMediaWithFaces(workspace.id, staticMedia, faces);
      })
    );

    // Create associated street pole media with routes
    const streetPoleMediaResults = await Promise.all(
      streetPoleMediaData.map(async ({ streetPoleMedia, routes }) => {
        return streetPoleMediaService.createStreetPoleMediaWithRoutes(workspace.id, streetPoleMedia, routes);
      })
    );

    return {
      workspace: new WorkspaceDto(workspace),
      staticMedia: staticMediaResults,
      streetPoleMedia: streetPoleMediaResults,
    };
  }
}

module.exports = new WorkspaceService();
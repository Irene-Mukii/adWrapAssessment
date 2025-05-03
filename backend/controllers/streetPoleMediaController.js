const streetPoleMediaService = require('../services/streetPoleMediaService');

class StreetPoleMediaController {
  /**
   * Get all street pole media records.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllStreetPoleMedia(req, res) {
    try {
      const streetPoleMedia = await streetPoleMediaService.getAllStreetPoleMedia();
      res.status(200).json(streetPoleMedia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a street pole media record by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getStreetPoleMediaById(req, res) {
    try {
      const { id } = req.params;
      const streetPoleMedia = await streetPoleMediaService.getStreetPoleMediaById(id);
      if (!streetPoleMedia) {
        return res.status(404).json({ error: 'Street pole media not found' });
      }
      res.status(200).json(streetPoleMedia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a street pole media item with associated routes.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createStreetPoleMediaWithRoutes(req, res) {
    try {
      const { workspaceId, streetPoleMediaData, routesData } = req.body;
      const result = await streetPoleMediaService.createStreetPoleMediaWithRoutes(workspaceId, streetPoleMediaData, routesData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StreetPoleMediaController();
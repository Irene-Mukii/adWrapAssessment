const staticMediaService = require('../services/staticMediaService');

class StaticMediaController {
  /**
   * Get all static media records.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllStaticMedia(req, res) {
    try {
      const staticMedia = await staticMediaService.getAllStaticMedia();
      res.status(200).json(staticMedia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a static media record by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getStaticMediaById(req, res) {
    try {
      const { id } = req.params;
      const staticMedia = await staticMediaService.getStaticMediaById(id);
      if (!staticMedia) {
        return res.status(404).json({ error: 'Static media not found' });
      }
      res.status(200).json(staticMedia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a static media item with associated faces.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createStaticMediaWithFaces(req, res) {
    try {
      const { workspaceId, staticMediaData, facesData } = req.body;
      const result = await staticMediaService.createStaticMediaWithFaces(workspaceId, staticMediaData, facesData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StaticMediaController();
const faceService = require('../services/faceService');

class FaceController {
  /**
   * Get all face records.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllFaces(req, res) {
    try {
      const faces = await faceService.getAllFaces();
      res.status(200).json(faces);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a face record by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getFaceById(req, res) {
    try {
      const { id } = req.params;
      const face = await faceService.getFaceById(id);
      if (!face) {
        return res.status(404).json({ error: 'Face not found' });
      }
      res.status(200).json(face);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a face for a static media item.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createFace(req, res) {
    try {
      const { workspaceId, staticMediaId, faceData, faceCount } = req.body;
      const result = await faceService.createFace(workspaceId, staticMediaId, faceData, faceCount);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FaceController();
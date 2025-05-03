const { Face } = require('../models');
const FaceDto = require('../dtos/faceDto');

class FaceService {
  /**
   * Get all face records.
   * @returns {Promise<FaceDto[]>} Array of FaceDto objects.
   */
  async getAllFaces() {
    const faces = await Face.findAll();
    return faces.map(face => new FaceDto(face));
  }

  /**
   * Get a face record by ID.
   * @param {number} id - The ID of the face.
   * @returns {Promise<FaceDto|null>} FaceDto object or null if not found.
   */
  async getFaceById(id) {
    const face = await Face.findByPk(id);
    if (!face) {
      return null;
    }
    return new FaceDto(face);
  }
  /**
   * Create a face for a static media item.
   * @param {number} workspaceId - The ID of the workspace.
   * @param {number} staticMediaId - The ID of the static media.
   * @param {Object} faceData - The face data.
   * @param {number} faceCount - The current count of faces for the static media.
   * @returns {Promise<FaceDto>} FaceDto object.
   */
  async createFace(workspaceId, staticMediaId, faceData, faceCount) {
    const formattedId = `${workspaceId}${String(faceCount + 1).padStart(2, '0')}`; // Format: 201, 202, etc.

    const face = Face.create({
      ...faceData,
      id: parseInt(formattedId, 10),
      staticMediaId,
    });
    return new FaceDto(face);
  }
}

module.exports = new FaceService();
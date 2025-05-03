const { StaticMedia } = require('../models');
const StaticMediaDto = require('../dtos/staticMediaDto');
const faceService = require('./faceService');

class StaticMediaService {
  /**
   * Get all static media records.
   * @returns {Promise<StaticMediaDto[]>} Array of StaticMediaDto objects.
   */
  async getAllStaticMedia() {
    const staticMediaRecords = await StaticMedia.findAll();
    return staticMediaRecords.map(record => new StaticMediaDto(record));
  }

  /**
   * Get a static media record by ID.
   * @param {number} id - The ID of the static media.
   * @returns {Promise<StaticMediaDto|null>} StaticMediaDto object or null if not found.
   */
  async getStaticMediaById(id) {
    const staticMedia = await StaticMedia.findByPk(id);
    if (!staticMedia) {
      return null;
    }
    return new StaticMediaDto(staticMedia);
  }
   /**
   * Create a static media item with associated faces for a workspace.
   * @param {number} workspaceId - The ID of the workspace.
   * @param {Object} staticMediaData - The static media data.
   * @param {Array<Object>} facesData - Array of face data.
   * @returns {Promise<Object>} The created static media with faces.
   */
   async createStaticMediaWithFaces(workspaceId, staticMediaData, facesData) {
    // Create the static media item
    const staticMedia = await StaticMedia.create({
      ...staticMediaData,
      workspaceId,
    });

    // Create associated faces with formatted IDs
    const faces = await Promise.all(
      facesData.map(async (faceData, index) => {
        const faceCount = await Face.count({ where: { staticMediaId: staticMedia.id } });
        return faceService.createFace(workspaceId, staticMedia.id, faceData, faceCount);
      })
    );

    return { staticMedia: new StaticMediaDto(staticMedia), faces };
  }
}

module.exports = new StaticMediaService();
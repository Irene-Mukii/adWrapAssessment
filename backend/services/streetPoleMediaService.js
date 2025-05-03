const { StreetPoleMedia, Route, Workspace } = require('../models');
const StreetPoleMediaDto = require('../dtos/streetPoleMediaDto'); 

class StreetPoleMediaService {
  /**
   * Get all street pole media records.
   * @returns {Promise<StreetPoleMediaDto[]>} Array of StreetPoleMediaDto objects.
   */
  async getAllStreetPoleMedia() {
    const streetPoleMediaRecords = await StreetPoleMedia.findAll();
    return streetPoleMediaRecords.map(record => new StreetPoleMediaDto(record));
  }

  /**
   * Get a street pole media record by ID.
   * @param {number} id - The ID of the street pole media.
   * @returns {Promise<StreetPoleMediaDto|null>} StreetPoleMediaDto object or null if not found.
   */
  async getStreetPoleMediaById(id) {
    const streetPoleMedia = await StreetPoleMedia.findByPk(id);
    if (!streetPoleMedia) {
      return null;
    }
    return new StreetPoleMediaDto(streetPoleMedia);
  }

  /**
   * Create a street pole media item with associated routes for a workspace.
   * @param {number} workspaceId - The ID of the workspace.
   * @param {Object} streetPoleMediaData - The street pole media data.
   * @param {Array<Object>} routesData - Array of route data.
   * @returns {Promise<Object>} The created street pole media with routes.
   */
  async createStreetPoleMediaWithRoutes(workspaceId, streetPoleMediaData, routesData) {
    try{
    console.log('Creating street pole media for workspace ID:', workspaceId); // Debugging log
    console.log('Street pole media data:', streetPoleMediaData); // Debugging log
    console.log('Routes data:', routesData); // Debugging log

    // Create the street pole media item
    const streetPoleMedia = await StreetPoleMedia.create({
      ...streetPoleMediaData,
      workspaceId,
    });
    console.log('Street pole media created:', streetPoleMedia); // Debugging log

    // Create associated routes with formatted IDs
    const routes = await Promise.all(
      routesData.map(async (routeData, index) => {
        const routeCount = await Route.count({ where: { streetPoleMediaId: streetPoleMedia.id } });
        const formattedId = `${workspaceId}${String(routeCount + 1).padStart(2, '0')}`; // Format: 201, 202, etc.

        return Route.create({
          ...routeData,
          id: parseInt(formattedId, 10),
          streetPoleMediaId: streetPoleMedia.id,
        });
      })
    );

    return { streetPoleMedia: new StreetPoleMedia(streetPoleMedia), routes };
  }catch (error) {
    console.error('Error creating street pole media with routes:', error); // Debugging log
    throw new Error('Error creating street pole media with routes');
  }
}

// Closing brace for the class was missing
}

module.exports = new StreetPoleMediaService();
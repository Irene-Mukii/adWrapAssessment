const { Route } = require('../models');
const RouteDto = require('../dtos/routeDto');

class RouteService {
  /**
   * Get all route records.
   * @returns {Promise<RouteDto[]>} Array of RouteDto objects.
   */
  async getAllRoutes() {
    const routes = await Route.findAll();
    return routes.map(route => new RouteDto(route));
  }

  /**
   * Get a route record by ID.
   * @param {number} id - The ID of the route.
   * @returns {Promise<RouteDto|null>} RouteDto object or null if not found.
   */
  async getRouteById(id) {
    const route = await Route.findByPk(id);
    if (!route) {
      return null;
    }
    return new RouteDto(route);
  }
   /**
   * Create a route for a street pole media item.
   * @param {number} workspaceId - The ID of the workspace.
   * @param {number} streetPoleMediaId - The ID of the street pole media.
   * @param {Object} routeData - The route data.
   * @param {number} routeCount - The current count of routes for the street pole media.
   * @returns {Promise<RouteDto|nul>} The created routeDto Object.
   */
  async createRoute(workspaceId, streetPoleMediaId, routeData, routeCount) {
    const formattedId = `${workspaceId}${String(routeCount + 1).padStart(2, '0')}`; // Format: 201, 202, etc.

    const route =  Route.create({
      ...routeData,
      id: parseInt(formattedId, 10),
      streetPoleMediaId,
    });
    return new RouteDto(route);
  }
}

module.exports = new RouteService();
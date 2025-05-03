const routeService = require('../services/routeService');

class RouteController {
  /**
   * Get all route records.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllRoutes(req, res) {
    try {
      const routes = await routeService.getAllRoutes();
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a route record by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getRouteById(req, res) {
    try {
      const { id } = req.params;
      const route = await routeService.getRouteById(id);
      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }
      res.status(200).json(route);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a route for a street pole media item.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createRoute(req, res) {
    try {
      const { workspaceId, streetPoleMediaId, routeData, routeCount } = req.body;
      const result = await routeService.createRoute(workspaceId, streetPoleMediaId, routeData, routeCount);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RouteController();
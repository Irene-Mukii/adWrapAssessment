const request = require('supertest');
const app = require('../index');
//jest.mock('../models', () => require('../__mocks__/models'));

describe('Route Controller', () => {
  it('should fetch all routes', async () => {
    const response = await request(app).get('/routes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a route by ID', async () => {
    const response = await request(app).get('/routes/1');
    if (response.status === 404) {
      expect(response.body.error).toBe('Route not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should create a route', async () => {
    const routeData = {
      workspaceId: 1,
      streetPoleMediaId: 1,
      routeData: { sideRoute: 'North', description: 'Route 1', numberOfStreetPoles: 5, pricePerStreetPole: 50 },
      routeCount: 0,
    };

    const response = await request(app).post('/routes').send(routeData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('description', 'Route 1');
  });
});
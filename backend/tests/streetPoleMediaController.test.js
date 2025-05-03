const request = require('supertest');
const app = require('../index');
//jest.mock('../models', () => require('../__mocks__/models'));
const { sequelize } = require('../models'); // Import Sequelize instance

describe('Street Pole Media Controller', () => {
  it('should fetch all street pole media', async () => {
    const response = await request(app).get('/street-pole-media');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a street pole media by ID', async () => {
    const response = await request(app).get('/street-pole-media/1');
    if (response.status === 404) {
      expect(response.body.error).toBe('Street pole media not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should create a street pole media with routes', async () => {
    const streetPoleMediaData = {
      workspaceId: 5,
      streetPoleMediaData: {
        location: 'Main Street',
        closestLandmark: 'Library',
        availability: 'Available',
      },
      routesData: [
        { sideRoute: 'North', description: 'Route 1', numberOfStreetPoles: 5, pricePerStreetPole: 50 },
      ],
    };

    const response = await request(app).post('/street-pole-media').send(streetPoleMediaData);
    expect(response.status).toBe(201);
    expect(response.body.streetPoleMedia).toHaveProperty('location', 'Main Street');
  });
});

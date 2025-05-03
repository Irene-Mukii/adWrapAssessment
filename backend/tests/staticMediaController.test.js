const request = require('supertest');
const app = require('../index');
//jest.mock('../models', () => require('../__mocks__/models'));

describe('Static Media Controller', () => {
  it('should fetch all static media', async () => {
    const response = await request(app).get('/static-media');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a static media by ID', async () => {
    const response = await request(app).get('/static-media/1');
    if (response.status === 404) {
      expect(response.body.error).toBe('Static media not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should create a static media with faces', async () => {
    const staticMediaData = {
      workspaceId: 1,
      staticMediaData: {
        type: 'static',
        format: 'standard',
        location: 'Downtown',
        closestLandmark: 'City Hall',
        availability: 'Available',
        numberOfFaces: 3,
      },
      facesData: [
        { description: 'Face 1', availability: 'Available', images: ['face1.jpg'], rent: 100 },
      ],
    };

    const response = await request(app).post('/static-media').send(staticMediaData);
    expect(response.status).toBe(201);
    expect(response.body.staticMedia).toHaveProperty('type', 'static');
  });
});
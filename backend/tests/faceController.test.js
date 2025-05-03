const request = require('supertest');
const app = require('../index');
//jest.mock('../models', () => require('../__mocks__/models'));

describe('Face Controller', () => {
  it('should fetch all faces', async () => {
    const response = await request(app).get('/faces');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a face by ID', async () => {
    const response = await request(app).get('/faces/1');
    if (response.status === 404) {
      expect(response.body.error).toBe('Face not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should create a face', async () => {
    const faceData = {
      workspaceId: 1,
      staticMediaId: 1,
      faceData: { description: 'Face 1', availability: 'Available', images: ['face1.jpg'], rent: 100 },
      faceCount: 0,
    };

    const response = await request(app).post('/faces').send(faceData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('description', 'Face 1');
  });
});
const request = require('supertest');
const app = require('../index'); // Import the Express app
//jest.mock('../models', () => require('../__mocks__/models'));
const { sequelize } = require('../models'); // Import Sequelize instance
 
describe('Workspace Controller', () => {
  it('should fetch all workspaces', async () => {
    const response = await request(app).get('/workspaces');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  

  it('should fetch a workspace by ID', async () => {
    const response = await request(app).get('/workspaces/1');
    if (response.status === 404) {
      expect(response.body.error).toBe('Workspace not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should create a new workspace', async () => {
    const workspaceData = {
      workspaceData: {
        name: 'Test Workspace',
        email: 'test@example.com',
        address: '123 Test St',
        location: 'Test City',
      },
      staticMediaData: [],
      streetPoleMediaData: [],
    };

    const response = await request(app).post('/workspaces').send(workspaceData);
    expect(response.status).toBe(201);
    expect(response.body.workspace).toHaveProperty('name', 'Test Workspace');
  });
});

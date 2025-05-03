const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const WorkspaceMock = dbMock.define('Workspace', {
  id: 1,
  name: 'Test Workspace',
  email: 'test@example.com',
  address: '123 Test St',
  location: 'Test City',
});

const StaticMediaMock = dbMock.define('StaticMedia', {
  id: 1,
  type: 'static',
  format: 'standard',
  location: 'Downtown',
  closestLandmark: 'City Hall',
  availability: 'Available',
  numberOfFaces: 3,
  workspaceId: 1,
});

const FaceMock = dbMock.define('Face', {
  id: 101,
  description: 'Face 1',
  availability: 'Available',
  images: ['face1.jpg'],
  rent: 100,
  staticMediaId: 1,
});

WorkspaceMock.findByPk = jest.fn((id) => {
    if (id === 1) {
      return Promise.resolve({
        id: 1,
        name: 'Test Workspace',
        email: 'test@example.com',
        address: '123 Test St',
        location: 'Test City',
      });
    }
    return Promise.resolve(null); // Return null if the ID is not found
  });


module.exports = {
  Workspace: WorkspaceMock,
  StaticMedia: StaticMediaMock,
  Face: FaceMock,
};
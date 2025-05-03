class StaticMediaDto {
  constructor({ id, type, format, location, numberOfFaces, closestLandmark, availability, workspaceId }) {
    this.id = id;
    this.type = type;
    this.format = format;
    this.location = location;
    this.numberOfFaces = numberOfFaces;
    this.closestLandmark = closestLandmark;
    this.availability = availability;
    this.workspaceId = workspaceId;
  }
}

module.exports = StaticMediaDto;
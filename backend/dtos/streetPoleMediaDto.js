class StreetPoleMediaDto {
  constructor({ id, location, closestLandmark, availability, workspaceId }) {
    this.id = id;
    this.location = location;
    this.closestLandmark = closestLandmark;
    this.availability = availability;
    this.workspaceId = workspaceId;
  }
}

module.exports = StreetPoleMediaDto;
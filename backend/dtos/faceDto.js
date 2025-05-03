class FaceDto {
  constructor({ id, description, availability, images, rent, staticMediaId }) {
    this.id = id;
    this.description = description;
    this.availability = availability;
    this.images = images;
    this.rent = rent;
    this.staticMediaId = staticMediaId;
  }
}

module.exports = FaceDto;
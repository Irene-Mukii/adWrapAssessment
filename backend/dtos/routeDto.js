class RouteDto {
  constructor({ id, sideRoute, description, numberOfStreetPoles, pricePerStreetPole, images, streetPoleMediaId }) {
    this.id = id;
    this.sideRoute = sideRoute;
    this.description = description;
    this.numberOfStreetPoles = numberOfStreetPoles;
    this.pricePerStreetPole = pricePerStreetPole;
    this.images = images;
    this.streetPoleMediaId = streetPoleMediaId;
  }
}

module.exports = RouteDto;
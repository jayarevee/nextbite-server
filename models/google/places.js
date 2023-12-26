// Models for google places requests

class LocationRestriction {
  constructor(circle) {
    this.circle = circle;
  }
}

class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = parseFloat(radius); // this is a double
  }
}

class Center {
  constructor(latitude, longitude) {
    this.latitude = latitude; // double
    this.longitude = longitude; // double
  }
}

class IncludedTypes {
  constructor(types) {
    this.types = types; // this is a list
  }
}

class GoogleRequestData {
  // TODO maybe add some type safety
  // constructor(locationRestriction, includedTypes){
  //     this.locationRestriction = locationRestriction;
  //     this.includedTypes = includedTypes;
  // }

  constructor(req) {
    const circle = new Circle(
      new Center(req.coordinates.latitude, req.coordinates.longitude),
      parseFloat(req.radius)
    );
    this.locationRestriction = new LocationRestriction(circle);
    // const circle = {
    //     "circle": {
    //         "center": {
    //             "latitude": req.coordinates.latitude,
    //             "longitude": req.coordinates.longitude
    //         },
    //         "radius": parseFloat(req.radius)
    //     }
    // }
    //this.locationRestriction = circle;
    this.includedTypes = new IncludedTypes(req.types);
    //this.includedTypes = req.types;
  }

  serialize() {
    return JSON.stringify({
      locationRestriction: this.locationRestriction,
      includedTypes: this.includedTypes.types,
    });
  }
}

export { GoogleRequestData };

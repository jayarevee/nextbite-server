// Models for requesting next-bite server
class Request {
  // constructor(){}
  constructor(req = {}) {
    this.page = req.page || 1;
    this.pageSize = req.pageSize || 10;
  }
}

class RecommendationsByCoordinates extends Request {
  constructor(req = {}) {
    super(req);
    this.coordinates = req.coordinates || { latitude: 0, longitude: 0 };
    this.radius = parseFloat(req.radius) || 0.0;
    this.types = req.types || []; // list of strings, empty array as default
  }
}

export { RecommendationsByCoordinates };

import express, { request } from "express";
import { searchNearbyPlaces } from "./clients/maps.js";
import { GoogleRequestData } from "./models/google/places.js";
import { RecommendationsByCoordinates } from "./models/request.js";
import { mockResponse } from "./mockResponse.js";
import "dotenv/config.js";

const app = express();
const port = 5001;
app.use(express.json());
app.get("env");

// API design:
// 1) /getRecommendationsByCoordinates // TODO restrict to only requests from my app
//  request float: radius(miles or km), page, center(coordinates), type:string
// 2) getRecommendationsNearby
// 3) /getRecommendationsByAddress
// 4) getRecommendationsByZipCode

// Used to certain for recommendations by coordinates (Lat and Long)
// Request sample:
/** 
 * {
    "page": 1,
    "pageSize": 10,
    "coordinates": {
        "latitude": 33.732241,
        "longitude": -118.003550
    },
    "radius": 500.5,
    "types": ["restaurant"]
}
//TODO Add pagination 
*/

app.post("/recommendationsByCoordinates", function (req, res) {
  const requestData = new RecommendationsByCoordinates(req.body);
  const googleRequest = new GoogleRequestData(requestData);
  const useMock = true;
  if (useMock) {
    console.log(
      `Sending Mock response for request: ${JSON.stringify(req.body)}`
    );
    res.send(mockResponse);
  } else {
    searchNearbyPlaces(googleRequest)
      .then((data) => {
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        // Paginate the results
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedResults = data.places.slice(startIndex, endIndex);
        res.send(paginatedResults);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

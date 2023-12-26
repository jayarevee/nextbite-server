// Library hosting Google Map API functions
import axios from "axios";
import "dotenv/config";

const apiUrl = "https://places.googleapis.com/v1/places:searchNearby";

const searchNearbyPlaces = async (requestData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_API,
      "X-Goog-FieldMask": "places.displayName,places.name",
    };
    const requestBody = requestData.serialize(); // TODO pass maxResults here
    const response = await axios.post(apiUrl, requestBody, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error in searchNearbyPlaces: ${error.message}`);
  }
};

export { searchNearbyPlaces };

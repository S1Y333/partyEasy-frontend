import axios from "axios";

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const formatCoordinateString = (coordinateString) => {
  const regex = /\(([^,]+),\s+([^)]+)\)/; // Regular expression to extract latitude and longitude

  // Extract latitude and longitude using regular expression
  const match = regex.exec(coordinateString);
  if (match) {
    const lat = parseFloat(match[1]); // Convert latitude string to float
    const lon = parseFloat(match[2]); // Convert longitude string to float

    // Create an object with latitude and longitude properties
    const coordinates = [lat, lon];

    console.log("Formatted coordinates:", coordinates);

    return coordinates;
  } else {
    console.log("Invalid coordinate string:", coordinateString);
  }
};

export async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY, // 
        },
      }
    );
    console.log(JSON.stringify(response) + "!!!GEORESPNSE!!!!");
    const result = response.data.results[0];
    console.log(result);

    if (result) {
      return result.formatted_address;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error reverse geocoding:", error.message);
    throw error;
  }
}

export const findKey = (obj, key) => {
  if (obj && obj.hasOwnProperty(key)) {
    return true;
  }
  return false;
};

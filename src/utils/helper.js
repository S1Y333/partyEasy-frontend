import axios from "axios";

const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

export const formatCoordinateString = (coordinateString) => {
  const regex = /\(([^,]+),\s+([^)]+)\)/; // Regular expression to extract latitude and longitude

  // Extract latitude and longitude using regular expression
  const match = regex.exec(coordinateString);
  if (match) {
    const lat = parseFloat(match[1]); // Convert latitude string to float
    const lon = parseFloat(match[2]); // Convert longitude string to float

    // Create an object with latitude and longitude properties
    const coordinates = {
      lat,
      lon,
    };

    console.log("Formatted coordinates:", coordinates);

    return coordinates;
  } else {
    console.log("Invalid coordinate string:", coordinateString);
  }
};

async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${lat},${lng}`,
          key: "YOUR_API_KEY", // Replace with your Google Maps API key
        },
      }
    );
    const result = response.data.results[0];
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

async function getCoverPhoto() {
    try {const url = `https://api.unsplash.com/search/collections?page=1&per_page=20&query=party-happy&orientation=landscape&color=purple&order_by=relevant&content_filter=high&client_id=${UNSPLASH_KEY}`;
        const response = await axios.get(url);
        const randomIndex = Math.floor(Math.random() * 19);//
        const result = response.results[randomIndex];
        const photoUrl = result.preview_photos.urls.small;
        return photoUrl;
    } catch (error) {
        console.error("Error get photos from unsplash:", error.message);
        throw error;
    }
}


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
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
  width: "400px",
  height: "400px",
};

const Map = ({ coordinates }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  // console.log(coordinates[0] + " " + coordinates[1]);

  const center = {
    lat: parseFloat(coordinates[0]),
    lng: parseFloat(coordinates[1]),
  };
  // const center = {
  //   lat: 43.6654866,
  //   lng: -79.4703492,
  // };
  console.log(JSON.stringify(center));

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Map;

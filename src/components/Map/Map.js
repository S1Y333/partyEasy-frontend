import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
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
 
  console.log(JSON.stringify(center));

 // const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    //setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    // setMap(null);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={1}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Map;

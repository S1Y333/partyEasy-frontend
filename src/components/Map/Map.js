
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const Map = () => {
    console.log(API_KEY);
      const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
      });
    
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
    {isLoaded? (<GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>) : <></>}
  </div>
);
}


export default Map
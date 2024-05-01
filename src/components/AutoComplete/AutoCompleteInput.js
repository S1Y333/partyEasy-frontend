import React from "react";
import Autocomplete from "react-google-autocomplete";
import "./AutoCompleteInput.scss";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const AutocompleteInput = ({ onPlaceSelected, setCoordinates }) => {
  const handlePlaceSelected = (place) => {
    if (onPlaceSelected) {
      onPlaceSelected(place);
    }
    console.log(place);
    console.log("+++++!!!!1" + place.geometry.location);
    setCoordinates(place.geometry.location);
  };

  return (
    <Autocomplete
      apiKey={API_KEY}
      language="en"
      coordinates="true"
      placeholder="Enter Your preferred location"
      onPlaceSelected={handlePlaceSelected}
      options={{
        fields: ["geometry"],
        componentRestrictions: { country: "ca" },
      }}
      defaultValue="Amsterdam"
      className="auto-input"
    />
  );
};

export default AutocompleteInput;

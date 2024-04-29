import React from "react";
import Autocomplete from "react-google-autocomplete";
import "./AutoCompleteInput.scss"

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const AutocompleteInput= ({ onPlaceSelected }) => {
  const handlePlaceSelected = (place) => {
    if (onPlaceSelected) {
      onPlaceSelected(place);
    }
  };
    console.log(API_KEY)

  return (
    <Autocomplete
      apiKey={API_KEY}
      language="en"
      country="us"
      coordinates={true}
      placeholder="Enter Your preferred location"
          onSelect={handlePlaceSelected}
          className="auto-input"
    />
  );
};

export default AutocompleteInput;

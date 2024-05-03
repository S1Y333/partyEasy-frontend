import React, { useRef, useState, useEffect } from "react";
import defaultImage from "../../assets/images/default-avatar.png";
import { Avatar, Button } from "@mui/material";
import "./ImageUpload.scss";

const ImageUpload = (setFile) => {
 
 
  const [isValid, setIsValid] = useState(false);

  const fileInputRef = useRef();


  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];

      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.getElementById("image-preview");

        imagePreview.src = e.target.result;
      };

      reader.readAsDataURL(pickedFile);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    //   props.onInput(props.id, pickedFile, fileIsValid);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

   
    
  // input is invisible but click on it will open the file picker use useRef, store a reference and access dom click feature
  return (
    <div className="image-upload">
      <Avatar
        // id="image-preview"
        className="video-upload__thumbnail"
        src={defaultImage}
        alt="user profile photo"
        sx={{ width: 60, height: 60, id: "image-preview" }}
        imgProps={{ id: "image-preview" }}
      />
      <input
        type="file"
        name="file"
        accept=".jpg, .png, .jpeg"
        ref={fileInputRef}
        onChange={pickedHandler}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        style={{ color: "black", backgroundColor: "white", fontSize: "0.7rem" }}
        onClick={openFileDialog}
      >
        Change avatar
      </Button>
      {/* {!isValid && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default ImageUpload;

import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
   Avatar,
  Snackbar,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { createNewUser } from "../../utils/auth-functions";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./SignUpComplete.scss";
import defaultImage from "../../assets/images/default-avatar.png";
import { loginSuccess } from "../../actions/userActions";


const SignUpComplete = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const [file, setFile] = useState();

  let dispatch = useDispatch();

  let navigate = useNavigate();

    const [isValid, setIsValid] = useState(false);

  const fileInputRef = useRef();
  
    useEffect(() => {
      setEmail(localStorage.getItem("emailForSignUp"));
    });

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email + "email " + password);

    //check if email/password is provided
    if (!email || !password || !username) {
      toast.error("Email, username and password is required");
      return;
    }

    //checck if password is longer than 6
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("avatar", file);

    // update password in firebase and request to backend to create a new user
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      console.log("RESULT!!!!" + result);

      if (result.user.emailVerified) {
        //remove user from local storage
        localStorage.removeItem("emailForSignUp");
        //get user id token
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await getIdTokenResult(user);

        //profile photo upload to cloudinary, then return a link which will be 
        //written in databaseim
       

        // redux store
        //  console.log("user", user, "idTokenResult", idTokenResult);
        console.log(username + " " + file);
        console.log(JSON.stringify(formData) + "!!!!");
        try {
          const res = await createNewUser(idTokenResult.token, formData);
           dispatch(
             loginSuccess(
               {
                 email: user.email,
                 token: idTokenResult.token,
               },
               idTokenResult.token
             )
           );
          navigate("/userprofile");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //upload and resize photo to cloudinary then return a link
  //  const fileUploadAndResize = (e) => {
  //    //console.log(e.target.files);
  //    //resize
  //    let files = e.target.files;
  //    let allUploadedFiles = values.images;

  //    if (files) {
  //      setLoading(true);
  //      for (let i = 0; i < files.length; i++) {
  //        Resizer.imageFileResizer(
  //          files[i],
  //          720,
  //          720,
  //          "JPEG",
  //          100,
  //          0,
  //          (uri) => {
  //            // console.log(uri);
  //            axios
  //              .post(
  //                `${process.env.REACT_APP_API}/uploadimages`,
  //                { image: uri },
  //                {
  //                  headers: {
  //                    authtoken: user ? user.token : "",
  //                  },
  //                }
  //              )
  //              .then((res) => {
  //                console.log("IMAGE UPLOAD RES DATA", res);
  //                setLoading(false);
  //                //push all the image url to the array
  //                allUploadedFiles.push(res.data);
  //                // push allUploadedFiles to the image array in the product object
  //                setValues({ ...values, image: allUploadedFiles });
  //              })
  //              .catch((err) => {
  //                setLoading(false);
  //                console.log("CLOUDINARY UPLOAD ERR", err);
  //              });
  //          },
  //          "base64"
  //        );
  //      }
  //    }
  //    //send back to server to upload to cloudinary
  //    //set url to images[] in the parent component - product create
  //  };
  
  return (
    <div className="cover-form ">
      <HeaderLogo />
      <div className="signupform">
        <Typography variant="h5">Register Complete</Typography>
        <Box
          component="form"
          noValidate
          className="signupform__box"
          onSubmit={handleSubmit}
        >
          {/* image upload */}
          <div className="image-upload">
            <Avatar
              // id="image-preview"
              className="video-upload__thumbnail"
              src={defaultImage}
              alt="user profile photo"
              sx={{ width: 60, height: 60, id: "image-preview" }}
              slotProps={{
                img: {
                  id: "image-preview",
                },
              }}
            />
            <input
              type="file"
              name="avatar"
              accept=".jpg, .png, .jpeg"
              ref={fileInputRef}
              onChange={pickedHandler}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "white",
                fontSize: "0.7rem",
              }}
              onClick={openFileDialog}
            >
              Change avatar
            </Button>
            {/* {!isValid && <p>{props.errorText}</p>} */}
          </div>

          <TextField
            name="username"
            className="signupform__text"
            id="standard-basic-username"
            value={username}
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            name="email"
            className="signupform__text"
            id="standard-basic-email"
            value={email}
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            name="password"
            className="form__text"
            id="standard-basic"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            //   error={validationRes.errs?.email}
            //   helperText={validationRes.errs?.email}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Visibility sx={{ fontSize: "20px", color: "#ffffff" }} />
                  ) : (
                    <VisibilityOff
                      sx={{ fontSize: "20px", color: "#ffffff" }}
                    />
                  )}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            variant="outlined"
            sx={{ marginTop: "2rem", color: "white", borderColor: "white" }}
            //    disabled={!validationRes.isValid || isCheckingBackEnd}
          >
            {/* {isCheckingBackEnd ? <CircularWaiting size={20} /> : "Log in"} */}
            Complete Sign Up
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default SignUpComplete;

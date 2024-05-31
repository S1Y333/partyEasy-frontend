
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";

import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../SignUpComplete/SignUpComplete.scss";

const REDIRECT_URL = process.env.REACT_APP_REGISTER_REDIRECT_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send user an email to confirm emaill address
    const config = {
      url: REDIRECT_URL,
      handleCodeInApp: true,
    };
    console.log(REDIRECT_URL);
    await sendSignInLinkToEmail(auth, email, config);
    // .then(() => {
    //   //save user email in local storage
    //   localStorage.setItem("emailForSignUp", email);
    //   toast.success(
    //     `Email is sent to ${email}. Click the link to complete your registration.`
    //   );
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ...
    // });

    
    //save user email in local storage
    window.localStorage.setItem("emailForSignUp", email);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`);
  };

  return (
    <div className="cover-form">
      <HeaderLogo />
      <div className="signupform">
        <Typography variant="h5" sx={{ marginTop: "2rem"}}>Sign Up</Typography>
        <Box
          component="form"
          noValidate
          className="signupform__box"
          // onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            className="signupform__text"
            id="standard-basic"
            value={email}
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your Email"
          />

          
            <Button
              type="submit"
              variant="outlined"
              sx={{ marginTop:"2rem", color: "white", borderColor:"white"}}
              //    disabled={!validationRes.isValid || isCheckingBackEnd}
              onClick={handleSubmit}
            >
              {/* {isCheckingBackEnd ? <CircularWaiting size={20} /> : "Log in"} */}
              Sign Up
            </Button>
          
        </Box>
      </div>
    </div>
  );
};

export default SignUp;

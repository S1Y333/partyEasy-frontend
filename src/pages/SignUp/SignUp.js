import SignUpForm from "../../components/SignupForm/SignupForm";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Snackbar,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send user an email to confirm emaill address
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

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
      <div className="">
        <Box
          component="form"
          noValidate
          className="form__box"
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

          <Box
            sx={{
              width: { xs: "398px", md: "434px" },
              height: "70px",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: "24px",
                mb: 2,
                height: "41px",
                background: "#ffffff",
                // fontFamily: "'Inter', sans-serif",

                color: "#ffffff",
                opacity: "30%",

                textTransform: "none",
                //   backgroundColor: validationRes.isValid ? "#6750A4" : "#6B7280",
                //   ":hover": {
                //     bgcolor: "#6750A4",
                //   },
                "& .MuiButton-label": {
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "150%",
                },
              }}
              //    disabled={!validationRes.isValid || isCheckingBackEnd}
              onClick={handleSubmit}
            >
              {/* {isCheckingBackEnd ? <CircularWaiting size={20} /> : "Log in"} */}
              Sign Up
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SignUp;

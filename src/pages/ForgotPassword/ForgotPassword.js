import SignUpForm from "../../components/SignupForm/SignupForm";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { sendPasswordResetEmail } from "firebase/auth";
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
import "../SignUpComplete/SignUpComplete.scss";
import "./ForgotPassword.scss"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send user an email to confirm emaill address
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, config)
    .then(() => {
      // Password reset email sent!
       toast.success(
         `Email is sent to ${email}. Click the link to reset your password.`
       );
    })
    .catch((error) => {
      toast.error(error.message);
      console.log("ERROR MSG IN FORGOT PASSWORD", error);
    });

   
  };

  return (
    <div className="cover-form">
      <HeaderLogo />
      <div className="signupform">
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          Enter your email to reset your password
        </Typography>
        <Box
          component="form"
          noValidate
          className="signupform__box forgot-password"
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
            sx={{ marginTop: "2rem", color: "white", borderColor: "white" }}
            //    disabled={!validationRes.isValid || isCheckingBackEnd}
            onClick={handleSubmit}
          >
            {/* {isCheckingBackEnd ? <CircularWaiting size={20} /> : "Log in"} */}
            Reset your password
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ForgotPassword;

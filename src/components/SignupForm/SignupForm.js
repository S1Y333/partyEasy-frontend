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

import { Visibility, VisibilityOff } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';
import "./SignupForm.scss"


const SignupForm = ({ createAccount}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAccount(formData.username, formData.email);
  }

  

  return (
    <>
      <Box className="signupform-title">
        <Typography
          sx={{
            height: "30px",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          Sign Up
        </Typography>
      </Box>

      <Box className="signupform">
        <Box
          component="form"
          noValidate
          className="form__box"
          onSubmit={handleSubmit}
        >
          <Box>
           
            <TextField
              name="username"
              className="form__text"
              id="standard-basic"
              value={formData.username}
              label="User Name"
              variant="standard"
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              name="email"
              className="signupform__text"
              id="standard-basic"
              value={formData.email}
              label="Email"
              variant="standard"
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* <TextField
              name="password"
              className="form__text"
              id="standard-basic"
              label="Password"
              variant="standard"
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
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
            /> */}
          </Box>
          {/* <Box>
            <TextField
              name="password"
              className="form__text"
              id="standard-basic"
              label="Password"
              variant="standard"
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
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
          </Box> */}

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
            >
              {/* {isCheckingBackEnd ? <CircularWaiting size={20} /> : "Log in"} */}
              Sign Up
            </Button>
          </Box>

          <Box className="form__bottom">
            <p className="form__bottom-copy">Have an account?</p>
            <Link to="/login" className="link">
              <p className="form__bottom-signup">Log In</p>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignupForm;

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
import "./LoginForm.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
    
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  return (
    <Box className="form">
      <Box component="form" noValidate className="form__box">
        <Box>
          <TextField
            name="email"
            className="form__text"
            id="standard-basic"
            value={formData.email}
            label="Email"
            variant="standard"
            onChange={handleInputChange}
            required
            fullWidth
          />
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
        </Box>

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

              borderColor: "#ffffff",
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
            Log In
          </Button>
        </Box>
        <Box className="form__reme">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#ffffff",
                  "&.Mui-checked": {
                    color: "#ffffff",
                  },
                  height: "20px",
                }}
                checked={rememberMe}
                onChange={handleRememberMe}
              />
            }
            label="Remember me"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
              },
            }}
          />
          <p className="form__forPassword">Forgot Password?</p>
        </Box>
        <Box className="form__bottom">
          <p className="form__bottom-copy">Don't have an account?</p>
          <Link to="/signup" className="link">
            <p className="form__bottom-signup">Sign Up</p>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;

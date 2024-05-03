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
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword,getIdTokenResult, } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "../../utils/auth-functions";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   let dispatch = useDispatch();

   let navigate = useNavigate();

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password)
     
      // Signed in
      const user = result.user;
      const idTokenResult = await getIdTokenResult(user); //get user token
      try {
        const res = await currentUser(idTokenResult.token);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            id: res.data.id,
          },
        });
        navigate("/userprofile");
        
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      };
    } catch (error) {
      console.log(error)
    }
  }
    

      return (
        <Box className="form">
          <Box component="form" noValidate className="form__box">
            <Box>
              <TextField
                name="email"
                className="form__text"
                id="standard-email"
                value={formData.email}
                label="Email"
                variant="standard"
                onChange={handleInputChange}
                required
                fullWidth
                style={{ color: "#ffffff" }}
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

            <Box style={{ marginTop: "2rem" }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                id="standard-basic__button"
                onClick={handleSubmit}
              >
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
    }

export default LoginForm;
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
import {
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { createUser } from "../../utils/auth-functions";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";

const SignUpComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForSignUp"));
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
    console.log(email + "email " + password);
    
    //check if email/password is provided
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    
    //checck if password is longer than 6
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

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

        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        try {
          const res = await createUser(idTokenResult.token);
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
          console.log(error);
        }
    }
      } catch (error) {
          console.log(error);
    }
  };

  return (
    <div className="cover-form">
      <HeaderLogo />
      <div className="">
        Register Complete
        <Box
          component="form"
          noValidate
          className="form__box"
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            className="signupform__text"
            id="standard-basic"
            value={email}
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
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
        </Box>
      </div>
    </div>
  );
};

export default SignUpComplete;

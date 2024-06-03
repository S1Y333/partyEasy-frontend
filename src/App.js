import NotFoundPage from "./pages/Error/Error";
import { Routes, Route, HashRouter } from "react-router-dom";

import CoverPage from "./pages/CoverPage/CoverPage";
import Questionaire from "./pages/Questionaire/Questionaire";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignUpComplete from "./pages/SignUpComplete/SignUpComplete";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { currentUser } from "./utils/auth-functions";

import UserRoute from "./components/Routes/UserRoute";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "./actions/userActions";

import React from "react";
import PackageListPage from "./pages/PackageListPage/PackageListPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
//

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("idTokenResult", idTokenResult);

        const res = await currentUser(idTokenResult.token);
            if (res.data)
           { dispatch(
              loginSuccess(
                {
                  name: res.data.username,
                  avatar: res.data.profilephotolink,

                  likes: res.data.likesPackages,
                  saves: res.data.savesPackages,

                  token: idTokenResult.token,
                },
                idTokenResult.token
              )
            );}
        
      }
    });
    //clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (

    <HashRouter>

      <ToastContainer />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/formPage" element={<Questionaire />} />
        <Route path="/packageDetail/:packageId" element={<PackageDetail />} />
        <Route path="/packageList" element={<PackageListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route element={<UserRoute />}>
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </HashRouter>

  );
}

export default App;

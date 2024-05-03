import NotFoundPage from "./pages/Error/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverPage from "./pages/CoverPage/CoverPage";
import Questionaire from "./pages/Questionaire/Questionaire";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import SavedPackageList from "./pages/SavedPackageList/SavedPackageList";
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
import Header from "./pages/Header/Header";

import "react-toastify/dist/ReactToastify.css";

import React from "react";
import PackageListPage from "./pages/PackageListPage/PackageListPage";
//

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("idTokenResult", idTokenResult);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                id: res.data.id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="formPage" element={<Questionaire />} />
        <Route path="packageDetail/:packageId" element={<PackageDetail />} />
        {/* <Route path="user/packageList/:userId" element={<SavedPackageList />} /> */}
        <Route path="packageList" element={<PackageListPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

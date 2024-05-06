import PackageCard from "../../components/PackageCard/PackageCard";
import Header from "../Header/Header";
import "./UserProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import PackageList from "../../components/PackageList/PackageList";
import { getUserPackages } from "../../utils/package-functions";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [userPackages, setUserPackages] = useState([]);



  let navigate = useNavigate();
  let dispatch = useDispatch();
  

 
  useEffect(() => {
        loadUserPackages();
      },[user])    
  
   

  

  const loadUserPackages = async () => {
  try {  const result = await getUserPackages(user.token);
   
    setUserPackages(result.userPackagelist);
  } catch (error) {
    console.log("Error loading user packages:", error);
  }
  }
  // if (user.username)
  // { username = user.username; }
  //if(user.profile
  const avatarLink =
    "https://res.cloudinary.com/dtq1qzwxn/image/upload/v1714399544/3_jgj0il.jpg";

  const logout = () => {
    signOut(auth).then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    });
    navigate("/login");
  };
 console.log(userPackages);
  return (
    <div className="cover-form userprofile">
      <Header name={username} avatarLink={avatarLink} />
      <div className="user-packagelist">
        <PackageList packageList={userPackages}/>
      </div>
      <div className="logout">
        <LogoutIcon onClick={logout} />
        Log out
      </div>
    </div>
  );
};

export default UserProfile;

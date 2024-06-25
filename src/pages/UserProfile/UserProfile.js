
import Header from "../../components/Header/Header";
import "./UserProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import PackageList from "../../components/PackageList/PackageList";
import { getUserPackages } from "../../utils/package-functions";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";



const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  // const [username, setUsername] = useState("");
  // const [avatarlink, setAvatarlink] = useState("uploads/3.jpg");
  const [userPackages, setUserPackages] = useState([]);


  let navigate = useNavigate();
  let dispatch = useDispatch();
  
const loadUserPackages = useCallback(async () => {
  try {
    const result = await getUserPackages(user.token);

    setUserPackages(result.userPackagelist);
  } catch (error) {
    console.log("Error loading user packages:", error);
  }
}, [user.token]);
 
  useEffect(() => {
       
      loadUserPackages();
    }, [loadUserPackages]);  
  
  // if (user.username)
  // { username = user.username; }
  //if(user.profile
  // const avatarLink =
  //   "https://res.cloudinary.com/dtq1qzwxn/image/upload/v1714399544/3_jgj0il.jpg";

  const logout = () => {
    signOut(auth).then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    });
    navigate("/login");
  };
  return (
    <>
      {userPackages ? (
        <div className="cover-form userprofile">
          
          {user && (
            <Header
              name={user.name}
              avatarLink={`${process.env.REACT_APP_ASSETS_URL}${user.avatar}`}
            />
          )}
          {userPackages.length === 0 ? (
            <div className="userprofile-guide">
              <Link to="/" className="link">
                <p className="userprofile-copy">
                  Create your first party package{" "}
                </p>
              </Link>
            </div>
          ) : (
            <div className="user-packagelist">
              <PackageList packageList={userPackages} />
            </div>
          )}
          <div className="logout">
            <LogoutIcon onClick={logout} />
            Log out
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserProfile;

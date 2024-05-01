import PackageCard from "../../components/PackageCard/PackageCard";
import Header from "../Header/Header";
import "./UserProfile.scss"
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut} from 'firebase/auth'

const UserProfile = () => {
  
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate(); 
  let dispatch = useDispatch();

  let username = " ";
  // if (user.username)
  // { username = user.username; } 
  //if(user.profile
  const avatarLink = "https://res.cloudinary.com/dtq1qzwxn/image/upload/v1714399544/3_jgj0il.jpg";
  
  const logout = () => {
    signOut(auth).then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    })
     navigate("/login");
   
  }

  return (
    <div>
      <Header name={username} avatarLink={avatarLink} />
      <div className="user-packagelist">
        <PackageCard />
        <br />
        <PackageCard />
      </div>
      <div className="logout">
        <LogoutIcon onClick={logout} />
        Log out
      </div>
    </div>
  );
};

export default UserProfile;

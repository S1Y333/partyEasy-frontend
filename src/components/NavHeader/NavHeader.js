import { Link } from "react-router-dom";
import logo from "../../assets/icons/party-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavHeader.scss"
  import { useSelector } from "react-redux";


const NavHeader = () => {
    const { user } = useSelector((state) => state.user);

  return (
    <div className="header__logo">
      <Link to="/">
        <img className="logo__img" src={logo} alt="logo"/>
      </Link>
      <Link to={user && user.token ? "/userprofile" : "/login"} className="link">
        <nav className="header__nav">
          <MenuIcon style={{ marginRight: 0 }} />
        </nav>
      </Link>
    </div>
  );
};

export default NavHeader;

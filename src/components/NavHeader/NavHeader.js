import { Link } from "react-router-dom";
import logo from "../../assets/icons/party-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavHeader.scss"

const NavHeader = () => {
  return (
    <div className="header__logo">
      <img className="logo__img" src={logo} />
      <Link to="/userprofile" className="link">
        <nav className="header__nav">
          <MenuIcon style={{ marginRight: 0 }} />
        </nav>
      </Link>
    </div>
  );
};

export default NavHeader;

import logo from "../../assets/icons/party-logo.png";
import "./HeaderLogo.scss"
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return <div className="logo">
      <Link to="/packageList">
      <img className="logo__img" src={logo} />
      </Link>
  </div>;
};

export default HeaderLogo;

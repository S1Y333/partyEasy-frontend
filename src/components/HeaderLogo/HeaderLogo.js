import logo from "../../assets/icons/party-logo.png";
import "./HeaderLogo.scss"

const HeaderLogo = () => {
    return <div className="logo">
      <img className="logo__img" src={logo} />
  </div>;
};

export default HeaderLogo;

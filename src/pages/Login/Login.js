import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
      const { user } = useSelector((state) => state.user);
  let navigate = useNavigate();

  if (user && user.token)
  { navigate("/userprofile")}
  
      return (
        <div className=" cover-form">
          <HeaderLogo />
          <div className="login__form">
            <LoginForm />
          </div>
        </div>
      );
};

export default Login;

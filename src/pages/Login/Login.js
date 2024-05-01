import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { auth } from "../../firebase";

const Login = () => {


  const loginEmailPwd = async (email, password) => {
  //  const userCredential = 
 }

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

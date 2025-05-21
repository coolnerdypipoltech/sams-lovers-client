import "../styles/Login.css";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import eye from "../assets/Visibility.svg";
import { useState, useContext, useRef } from "react";
import CreatePage from "../subPages/CreatePage";
import PasswordPage from "../subPages/PasswordPage";
import SocialMediaPage from "../subPages/SocialMediaPage"
import { ElementContextRoute } from "../context/RouteContext";
import { LogIn } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
function Login() {
  const { setLoginToken, changeRoute } = useContext(ElementContextRoute);
  const { SetUserData } = useContext(ElementContextData);
  const [subPage, setSubPage] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const LoginText = useRef("");
  const LoginPassword = useRef("");
  let subPageContent = null;

  const onClickPassword = async () => {
    setSubPage("Password");
  };

  const onClickCreate = async () => {
    setSubPage("Create");
  };

  const onClickSocialMedia = async () => {
    setSubPage("Social Media");
  };

  const onClickReturn = async () => {
    setSubPage("");
  };

  const onClickLogin = async () => {
    if (inputValidation()) {
      const response = await LogIn(
        LoginText.current.value,
        LoginPassword.current.value
      );
      const data = await response.json();
      if (response.ok) {
        SetUserData(data);
        setLoginToken(data.access_token);
        changeRoute("Main")
      }
    }
  };

  const inputValidation = () => {
    const response1 = ValidateEmail();
    const response2 = ValidatePassword();

    if (response1 === true && response2 === true) {
      return true;
    } else {
      return false;
    }
  };

  const ValidatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (passwordRegex.test(LoginPassword.current.value)) {
      if (errorPassword === true) {
        setErrorPassword(false);
      }
      return true;
    } else {
      setErrorPassword(true);
      return false;
    }
  };

  const ValidateEmail = () => {
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (strictEmailRegex.test(LoginText.current.value)) {
      if (errorEmail === true) {
        setErrorEmail(false);
      }
      return true;
    } else {
      setErrorEmail(true);
      return false;
    }
  };

  if (subPage === "Password") {
    subPageContent = <PasswordPage onReturn={onClickReturn}></PasswordPage>;
  }
  if (subPage === "Create") {
    subPageContent = <CreatePage onReturn={onClickReturn} onNext={onClickSocialMedia}></CreatePage>;
  }
  if(subPage === "Social Media") {
    subPageContent = <SocialMediaPage></SocialMediaPage>
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="LoginContainer">
        <div className="loginHeaderContainer">
          <p className="loginHeaderText">Volver</p>
          <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
        </div>

        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
          
        </div>

        <div className="LoginMenuContainer">
          <p className="loginTitle">Log in</p>
          <div className="loginContainer">
            <p className="loginSubtitle">Email</p>
            <div className="passwordInput">
            
            <input
              placeholder="Correo"
              ref={LoginText}
              className="GeneralInput"
              type="email"
            ></input>
            </div>
            {errorEmail === true ? (
              <span>Porfavor verique su correo electronico</span>
            ) : (
              <></>
            )}
          </div>

          <div className="passwordContainer">
            <p className="loginSubtitle">Contraseña</p>
            <div className="passwordInput">
              <input
                placeholder="Contraseña"
                ref={LoginPassword}
                className="GeneralInput"
                type="password"
              ></input>

              <img className="eyePassword" src={eye}></img>
            </div>

            {errorPassword === true ? (
              <span>Porfavor verique su contraseña</span>
            ) : (
              <></>
            )}
            <p onClick={onClickPassword} className="PasswordTextLogin">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <div className="LoginMenuBottomContainer">
            <button className="GeneralButton" onClick={onClickLogin}>
              Iniciar sesión
            </button>
            <div>
              <p className="loginBottomText">
                ¿Todavía no tienes una cuenta?{" "}
                <span onClick={onClickCreate} className="underlineText">
                  Créala aquí
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

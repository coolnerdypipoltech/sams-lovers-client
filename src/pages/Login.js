import "../styles/Login.css";
import logo from "../assets/samsLogo.webp";
import { useState, useContext, useRef } from "react";
import CreatePage from "../subPages/CreatePage";
import PasswordPage from "../subPages/PasswordPage";
import { ElementContextRoute } from "../context/RouteContext";
import { LogIn } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
function Login() {
  const { setLoginToken } = useContext(ElementContextRoute);
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
    subPageContent = <CreatePage onReturn={onClickReturn}></CreatePage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>

        <div className="LoginMenuContainer">
          <input
            placeholder="Correo"
            ref={LoginText}
            className="inputLoginMenu"
          ></input>
          {errorEmail === true ? (
            <span>Porfavor verique su correo electronico</span>
          ) : (
            <></>
          )}
          <div className="passwordContainer">
            <input
              placeholder="Contraseña"
              ref={LoginPassword}
              className="inputLoginMenu"
            ></input>
            {errorPassword === true ? (
              <span>Porfavor verique su contraseña</span>
            ) : (
              <></>
            )}
            <p onClick={onClickPassword} className="PasswordTextLogin">
              Olvidé mi contraseña
            </p>
          </div>
          <div className="LoginMenuBottomContainer">
            <p onClick={onClickLogin}>Acceder</p>
            <p onClick={onClickCreate}>¿NO TIENES CUENTA? CREA UNA</p>
            <p>
              Al hacer click en continuar usted acepta los,
              <a style={{ paddingLeft: "5px" }} href="https://www.google.com">
                términos y condiciones
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

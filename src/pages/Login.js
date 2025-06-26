import "../styles/Login.css";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import eye from "../assets/Visibility.svg";
import eyeclosed from "../assets/Visibility2.svg";
import { useState, useContext, useRef } from "react";
import CreatePage from "../subPages/CreatePage";
import PasswordPage from "../subPages/PasswordPage";
import SocialMediaPage from "../subPages/SocialMediaPage";
import { ElementContextRoute } from "../context/RouteContext";
import { LogIn } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
import { ElementContextPopUp } from "../context/PopUpContext";
import BackgroundSams from "../components/BackgroundSams";

function Login() {
  const { setLoginToken, changeRoute, registerFlow } = useContext(ElementContextRoute);
  const { changePopUpLoading } = useContext(ElementContextPopUp);
  const { SetUserData } = useContext(ElementContextData);
  const [subPage, setSubPage] = useState("Social Media");
  const [forceRender, setForceRender] = useState(0);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const [loginMessage, setLoginMessage] = useState(false);
  const [eyeHelper1, setEyeHelper1] = useState(false);
  const [typeHelper, setTypeHelper] = useState("password");
  const LoginText = useRef("");
  const LoginPassword = useRef("");
  let subPageContent = null;

  const onClickPassword = () => {
    setSubPage("Password");
  };

  const onClickCreate = () => {
    setSubPage("Create");
  };

  const onClickSocialMedia = () => {
    setSubPage("Social Media");
  };

  const onClickReturn = () => {
    if(subPage === ""){
      setForceRender(forceRender + 1)
    }
    setSubPage("");
  };

  const onClickReturnLandingPage = () => {
   changeRoute("Landing")
  };

  const onClickShowLoginMessage = () => {
    LoginText.current.value = "";
    LoginPassword.current.value = "";
    setErrorPassword(false);
    setErrorEmail(false);
    setLoginMessage(true);
  };

  const onClickLogin = async () => {
    if (inputValidation()) {
      changePopUpLoading(true)
      const response = await LogIn(
        LoginText.current.value,
        LoginPassword.current.value
      );
      const data = await response.json();
      if (response.ok) {
        SetUserData(data);
        setLoginToken(data.access_token);
        changeRoute("Main");
      } else {
        if(data.message){
          if(data.message === "api.error.email_not_verified"){
            setErrorEmail("falta verificar");
          }else{
            setErrorPassword("usuario o contraseña incorrectos");
            setErrorEmail("usuario o contraseña incorrectos");
          }
        }

      }
      changePopUpLoading(false)
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
    if (LoginPassword.current.value.length === 0) {
      setErrorPassword(
        "Por favor revisar que la información esté completa, todos los campos son obligatorios"
      );
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (passwordRegex.test(LoginPassword.current.value)) {
      if (errorPassword) {
        setErrorPassword(null);
      }
      return true;
    } else {
      setErrorPassword("verifica tu contraseña");
      return false;
    }
  };

  const ValidateEmail = () => {
    if (LoginText.current.value.length === 0) {
      setErrorEmail(
        "Por favor revisar que la información esté completa, todos los campos son obligatorios"
      );
      return false;
    }
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (strictEmailRegex.test(LoginText.current.value)) {
      if (errorEmail) {
        setErrorEmail(null);
      }
      return true;
    } else {
      setErrorEmail(
        "El correo debe tener un formato válido. Ej: Anita@gmail.com"
      );
      return false;
    }
  };
  console.log(subPage, registerFlow.current)
  if (subPage === "Password") {
    subPageContent = <PasswordPage onReturn={onClickReturn}></PasswordPage>;
  }
  if (subPage === "Create" || registerFlow.current) {
    registerFlow.current = false;
    subPageContent = (
      <CreatePage
        onReturn={onClickReturn}
        onNext={onClickSocialMedia}
      ></CreatePage>
    );
  }
  if (subPage === "Social Media") {
    subPageContent = (
      <SocialMediaPage
        onReturn={onClickReturn}
        onShowMessage={onClickShowLoginMessage}
      ></SocialMediaPage>
    );
  }

  return (
    <>
      <>{subPageContent}</>
      <div key={forceRender}  className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div className="loginHeaderContainer">
          <p onClick={onClickReturnLandingPage} className="loginHeaderText">Volver</p>
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
            {errorEmail !== null ? (
              <span className="errorText">{errorEmail} </span>
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
                type={typeHelper}
              ></input>

              <div onClick={() => {
                  if(eyeHelper1){
                    setTypeHelper("password")
                    setEyeHelper1(false);
                  }else{
                    setTypeHelper("text")
                    setEyeHelper1(true);
                  }
                    }}>
                {eyeHelper1 === true ? (
                  <img
                    alt="eye"
                    className="eyePassword"
                    src={eyeclosed}
                  ></img>
                ) : (
                  <img
                    onClick={() => {
                      setEyeHelper1(true);
                    }}
                    alt="eye"
                    className="eyePassword"
                    src={eye}
                  ></img>
                )}
              </div>
            </div>

            {errorPassword !== null ? (
              <span className="errorText">{errorPassword} </span>
            ) : (
              <></>
            )}
            <p onClick={onClickPassword} className="PasswordTextLogin">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <div className="LoginMenuBottomContainer">
            <div style={{ display: "flex", gap: "10px", flexFlow: "column" }}>
              <button className="GeneralButton" onClick={onClickLogin}>
                Iniciar sesión
              </button>
              {loginMessage !== false ? (
                <span className="errorText">
                  Por favor, confirma tu cuenta. Te enviamos un correo de
                  verificación en tu Email registrado.{" "}
                </span>
              ) : (
                <></>
              )}
            </div>

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

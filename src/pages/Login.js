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
import { SignIn } from "../hooks/apicalls";

function Login() {
  console.log("1.1");
  const {
    setLoginToken,
    changeRoute,
    registerFlow,
    persistLogin,
    hasSavedData,
    deleteSavedItems,
  } = useContext(ElementContextRoute);
  const { changePopUpLoading } = useContext(ElementContextPopUp);
  const { SetUserData } = useContext(ElementContextData);
  const [subPage, setSubPage] = useState("");
  const [forceRender, setForceRender] = useState(0);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false);
  const [eyeHelper1, setEyeHelper1] = useState(false);
  const [typeHelper, setTypeHelper] = useState("password");

  //CreatePage variables
  const [inputCreateUserName, setInputCreateUserName] = useState("");
  const [inputCreateUserEmail, setInputCreateUserEmail] = useState("");
  const [inputCreateUserPassword, setInputCreateUserPassword] = useState("");
  const [inputCreateUserRepeatPassword, setInputCreateUserRepeatPassword] =
    useState("");
  const [
    inputCreateUserTermsAndConditions,
    setInputCreateUserTermsAndConditions,
  ] = useState(false);

  //SocialMediaPage variables
  const [inputCreateUserFacebook, setInputCreateUserFacebook] = useState("");
  const [inputCreateUserInstagram, setInputCreateUserInstagram] = useState("");
  const [inputCreateUserTiktok, setInputCreateUserTiktok] = useState("");
  const [inputCreateUserX, setInputCreateUserX] = useState("");
  const [inputCreateUserYoutube, setInputCreateUserYoutube] = useState("");

  //PopupResponse variables
  const [popUpResponse, setPopUpResponse] = useState("");

  const LoginText = useRef("");
  const LoginPassword = useRef("");
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  let loadingPersistanceLogIn = useRef(false);

  let subPageContent = <></>;
  let popUpContent = <></>;

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
    if (subPage === "Social Media") {
      setSubPage("Create");
      return;
    }

    if (subPage === "") {
      setForceRender(forceRender + 1);
    }

    setSubPage("");
  };

  const handleAfterSignIn = () => {
    changePopUpLoading(false);
    setSubPage("");
    onClickShowLoginMessage();
  };

  const onClickReturnLandingPage = () => {
    changeRoute("Landing");
  };

  const handlePopUpClose = () => {
    setPopUpResponse(null);
  };

  const openAlreadyExistingAccountErrorPopUp = () => {
    errorPopUpTitle.current = "Correo previamente registrado.";
    errorPopUpContent.current =
      "Este correo ya está registrado, por favor intenta con otro correo en la sección correspondiente o si prefieres, inicia sesión.";
    setPopUpResponse("Error");
  };

  const openGeneralErrorPopUp = () => {
    errorPopUpTitle.current =
      "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    errorPopUpContent.current = "Vuelve a intentar más tarde.";
    setPopUpResponse("Error");
  };

  const openTokenExpiredErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, ha ocurrido un error.";
    errorPopUpContent.current =
      "Tú sesión anterior ha expirado. Vuelve a inicar sesión con correo y contraseña.";
    setPopUpResponse("Error");
  };

  const handleSignIn = async (pressedOmit) => {
    let inputCreateUser_F =
      inputCreateUserFacebook === "" ? null : inputCreateUserFacebook;
    let inputCreateUser_I =
      inputCreateUserInstagram === "" ? null : inputCreateUserInstagram;
    let inputCreateUser_T =
      inputCreateUserTiktok === "" ? null : inputCreateUserTiktok;
    let inputCreateUser_X = inputCreateUserX === "" ? null : inputCreateUserX;
    let inputCreateUser_Y =
      inputCreateUserYoutube === "" ? null : inputCreateUserYoutube;

    if (pressedOmit) {
      inputCreateUser_F = null;
      inputCreateUser_I = null;
      inputCreateUser_T = null;
      inputCreateUser_X = null;
      inputCreateUser_Y = null;
    }

    changePopUpLoading(true);

    const response = await SignIn(
      inputCreateUserName,
      inputCreateUserEmail,
      inputCreateUserPassword,
      inputCreateUser_F,
      inputCreateUser_I,
      inputCreateUser_T,
      inputCreateUser_X,
      inputCreateUser_Y
    );
    if (response.ok) {
      handleAfterSignIn();
    } else {
      generalHandleAfterError();
      const data = await response.json();
      if (data.message) {
        switch (data.message) {
          case "api.error.already_exists":
            openAlreadyExistingAccountErrorPopUp();
            break;
          default:
            setSubPage(null);
            handleClearInputCreateUser();
            handleClearInputCreateUserSocialMedia();
            openGeneralErrorPopUp();
            break;
        }
      }
    }
  };

  const handleClearInputCreateUser = () => {
    setInputCreateUserName("");
    setInputCreateUserEmail("");
    setInputCreateUserPassword("");
    setInputCreateUserRepeatPassword("");
    setInputCreateUserTermsAndConditions(false);
  };

  const handleClearInputCreateUserSocialMedia = () => {
    setInputCreateUserFacebook("");
    setInputCreateUserInstagram("");
    setInputCreateUserTiktok("");
    setInputCreateUserX("");
    setInputCreateUserYoutube("");
  };

  const generalHandleAfterError = () => {
    LoginText.current.value = "";
    LoginPassword.current.value = "";
    changePopUpLoading(false);
    setLoginMessage(false);
  };

  const onClickShowLoginMessage = () => {
    LoginText.current.value = "";
    LoginPassword.current.value = "";
    setErrorPassword(false);
    setErrorEmail(false);
    setLoginMessage(true);
  };

  const onClickLogin = async () => {
    if (inputLogInValidation()) {
      changePopUpLoading(true);
      const response = await LogIn(
        LoginText.current.value,
        LoginPassword.current.value
      );
      const data = await response.json();
      if (response.ok) {
        SetUserData(data);
        await setLoginToken(data.access_token);
        changeRoute("Main");
      } else {
        if (data.message) {
          if (data.message === "api.error.email_not_verified") {
            setErrorEmail("falta verificar");
          } else {
            setErrorPassword("usuario o contraseña incorrectos");
            setErrorEmail("usuario o contraseña incorrectos");
          }
        }
      }
      changePopUpLoading(false);
    }
  };

  const inputLogInValidation = () => {
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

  const TryPersistLogIn = async () => {
    if (loadingPersistanceLogIn.current) return;

    loadingPersistanceLogIn.current = true;

    const result = await hasSavedData();

    if (!result) {
      loadingPersistanceLogIn.current = false;
      return;
    }

    changePopUpLoading(true);

    const response = await persistLogin();

    try {
      const data = await response.json();
      if (response.ok) {
        SetUserData(data);
        loadingPersistanceLogIn.current = false;
        changeRoute("Main");
      } else {
        if (data.message) {
          await deleteSavedItems();
          setSubPage(null);
          switch (data.message) {
            case "api.error.unauthorized":
              openTokenExpiredErrorPopUp();
              break;
            default:
              openGeneralErrorPopUp();
              break;
          }
        }
      }
    } catch {
      await deleteSavedItems();
      setSubPage(null);
      openGeneralErrorPopUp();
    }

    loadingPersistanceLogIn.current = false;
    changePopUpLoading(false);
  };

  if (subPage !== "Create" || !registerFlow.current) {
    TryPersistLogIn();
  }

  if (subPage === "Password") {
    subPageContent = <PasswordPage onReturn={onClickReturn}></PasswordPage>;
  }

  if (subPage === "Create" || registerFlow.current) {
    registerFlow.current = false;
    subPageContent = (
      <CreatePage
        onReturn={onClickReturn}
        onNext={onClickSocialMedia}
        inputCreateUserName={inputCreateUserName}
        setInputCreateUserName={setInputCreateUserName}
        inputCreateUserEmail={inputCreateUserEmail}
        setInputCreateUserEmail={setInputCreateUserEmail}
        inputCreateUserPassword={inputCreateUserPassword}
        setInputCreateUserPassword={setInputCreateUserPassword}
        inputCreateUserRepeatPassword={inputCreateUserRepeatPassword}
        setInputCreateUserRepeatPassword={setInputCreateUserRepeatPassword}
        inputCreateUserTermsAndConditions={inputCreateUserTermsAndConditions}
        setInputCreateUserTermsAndConditions={
          setInputCreateUserTermsAndConditions
        }
      ></CreatePage>
    );
  }

  if (subPage === "Social Media") {
    subPageContent = (
      <SocialMediaPage
        onReturn={onClickReturn}
        handleSignIn={handleSignIn}
        inputCreateUserFacebook={inputCreateUserFacebook}
        setInputCreateUserFacebook={setInputCreateUserFacebook}
        inputCreateUserInstagram={inputCreateUserInstagram}
        setInputCreateUserInstagram={setInputCreateUserInstagram}
        inputCreateUserTiktok={inputCreateUserTiktok}
        setInputCreateUserTiktok={setInputCreateUserTiktok}
        inputCreateUserX={inputCreateUserX}
        setInputCreateUserX={setInputCreateUserX}
        inputCreateUserYoutube={inputCreateUserYoutube}
        setInputCreateUserYoutube={setInputCreateUserYoutube}
      ></SocialMediaPage>
    );
  }

  if (popUpResponse === "Error") {
    popUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {errorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {errorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handlePopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <>{popUpContent}</>
      <>{subPageContent}</>
      <div key={forceRender} className="LoginContainer">
        <BackgroundSams></BackgroundSams>

        <div className="LoginMenuContainer">
          <div style={{width: "80%"}} className="loginHeaderContainer">
            <p onClick={onClickReturnLandingPage} className="loginHeaderText">
              Volver
            </p>
            <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
          </div>

          <div style={{ paddingTop: "55px", width: "80%" }} className="logoContainer">
            <img style={{alignSelf: "center"}} src={logo} alt="Logo" className="LoginLogo"></img>
          </div>
          <p style={{ paddingTop: "4px", width: "80%" }} className="loginTitle">
            Iniciar sesión
          </p>
          <div style={{width: "80%"}} className="loginContainer">
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

          <div style={{width: "80%"}} className="passwordContainer">
            <p className="loginSubtitle">Contraseña</p>
            <div className="passwordInput">
              <input
                placeholder="Contraseña"
                ref={LoginPassword}
                className="GeneralInput"
                type={typeHelper}
              ></input>

              <div
                onClick={() => {
                  if (eyeHelper1) {
                    setTypeHelper("password");
                    setEyeHelper1(false);
                  } else {
                    setTypeHelper("text");
                    setEyeHelper1(true);
                  }
                }}
              >
                {eyeHelper1 === true ? (
                  <img alt="eye" className="eyePassword" src={eyeclosed}></img>
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
          <div style={{width: "80%"}} className="LoginMenuBottomContainer">
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexFlow: "column",
                marginTop: "15px",
              }}
            >
              <button
                style={{ fontSize: "16px" }}
                className="GeneralButton"
                onClick={onClickLogin}
              >
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
                
              </p>
              <p onClick={onClickCreate} style={{color: "white"}} className="underlineText">
                  Créarla aquí
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

import "../styles/checkbox.css";
import { useState } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import eye from "../assets/Visibility.svg";
import eyeclosed from "../assets/Visibility2.svg";
import BackgroundSams from "../components/BackgroundSams";

function CreatePage({
  onReturn,
  onNext,
  inputCreateUserName,
  setInputCreateUserName,
  inputCreateUserEmail,
  setInputCreateUserEmail,
  inputCreateUserPassword,
  setInputCreateUserPassword,
  inputCreateUserRepeatPassword,
  setInputCreateUserRepeatPassword,
  inputCreateUserTermsAndConditions,
  setInputCreateUserTermsAndConditions
}) {

  const [errorInputName, SetErrorInputName] = useState(null);
  const [errorInputMail, SetErrorInputMail] = useState(null);
  const [errorInputPassword, SetErrorInputPassword] = useState(null);
  const [errorCheckbox, SetErrorCheckbox] = useState(false);
  const [passwordEyeHelper, setPasswordEyeHelper] = useState(false);
  const [passwordTypeHelper, setPasswordTypeHelper] = useState("password");
  const [repeatPasswordEyeHelper, setRepeatPasswordEyeHelper] = useState(false);
  const [repeatPasswordTypeHelper, setRepeatPasswordTypeHelper] = useState("password");

  const handleReturn = async () => {
    setInputCreateUserName("");
    setInputCreateUserEmail("");
    setInputCreateUserPassword("");
    setInputCreateUserRepeatPassword("");
    setInputCreateUserTermsAndConditions(false);
    onReturn();
  };

  const handleOntoSocialMedia = () => {
    if(inputValidation()){
      onNext();
    }
  }

  const inputValidation = () => {

    const responseMail = validateMail(inputCreateUserEmail);
    const responsePassword = ValidatePassword(inputCreateUserPassword);

    let flag = true;

    if (inputCreateUserTermsAndConditions) {
      SetErrorCheckbox(false);
    } else {
      SetErrorCheckbox(true);
    }

    if (inputCreateUserPassword !== inputCreateUserRepeatPassword) {
      flag = false;
      SetErrorInputPassword("Las contraseñas no coinciden");
    } else {
      SetErrorInputPassword(null);
    }

    if (responsePassword) {
      if (flag) {
        SetErrorInputPassword(null);
      }
    } else {
      if (inputCreateUserPassword.length === 0) {
        flag = false;
        SetErrorInputPassword(
          "Por favor revisar que la información esté completa, todos los campos son obligatorios"
        );
      } else if(inputCreateUserPassword.length < 8){
        flag = false;
        SetErrorInputPassword(
          `La contraseña debe de incluir al menos 8 caracteres, entre estos al menos un número, un caracter especial “@$!%*?&#¿¡+-.” y una mayúscula.`
        );
      }
      else {
        flag = false;
        SetErrorInputPassword(
          `La contraseña debe de incluir al menos 8 caracteres, entre estos al menos un número, un caracter especial “@$!%*?&#¿¡+-.” y una mayúscula.`
        );
      }
    }

    if (inputCreateUserName.length > 0) {
      SetErrorInputName(null);
    } else {
      flag = false;
      SetErrorInputName(
        "Por favor revisar que la información esté completa, todos los campos son obligatorios"
      );
    }

    if (responseMail) {
      SetErrorInputMail(null);
    } else {
      if (inputCreateUserEmail.length === 0) {
        SetErrorInputMail(
          "Por favor revisar que la información esté completa, todos los campos son obligatorios"
        );
      } else {
        SetErrorInputMail(
          "El correo debe tener un formato válido. Ej: Anita@gmail.com"
        );
      }
    }

    if (responseMail && flag && inputCreateUserTermsAndConditions) {
      return true;
    } else {
      return false;
    }
  };

  const ValidatePassword = (_mailToTest) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#¿¡+-.])[A-Za-z\d@$!%*?&#¿¡+-.]{8,}$/;
    return passwordRegex.test(_mailToTest);
  };

  const validateMail = (_mailToTest) => {
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return strictEmailRegex.test(_mailToTest);
  };

  return (
    <div style={{overflowY: "hidden"}} className="subPageContainer">
      <div style={{overflowX: "hidden", overflowY: "hidden"}} className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div style={{ overflowY:"scroll", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div style={{width: "80%"}} className="loginHeaderContainer">
            <p onClick={handleReturn} className="loginHeaderText">
              Volver
            </p>
            <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
          </div>
          <div className="logoContainer">
            <img src={logo} alt="Logo" className="LoginLogo"></img>
          </div>

          <div className="createUserContainer">
            <p className="loginTitle">Registro</p>
            <div className="GeneralInputContainer">
              <p className="loginHeader">Nombre*</p>
              <div className="passwordInput">
                <input
                  placeholder="Tu nombre de usuario"
                  value={inputCreateUserName}
                  className="GeneralInput"
                  onChange={e => setInputCreateUserName(e.target.value)}
                ></input>
              </div>
              {errorInputName !== null ? (
                <span className="errorText">{errorInputName} </span>
              ) : (
                <></>
              )}
            </div>
            <div className="GeneralInputContainer">
              <p className="loginHeader">Email*</p>
              <div className="passwordInput">
                <input
                  placeholder="Tu email"
                  value={inputCreateUserEmail}
                  className="GeneralInput"
                  onChange={e => setInputCreateUserEmail(e.target.value)}
                ></input>
              </div>
              {errorInputMail !== null ? (
                <span className="errorText">{errorInputMail} </span>
              ) : (
                <></>
              )}
            </div>

            <div className="GeneralInputContainer">
              <p className="loginHeader">Contraseña*</p>
              <p style={{ textAlign: "start", paddingBottom: "8px" }} className="loginBottomText">
                Tu contraseña ha de tener al menos 8 caracteres, con números,
                letras y un símbolo.
              </p>
              <div className="passwordInput">
                <input
                  placeholder="Contraseña"
                  value={inputCreateUserPassword}
                  className="GeneralInput"
                  type={passwordTypeHelper}
                  onChange={e => setInputCreateUserPassword(e.target.value)}
                ></input>

                <div
                  onClick={() => {
                    if (passwordEyeHelper) {
                      setPasswordTypeHelper("password");
                      setPasswordEyeHelper(false);
                    } else {
                      setPasswordTypeHelper("text");
                      setPasswordEyeHelper(true);
                    }
                  }}
                >
                  {passwordEyeHelper === true ? (
                    <img
                      alt="eye"
                      className="eyePassword"
                      src={eyeclosed}
                    ></img>
                  ) : (
                    <img
                      onClick={() => {
                        setPasswordEyeHelper(true);
                      }}
                      alt="eye"
                      className="eyePassword"
                      src={eye}
                    ></img>
                  )}
                </div>
              </div>

              {errorInputPassword !== null ? (
                <span className="errorText">{errorInputPassword} </span>
              ) : (
                <></>
              )}
            </div>
            <div className="GeneralInputContainer">
              <p className="loginHeader">Confirmar Contraseña*</p>
              <div className="passwordInput">
                <input
                  placeholder="Contraseña"
                  value={inputCreateUserRepeatPassword}
                  className="GeneralInput"
                  type={repeatPasswordTypeHelper}
                  onChange={e => setInputCreateUserRepeatPassword(e.target.value)}
                ></input>

                <div
                  onClick={() => {
                    if (repeatPasswordEyeHelper) {
                      setRepeatPasswordTypeHelper("password");
                      setRepeatPasswordEyeHelper(false);
                    } else {
                      setRepeatPasswordTypeHelper("text");
                      setRepeatPasswordEyeHelper(true);
                    }
                  }}
                >
                  {repeatPasswordEyeHelper === true ? (
                    <img
                      alt="eye"
                      className="eyePassword"
                      src={eyeclosed}
                    ></img>
                  ) : (
                    <img
                      onClick={() => {
                        setRepeatPasswordEyeHelper(true);
                      }}
                      alt="eye"
                      className="eyePassword"
                      src={eye}
                    ></img>
                  )}
                </div>
              </div>
            </div>
            <div className="checkBoxContainer">
              <label className="checkbox-container">
                <input
                  onClick={() => {
                    setInputCreateUserTermsAndConditions(!inputCreateUserTermsAndConditions);
                  }}
                  className="custom-checkbox"
                  type="checkbox"
                  defaultChecked={inputCreateUserTermsAndConditions}
                />
                <span className="checkmark"></span>
              </label>
              <p style={{ textAlign: "start", }} className="loginBottomText2">
                {" "}
                Tengo consciencia y estoy de acuerdo con los Términos de Uso y
                con las Políticas de Sam’s Lover
              </p>
            </div>
            {errorCheckbox === true ? (
              <span className="errorText">
                Acepta los términos y políticas de Sam's Lover para continuar{" "}
              </span>
            ) : (
              <></>
            )}
            <div style={{paddingBottom: "15px", width: "90%"}}>
            <button
              className="GeneralButton"
              
              onClick={handleOntoSocialMedia}
            >
              Continuar
            </button>
            </div>


            <div className="createPageButtomContainer">
              <p className="loginBottomText">
                ¿Ya tienes una cuenta?{" "}
                <span onClick={handleReturn} className="underlineText">
                  Accede aquí
                </span>
              </p>
              <p
                className="loginBottomText"
                style={{ paddingLeft: "5px", textDecoration: "underline" }}
                onClick={() => {
                  window.open("https://www.google.com");
                }}
              >
                Términos de uso y Políticas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;

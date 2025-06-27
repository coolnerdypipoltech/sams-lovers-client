import "../styles/checkbox.css";
import { useRef, useState, useContext } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import eye from "../assets/Visibility.svg";
import eyeclosed from "../assets/Visibility2.svg";
import BackgroundSams from "../components/BackgroundSams";
import { ElementContextPopUp } from "../context/PopUpContext";

function CreatePage({ onReturn, onNext, InputName, InputMail, InputPassword1}) {

  const { popUpLoading } = useContext(ElementContextPopUp);

  const [errorInputName, SetErrorInputName] = useState(null);
  const [errorInputMail, SetErrorInputMail] = useState(null);
  const [errorInputPassword1, SetErrorInputPassword1] = useState(null);
  const [errorCheckbox, SetErrorCheckbox] = useState(false);
  const [eyeHelper1, setEyeHelper1] = useState(false);
  const [typeHelper1, setTypeHelper1] = useState("password");
  const [eyeHelper2, setEyeHelper2] = useState(false);
  const [typeHelper2, setTypeHelper2] = useState("password");

  const InputPassword2 = useRef("");
  const checkboxValue = useRef(false);

  const handleReturn = async () => {
    onReturn();
  };

  const handleCreateUser = () => {
    if(inputValidation()){
      onNext();
    }
  }

  const inputValidation = () => {
    const responseMail = validateMail(InputMail.current.value);
    const responsePassword = ValidatePassword(InputPassword1.current.value);
    let flag = true;
    if (checkboxValue.current) {
      SetErrorCheckbox(false);
    } else {
      SetErrorCheckbox(true);
    }
    if (InputPassword1.current.value !== InputPassword2.current.value) {
      flag = false;
      SetErrorInputPassword1("Las contraseñas no coinciden");
    } else {
      SetErrorInputPassword1(null);
    }
    if (responsePassword) {
      if (flag) {
        SetErrorInputPassword1(null);
      }
    } else {
      if (InputPassword1.current.value.length === 0) {
        flag = false;
        SetErrorInputPassword1(
          "Por favor revisar que la información esté completa, todos los campos son obligatorios"
        );
      } else {
        SetErrorInputPassword1(
          `La contraseña debe incluir al menos un caracter especial “+.-!"#$%&/(==?¡’¿” y una mayúscula`
        );
      }
    }

    if (InputName.current.value.length > 0) {
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
      if (InputMail.current.value.length === 0) {
        SetErrorInputMail(
          "Por favor revisar que la información esté completa, todos los campos son obligatorios"
        );
      } else {
        SetErrorInputMail(
          "El correo debe tener un formato válido. Ej: Anita@gmail.com"
        );
      }
    }

    if (responseMail && flag && checkboxValue.current) {
      return true;
    } else {
      console.log(responseMail, flag, checkboxValue.current);
      return false;
    }
  };

  const ValidatePassword = (_mailToTest) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(_mailToTest);
  };

  const validateMail = (_mailToTest) => {
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return strictEmailRegex.test(_mailToTest);
  };

  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div style={{ paddingTop: "88px",overflowY: "scroll", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
          <div className="loginHeaderContainer">
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
                  ref={InputName}
                  className="GeneralInput"
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
                  ref={InputMail}
                  className="GeneralInput"
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
              <p style={{ textAlign: "start" }} className="loginBottomText">
                Tu contraseña ha de tener al menos 8 caracteres, con números,
                letras y un símbolo.
              </p>
              <div className="passwordInput">
                <input
                  placeholder="Contraseña"
                  ref={InputPassword1}
                  className="GeneralInput"
                  type={typeHelper1}
                ></input>

                <div
                  onClick={() => {
                    if (eyeHelper1) {
                      setTypeHelper1("password");
                      setEyeHelper1(false);
                    } else {
                      setTypeHelper1("text");
                      setEyeHelper1(true);
                    }
                  }}
                >
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

              {errorInputPassword1 !== null ? (
                <span className="errorText">{errorInputPassword1} </span>
              ) : (
                <></>
              )}
            </div>
            <div className="GeneralInputContainer">
              <p className="loginHeader">Confirmar Contraseña*</p>
              <div className="passwordInput">
                <input
                  placeholder="Contraseña"
                  ref={InputPassword2}
                  className="GeneralInput"
                  type={typeHelper2}
                ></input>

                <div
                  onClick={() => {
                    if (eyeHelper2) {
                      setTypeHelper2("password");
                      setEyeHelper2(false);
                    } else {
                      setTypeHelper2("text");
                      setEyeHelper2(true);
                    }
                  }}
                >
                  {eyeHelper2 === true ? (
                    <img
                      alt="eye"
                      className="eyePassword"
                      src={eyeclosed}
                    ></img>
                  ) : (
                    <img
                      onClick={() => {
                        setEyeHelper2(true);
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
                    checkboxValue.current = !checkboxValue.current;
                  }}
                  className="custom-checkbox"
                  type="checkbox"
                />
                <span className="checkmark"></span>
              </label>
              <p style={{ textAlign: "start" }} className="loginBottomText">
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
            <button
              disabled={popUpLoading}
              className="GeneralButton"
              onClick={handleCreateUser}
            >
              Crear cuenta
            </button>

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

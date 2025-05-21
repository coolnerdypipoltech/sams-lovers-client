import "../styles/checkbox.css"
import { useRef, useState, useContext } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png"
import eye from "../assets/Visibility.svg";
import { SignIn, LogIn } from "../hooks/apicalls";
import { ElementContextRoute } from "../context/RouteContext";
import { ElementContextData } from "../context/DataContext";
function CreatePage({ onReturn, onNext }) {
  const [errorInputName, SetErrorInputName] = useState(true);
  const [errorInputMail, SetErrorInputMail] = useState(true);
  const [errorInputPassword1, SetErrorInputPassword1] = useState(true);
  const { setLoginToken } = useContext(ElementContextRoute);
  const { SetUserData } = useContext(ElementContextData);
  const InputName = useRef("");
  const InputMail = useRef("");
  const InputPassword1 = useRef("");
  const InputPassword2 = useRef("");

  const handleReturn = async () => {
    onReturn();
  };

  const handleCreateUser = async () => {
    if (inputValidation()) {
      const response = await SignIn(
        InputName.current.value,
        InputMail.current.value,
        InputPassword1.current.value,
      );
      if (response.ok) {
        const responseLogin = await LogIn(
          InputMail.current.value,
          InputPassword1.current.value
        );
        const data = await responseLogin.json();
        if (responseLogin.ok) {
          SetUserData(data);
          setLoginToken(data.access_token);
          onNext()
        }
      } else {
        const data = await response.json();
        if (data.message) {
          if (data.message.email) {
            SetErrorInputMail(false);
          }

          if (data.message.name) {
            SetErrorInputName(false);
          }

          if (data.message.password) {
            SetErrorInputPassword1(false);
          }
        }
      }
    }
  };

  const inputValidation = () => {
    const responseMail = validateMail(InputMail.current.value);
    let flag = true;

    if (InputPassword1.current.value.length === 0) {
      flag = false;
      SetErrorInputPassword1(false);
    } else {
      SetErrorInputPassword1(true);
    }

    if (InputPassword1.current.value !== InputPassword2.current.value) {
      console.log("here");
      flag = false;
      SetErrorInputPassword1(false);
    } else {
      SetErrorInputPassword1(true);
    }

    if (InputName.current.value.length > 0) {
      SetErrorInputName(true);
    } else {
      console.log("aa");
      flag = false;
      SetErrorInputName(false);
    }
    SetErrorInputMail(responseMail);
    if (
      responseMail &&
      flag
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateMail = (_mailToTest) => {
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return strictEmailRegex.test(_mailToTest);
  };


  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
        <div className="loginHeaderContainer">
          <p onClick={handleReturn} className="loginHeaderText">Volver</p>
          <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
        </div>
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>

        <div className="createUserContainer">
          <p className="loginTitle">Registro</p>
          <div className="GeneralInputContainer">
            <p className="loginHeader">Nombre*</p>
            <input
              placeholder="Tu nombre de usuario"
              ref={InputName}
              className="GeneralInput"
            ></input>
            {errorInputName === false ? (
              <span className="errorText">Porfavor verifique su nombre</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <p className="loginHeader">Email*</p>
            <input
              placeholder="Tu email"
              ref={InputMail}
              className="GeneralInput"
            ></input>
            {errorInputMail === false ? (
              <span className="errorText">Porfavor verifique su Email</span>
            ) : (
              <></>
            )}
          </div>
          
          <div className="GeneralInputContainer">
            <p className="loginHeader">Contraseña*</p>
          <div className="passwordInput">
            
              <input
                placeholder="Escribe una contraseña"
                ref={InputPassword1}
                className="GeneralInput"
                type="password"
              ></input>

              <img className="eyePassword" alt="show" src={eye}></img>
          </div>

          {errorInputPassword1 === false ? (
            <span className="errorText">Porfavor verifique su contraseña</span>
          ) : (
            <></>
          )}
          </div>
          <div className="GeneralInputContainer">
            <p className="loginHeader">Confirmar Contraseña*</p>
          <div className="passwordInput">
            
              <input
                placeholder="Escribe tu contraseña de nuevo"
                ref={InputPassword2}
                className="GeneralInput"
                type="password"
              ></input>
              

              <img className="eyePassword" alt="show" src={eye}></img>
          </div>
          <p className="loginBottomText">Tu contraseña ha de tener al menos 8 caracteres, con números, letras y un símbolo.</p>
          </div>
           <div className="checkBoxContainer">
            <label className="checkbox-container">
                <input className="custom-checkbox" defaultChecked type="checkbox"/>
                <span className="checkmark"></span>
            </label>
            <p className="loginBottomText"> Tengo consciencia y estoy de acuerdo con los Términos de Uso y con las Políticas de Sam’s Lover</p>
          </div>
          <button className="GeneralButton" onClick={handleCreateUser}>
            Crear cuenta
          </button>
         
          <div>
              <p className="loginBottomText" >¿Ya tienes una cuenta? <span onClick={handleReturn} className="underlineText">Accede aquí</span></p>
              <a className="loginBottomText" style={{ paddingLeft: "5px" }} href="https://www.google.com">
                Términos de uso y Políticas
              </a>

            </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;

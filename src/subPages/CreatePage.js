import "../styles/checkbox.css"
import { useRef, useState, useContext } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png"
import eye from "../assets/Visibility.svg";
import { SignIn, LogIn } from "../hooks/apicalls";
import { ElementContextRoute } from "../context/RouteContext";
import { ElementContextData } from "../context/DataContext";
function CreatePage({ onReturn, onNext }) {
  const [errorInputName, SetErrorInputName] = useState(null);
  const [errorInputMail, SetErrorInputMail] = useState(null);
  const [errorInputPassword1, SetErrorInputPassword1] = useState(null);
  const { setLoginToken } = useContext(ElementContextRoute);
  const { SetUserData } = useContext(ElementContextData);
  const InputName = useRef("");
  const InputMail = useRef("");
  const InputPassword1 = useRef("");
  const InputPassword2 = useRef("");
  const checkboxValue = useRef(false);
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
        console.log(data)
        if (data.message) {
          if (data.message.email) {
            SetErrorInputMail(data.message.email);
          }

          if (data.message.name) {
            SetErrorInputName(data.message.name);
          }

          if (data.message.password) {
            SetErrorInputPassword1(data.message.password);
          }

          if(data.message === "api.error.already_exists"){
            SetErrorInputMail("Este correo ya está registrado, por favor intenta con otro correo o si prefieres, inicia sesión")
          }
        }
      }
    }
  };

  const inputValidation = () => {
    const responseMail = validateMail(InputMail.current.value);
    const responsePassword = ValidatePassword(InputPassword1.current.value)
    let flag = true;

    if (InputPassword1.current.value.length === 0) {
      flag = false;
      SetErrorInputPassword1("Por favor revisar que la información esté completa, todos los campos son obligatorios");
    } else {
      SetErrorInputPassword1(null);
    }

    if (InputPassword1.current.value !== InputPassword2.current.value) {
      console.log("here");
      flag = false;
      SetErrorInputPassword1("Las contraseñas no coinciden");
    } else {
      SetErrorInputPassword1(null);
    }

    if (InputName.current.value.length > 0) {
      SetErrorInputName(null);
    } else {
      flag = false;
      SetErrorInputName("Por favor revisar que la información esté completa, todos los campos son obligatorios");
    }
    if(responsePassword){
      SetErrorInputPassword1(null);
    }else{
      SetErrorInputPassword1(`La contraseña debe incluir al menos un caracter especial “+.-!"#$%&/(==?¡’¿” y una mayúscula`)
    }
    if(responseMail){
      SetErrorInputMail(null);
    }else{
      SetErrorInputMail("El correo debe tener un formato válido. Ej: Anita@gmail.com")
    }
    
    if (
      responseMail &&
      flag && checkboxValue.current
    ) {
      return true;
    } else {
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
            < div className="passwordInput">
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
            <div  className="passwordInput">
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
          <div  className="passwordInput">
            
              <input
                placeholder="Escribe una contraseña"
                ref={InputPassword1}
                className="GeneralInput"
                type="password"
              ></input>

              <img onClick={() => {
                if(InputPassword1.current.getAttribute("type") === "password"){
                  InputPassword1.current.setAttribute("type", "text")
                }else{
                  InputPassword1.current.setAttribute("type", "password")
                }
              }} alt="eye" className="eyePassword" src={eye}></img>
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
                placeholder="Escribe tu contraseña de nuevo"
                ref={InputPassword2}
                className="GeneralInput"
                type="password"
              ></input>
              

              <img onClick={() => {
                if(InputPassword2.current.getAttribute("type") === "password"){
                  InputPassword2.current.setAttribute("type", "text")
                }else{
                  InputPassword2.current.setAttribute("type", "password")
                }
              }} alt="eye" className="eyePassword" src={eye}></img>
          </div>
          <p className="loginBottomText">Tu contraseña ha de tener al menos 8 caracteres, con números, letras y un símbolo.</p>
          </div>
           <div className="checkBoxContainer">
            <label className="checkbox-container">
                <input onClick={() => {
                 checkboxValue.current = !checkboxValue.current
              }}className="custom-checkbox" type="checkbox"/>
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

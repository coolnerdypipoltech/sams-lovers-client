import { useRef, useState, useContext } from "react";
import logo from "../assets/samsLogo.webp";
import {SignIn, LogIn} from "../hooks/apicalls"
import Login from "../pages/Login";
import { ElementContextRoute } from "../context/RouteContext";
import { ElementContextData } from "../context/DataContext";
function CreatePage({ onReturn }) {
  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);
  const [errorInputName, SetErrorInputName] = useState(true);
  const [errorInputMail, SetErrorInputMail] = useState(true);
  const [errorInputPassword1, SetErrorInputPassword1] = useState(true);
  const { setLoginToken } = useContext(ElementContextRoute);
  const { SetUserData } = useContext(ElementContextData);
  const InputName = useRef("");
  const InputMail = useRef("");
  const InputFacebook = useRef("");
  const InputInstagram = useRef("");
  const InputTiktok = useRef("");
  const InputX = useRef("");
  const InputYoutube = useRef("");
  const InputPassword1 = useRef("");
  const InputPassword2 = useRef("");

  const handleReturn = async () => {
    onReturn();
  };

  const handleCreateUser = async () => {
    
    if(true){
      const response = await SignIn(InputName.current.value, InputMail.current.value, InputPassword1.current.value, InputFacebook.current.value, InputInstagram.current.value, InputTiktok.current.value, InputX.current.value, InputYoutube.current.value);
      if(response.ok){
        const responseLogin = await LogIn(InputMail.current.value, InputPassword1.current.value)
        const data = await responseLogin.json()
        if(responseLogin.ok){
          SetUserData(data);
          setLoginToken(data.access_token);
        }
      }else{
        const data = await response.json()
        if(data.message){
          if(data.message.email){
              SetErrorInputMail(false)
            }
            
            if(data.message.name){
              SetErrorInputName(false)
            }

            if(data.message.password){
              SetErrorInputPassword1(false)
            }
        }
      }
    }
  }

  const inputValidation = () => {
    const responseF = validateFacebook(InputFacebook.current.value);
    const responseI = validateUser(InputInstagram.current.value);
    const responseT = validateUser(InputTiktok.current.value);
    const responseX = validateUser(InputX.current.value);
    const responseY = validateUser(InputYoutube.current.value);
    const responseMail = validateMail(InputMail.current.value)
    let flag = true

    if(InputPassword1.current.value.length === 0){
      flag = false
      SetErrorInputPassword1(false)
    }else{
      SetErrorInputPassword1(true)
    }

    if(InputPassword1.current.value !== InputPassword2.current.value){
      console.log("here")
      flag = false
      SetErrorInputPassword1(false)
    }else{
      SetErrorInputPassword1(true)
    }

    if(InputName.current.value.length > 0){
      SetErrorInputName(true)
    }else{
      console.log("aa")
      flag = false
      SetErrorInputName(false)  
    }

    SetErrorInputFacebook(responseF);
    SetErrorInputInstagram(responseI);
    SetErrorInputTiktok(responseT);
    SetErrorInputX(responseX);
    SetErrorInputYoutube(responseY);
    SetErrorInputMail(responseMail);
    console.log("val")
    console.log(flag)
    if (responseY && responseX && responseT && responseI && responseF && responseMail && flag ) {
      return true;
    } else {
      return false;
    }
  };

  const validateMail = (_mailToTest) => {
        const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return strictEmailRegex.test(_mailToTest)
  }

  const validateUser = (_userToTest) => {
    if(_userToTest.length === 0) {
      return true
    }
    const userRegex = /^@.+$/;
    return userRegex.test(_userToTest);
  };

  const validateFacebook = (_userToTest) => {
    if(_userToTest.length === 0) {
      return true
    }
    const regexFacebook = /^https:\/\/www\.facebook\.com\/.+$/;
    return regexFacebook.test(_userToTest);
  };

  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>
        <div className="createUserContainer">
          <input placeholder="Nombre" ref={InputName} className="inputCreateUser"></input>
          {errorInputName === false ? (
            <span>Porfavor verifique su nombre</span>
          ) : (
            <></>
          )}
          <input placeholder="Correo" ref={InputMail} className="inputCreateUser"></input>
          {errorInputMail === false ? (
            <span>Porfavor verifique su Email</span>
          ) : (
            <></>
          )}
<input
            placeholder="Facebook (opcional)"
            className="inputCreateUser"
            ref={InputFacebook}
          ></input>
          {errorInputFacebook === false ? (
            <span>Porfavor verifique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Instagram (opcional)"
            className="inputCreateUser"
            ref={InputInstagram}
          ></input>
          {errorInputInstagram === false ? (
            <span>Porfavor verifique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Tiktok (opcional)"
            className="inputCreateUser"
            ref={InputTiktok}
          ></input>
          {errorInputTiktok === false ? (
            <span>Porfavor verifique su usuario</span>
          ) : (
            <></>
          )}
          <input placeholder="X (opcional)" ref={InputX} className="inputCreateUser"></input>
          {errorInputX === false ? (
            <span>Porfavor verifique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Youtube (opcional)"
            className="inputCreateUser"
            ref={InputYoutube}
          ></input>
          {errorInputYoutube === false ? (
            <span>Porfavor verifique su usuario</span>
          ) : (
            <></>
          )}
          <input placeholder="Contraseña" ref={InputPassword1} className="inputCreateUser"></input>
          {errorInputPassword1 === false ? (
            <span>Porfavor verifique su contraseña</span>
          ) : (
            <></>
          )}
          <input
          ref={InputPassword2}
            placeholder="Repetir Contraseña"
            className="inputCreateUser"
          ></input>

          <p onClick={handleCreateUser}>Registrarme</p>
          <p onClick={handleReturn}>¿YA TIENES CUENTA? INICIA SESIÓN.</p>
          <p>Términos y condiciones</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;

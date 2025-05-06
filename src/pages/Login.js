import "../styles/Login.css";
import logo from "../assets/samsLogo.webp";
import { useState } from "react";
function Login() {
  const [createUser, setCreateUser] = useState(false);
    const [menuType, setMenuType] = useState("Login");

    let content = <></>

    if(menuType === "Login") {
        content = <div className="LoginMenuContainer">
        <input placeholder="Nombre" className="inputLoginMenu"></input>
        <div className="passwordContainer">
        <input placeholder="Correo" className="inputLoginMenu"></input>
        <p className="PasswordTextLogin">Olvidé mi contraseña</p></div>
        
        <div className="LoginMenuBottomContainer">
          
          <p>Acceder</p>
          <p>¿NO TIENES CUENTA? CREA UNA</p>
        </div>
      </div>
    }

    if(menuType === "Create") {
        content = <div className="createUserContainer">
        <input placeholder="Nombre" className="inputCreateUser"></input>
        <input placeholder="Correo" className="inputCreateUser"></input>
        <input
          placeholder="Facebook (opcional)"
          className="inputCreateUser"
        ></input>
        <input
          placeholder="Instagram (opcional)"
          className="inputCreateUser"
        ></input>
        <input
          placeholder="Tiktok (opcional)"
          className="inputCreateUser"
        ></input>
        <input
          placeholder="X (opcional)"
          className="inputCreateUser"
        ></input>
        <input
          placeholder="Youtube (opcional)"
          className="inputCreateUser"
        ></input>
        <input placeholder="Contraseña" className="inputCreateUser"></input>
        <input
          placeholder="Repetir Contraseña"
          className="inputCreateUser"
        ></input>

        <p>Registrarme</p>
        <p>¿YA TIENES CUENTA? INICIA SESIÓN.</p>
        <p>Términos y condiciones</p>
      </div>
    }

    if(menuType === "Password"){
        content = <div className="forgetPasswordContainer">
        <div>
        <p className="textForgetPassword">Introduce el correo con el que te registraste y te enviaremos las instrucciones.</p>
        <input placeholder="Correo" className="inputCreateUser"></input>
        </div>

        <p className="forgetPasswordSend">Enviar</p>
      </div>
    }


  return (
    <>
      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>

        <>{content}</>
      </div>
    </>
  );
}

export default Login;

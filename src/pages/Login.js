import "../styles/Login.css";
import logo from "../assets/samsLogo.webp";
import { useState } from "react";
import  CreatePage  from "../subPages/CreatePage"
import  PasswordPage  from "../subPages/PasswordPage";
function Login() {

  const [subPage, setSubPage] = useState("");

  let subPageContent = null

  if(subPage === "Password"){
    subPageContent = <PasswordPage></PasswordPage>
  }
  
  if(subPage === "Create"){
    subPageContent = <CreatePage></CreatePage>
  } 

  return (
    <>
      <>{subPageContent}</>

      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>

        <div className="LoginMenuContainer">
        <input placeholder="Nombre" className="inputLoginMenu"></input>
        <div className="passwordContainer">
        <input placeholder="Correo" className="inputLoginMenu"></input>
        <p className="PasswordTextLogin">Olvidé mi contraseña</p></div>
        
        <div className="LoginMenuBottomContainer">
          
          <p>Acceder</p>
          <p>¿NO TIENES CUENTA? CREA UNA</p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;

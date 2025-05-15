import { useRef, useState } from "react";
import logo from "../assets/samsLogo.webp";
import ImagePicker from "../components/ImagePicker";
function EditProfilePage({ onReturn }) {
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const LoginText = useRef("");
  const LoginPassword = useRef("");
  const LoginPassword2 = useRef("");
  const handleReturn = async () => {
    onReturn();
  };

  const handleSave = async () => {
    if (inputValidation()) {
      onReturn();
    }
  };

  const inputValidation = () => {
    const response1 = ValidateEmail();
    const response2 = ValidatePassword();
    console.log("", response2);
    console.log("", response1);
    if (LoginPassword.current.value === LoginPassword2.current.value) {
      if (response1 === true && response2 === true) {
        return true;
      } else {
        return false;
      }
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

  return (
    <div className="subPageContainer">
      <div className="ProfileContainer">
        <p onClick={handleReturn} className="EditProfileBackButton">
          Volver
        </p>
        <p className="Title">Editar Perfil</p>

        <ImagePicker></ImagePicker>
        <div className="createUserContainer">
          <input placeholder="Nombre" className="inputCreateUser"></input>
          <input
            placeholder="Correo"
            ref={LoginText}
            className="inputCreateUser"
          ></input>
          {errorEmail === true ? (
            <span>Porfavor verique su correo electronico</span>
          ) : (
            <></>
          )}
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
          <input placeholder="X (opcional)" className="inputCreateUser"></input>
          <input
            placeholder="Youtube (opcional)"
            className="inputCreateUser"
          ></input>
          <input
            placeholder="Contraseña"
            ref={LoginPassword}
            className="inputCreateUser"
          ></input>
          {errorPassword === true ? (
            <span>Porfavor verique su contraseña</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Repetir Contraseña"
            ref={LoginPassword2}
            className="inputCreateUser"
          ></input>
          {errorPassword === true ? (
            <span>Porfavor verique su contraseña</span>
          ) : (
            <></>
          )}
          <p onClick={handleSave}>Guardar</p>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;

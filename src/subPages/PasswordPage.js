import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png"
function PasswordPage({onReturn}) {

  const handleSend = async () => {
    onReturn()
  };

  const handleReturn = async () => {
    onReturn()
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
      <div className="forgetPasswordContainer">
        <p className="loginTitle">Recuperar contraseña</p>
        <div>
          <p className="textForgetPassword">
            Introduce el correo con el que te registraste y te enviaremos las
            instrucciones.
          </p>
          <p className="textForgetPassword">Email*</p>
          <input placeholder="Tu email" className="GeneralInput"></input>
        </div>

        <button onClick={handleSend} className="GeneralButton">Enviar</button>
      </div>
    </div>
    </div>
  );
}

export default PasswordPage;

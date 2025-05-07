import logo from "../assets/samsLogo.webp";


function PasswordPage() {
  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>
      <div className="forgetPasswordContainer">
        <div>
          <p className="textForgetPassword">
            Introduce el correo con el que te registraste y te enviaremos las
            instrucciones.
          </p>
          <input placeholder="Correo" className="inputCreateUser"></input>
        </div>

        <p className="forgetPasswordSend">Enviar</p>
      </div>
    </div>
    </div>
  );
}

export default PasswordPage;

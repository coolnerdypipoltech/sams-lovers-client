import logo from "../assets/samsLogo.webp";


function PasswordPage({onReturn}) {

  const handleSend = async () => {
    onReturn()
  };

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

        <p onClick={handleSend} className="forgetPasswordSend">Enviar</p>
      </div>
    </div>
    </div>
  );
}

export default PasswordPage;

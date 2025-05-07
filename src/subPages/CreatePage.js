import logo from "../assets/samsLogo.webp";
function CreatePage() {
  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>
        <div className="createUserContainer">
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
          <input placeholder="X (opcional)" className="inputCreateUser"></input>
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
      </div>
    </div>
  );
}

export default CreatePage;

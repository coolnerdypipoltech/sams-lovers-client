import logo from "../assets/Brand_SamsLovers.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png"
import { useState, useRef } from "react"
import { ResetPassword } from "../hooks/apicalls";
import BackgroundSams from "../components/BackgroundSams";

function PasswordPage({ onReturn }) {

  const [inputValue, setInputValue] = useState("");
  const [popUpResponse, setPopUpResponse] = useState(null);
  const [eyeHelper, setEyeHelper] = useState(false);
  const [typeHelper, setTypeHelper] = useState("password");

  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");
  let popUpContent = <></>;

  const handleOnChangeInput = (input) => {
    setInputValue(input);
  }

  const handlePopUpClose = () => {
    setInputValue("");
    setPopUpResponse(null);
  }

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  }

  const handleSend = async () => {
    if (inputValue === "") return;

    const response = await ResetPassword(inputValue);
    const data = await response.json();
    if (response.ok) {
      setPopUpResponse("Success");
    } else {
      if (data.message) {
        switch(data.message) {
          default:
            openGeneralErrorPopUp();
            break;
        }
      }else{
        openGeneralErrorPopUp();
      }
      return;
    }
  };

  const handleReturn = () => {
    setInputValue("");
    setPopUpResponse(null);
    onReturn();
  };

  if(popUpResponse === "Error"){
    popUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {rewardErrorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {rewardErrorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handlePopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if(popUpResponse === "Success"){
    popUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {"Correo enviado"}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {`Se ha enviado un correo a la dirección ${inputValue} con un enlace para que pueda cambiar su contraseña. Verifique su bandeja de entrada por favor.`}
            </p>

            <button className="GeneralButton4" onClick={handleReturn}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <>{popUpContent}</>
    <div className="subPageContainer">
      <div className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div className="loginHeaderContainer">
          <p onClick={handleReturn} className="loginHeaderText">Volver</p>
          <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
        </div>
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
        </div>
      <div className="forgetPasswordContainer">
        <p className="loginTitle">Recuperar contraseña</p>
        <div style={{width: "100%"}}>
          <p className="textForgetPassword">
            Introduce el correo con el que te registraste y te enviaremos las
            instrucciones.
          </p>
          <p className="textForgetPassword">Email</p>
          <div className="passwordContainer">
            <div className="passwordInput">
              <input
                placeholder="Tu Email"
                className="GeneralInput"
                onChange={e => handleOnChangeInput(e.target.value)}
              ></input>

              
            </div>
          </div>
        </div>
        <div style={{paddingTop: "75px", width: "80%"}}><button  onClick={handleSend} className="GeneralButton">Enviar</button></div>
        
      </div>
    </div>
    </div>
    </>
  );
}

export default PasswordPage;

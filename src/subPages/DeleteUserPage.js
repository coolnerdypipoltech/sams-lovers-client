import { useState } from "react";
import eye from "../assets/Visibility.svg";
import eyeclosed from "../assets/Visibility2.svg";

function DeleteUserPage({
  handleReturn,
  inputValue,
  handleOnChangeInput,
  handleWarningPopUp,
}) {
  const [eyeHelper, setEyeHelper] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [typeHelper, setTypeHelper] = useState("password");
  let helper = "70%"

  if(window.innerWidth > 800){
    helper = "50%"

  }
  
  return (
    <>
      <div className="subPageContainer"><div
        className="CodePageContainer"
      >

        <div className="headerSpacer"></div>
        <p
          style={{paddingTop: "50px"}}
          className="backButtonConfig"
          onClick={handleReturn}
        >
          Volver
        </p>
        <p style={{marginTop: "10px"}} className="CodeTitle">Eliminar cuenta</p>
        <p className="CodeText">
          Por favor, ingresa tu contraseña para confirmar la eliminación de tu
          cuenta.
        </p>
        <div style={{width: "90%", maxWidth: "600px"}} className="Divider"></div>
        <div style={{width: "70%", maxWidth: "390px"}}>
                    <div className="passwordContainer">
            <p style={{color: "black", fontSize: "14px"}} className="loginSubtitle">Contraseña</p>
            <div className="passwordInput">
              <input
                placeholder="Contraseña"
                className="GeneralInput"
                value={inputValue} onChange={e => handleOnChangeInput(e.target.value)}
                type={typeHelper}
              ></input>

              <div onClick={() => {
                  if(eyeHelper){
                    setTypeHelper("password")
                    setEyeHelper(false);
                  }else{
                    setTypeHelper("text")
                    setEyeHelper(true);
                  }
                    }}>
                {eyeHelper === true ? (
                  <img
                    alt="eye"
                    className="eyePassword"
                    src={eyeclosed}
                  ></img>
                ) : (
                  <img
                    onClick={() => {
                      setEyeHelper(true);
                    }}
                    alt="eye"
                    className="eyePassword"
                    src={eye}
                  ></img>
                )}
              </div>
            </div>

            {errorPassword !== null ? (
              <span className="errorText">{errorPassword} </span>
            ) : (
              <></>
            )}
          </div>
            <div style={{width: "100%", paddingTop: "30px"}} className="CodeButtonContainer">
                <button style={{width: "70%"}} className={inputValue === "" ? "GeneralButton4-Inactive" : "GeneralButton4"} disabled={inputValue === ""} onClick={handleWarningPopUp}>Eliminar cuenta</button>
            </div>
        </div>

      </div></div>
      
    </>
  );
}

export default DeleteUserPage;

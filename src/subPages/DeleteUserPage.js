import { useState } from "react";
import eye from "../assets/Visibility.svg";
import eyeclosed from "../assets/Visibility2.svg";

function DeleteUserPage({handleReturn, inputValue, handleOnChangeInput, handleWarningPopUp}){

    const [eyeHelper, setEyeHelper] = useState(false);
    const [typeHelper, setTypeHelper] = useState("password");

    return (
        <>
        <div className="subPageContainer"></div>
        <div
            style={{ width: "90%", backgroundColor: "#F2F4FF" }}
            className="challenges-subpage-container"
            >
            <div className="headerSpacer"></div>
            <div className="headerSpacer"></div>
            <p
                style={{ color: "#3C74F3" }}
                className="challenge-back-button-text"
                onClick={handleReturn}
            >
                Volver
            </p>
            <p className="CodeTitle">Eliminar cuenta</p>
            <p className="CodeText">
                Por favor, ingresa tu contraseña para confirmar la eliminación de tu cuenta.
            </p>
            <div className="Divider"></div>
            <div className="CodeInputContainer">
                <p className="CodeInputText"> Contraseña</p>
                <input placeholder={"Contraseña"} type={typeHelper} className="GeneralInput" value={inputValue} onChange={e => handleOnChangeInput(e.target.value)}></input>
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
            <div className="CodeButtonContainer">
                <button className="GeneralButton4" onClick={handleWarningPopUp}>Eliminar cuenta</button>
            </div>
        </div>
        </>
    );
}

export default DeleteUserPage;
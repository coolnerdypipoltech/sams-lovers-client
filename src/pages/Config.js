import { useState, useRef, useContext } from "react";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import { DeleteUser } from "../hooks/apicalls";
import "../styles/Main.css";
import DeleteUserPage from "../subPages/DeleteUserPage";
import { ElementContextPopUp } from "../context/PopUpContext";

function Config() {

  const { changeRoute, deleteSavedItems } = useContext(ElementContextRoute);
  const { UserData, SetUserData } = useContext(ElementContextData);
  const { changePopUpLoading } = useContext(ElementContextPopUp);

  const [subPage, setSubPage] = useState("");
  const [popUpDeleteUser, setPopUpDeleteUser] = useState("");
  const [inputValue, setInputValue] = useState('');

  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");

  let subPageContent = <></>;
  let popUpContent = <></>;

  const handleOnChangeInput = (input) => {
    setInputValue(input);
  }

  const NotSamePasswordPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error.";
    rewardErrorPopUpContent.current = "Verifique la contraseña que ha escrito y vuelva a intentar.";
    setPopUpDeleteUser("Fail");
  }

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpDeleteUser("Fail");
  }

  const handleWarningPopUp = () => {
    setPopUpDeleteUser("Warning");
  }

  const handleDeleteUser = async () => {
    if (inputValue === "") return;
    setPopUpDeleteUser("")
    changePopUpLoading(true);
    const response = await DeleteUser(`${UserData.current.token_type} ${UserData.current.access_token}`, inputValue);

    if (response.ok) {
      changePopUpLoading(false);
      setInputValue("");
      setPopUpDeleteUser("");
      setSubPage("");
      SetUserData(null);
      await deleteSavedItems();
      changeRoute("LogIn");
    } else {
      changePopUpLoading(false);
      const data = await response.json();
      if (data.message) {
        switch(data.message) {
          case "api.error.unauthorized":
            SetUserData(null);
            await deleteSavedItems();
            changeRoute("Login");
            break;
          case "api.error.invalid_password":
            NotSamePasswordPopUp();
            break;
          default:
            openGeneralErrorPopUp();
            break;
        }
      }else{
        openGeneralErrorPopUp();
      }
      return;
    }
  }

  const handleDeleteAccountSubPage = () => {
    setSubPage("DeleteAccount");
  }

  const handleErrorDeleteUserPopUpClose = () => {
    setPopUpDeleteUser("");
  }

  const handleReturn = () => {
    if(subPage === "DeleteAccount") setInputValue("");
    setSubPage("");
  }

  if(popUpDeleteUser === "Warning") {
    popUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              Eliminar cuenta
            </p>
            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              ¿Estás seguro que quieres eliminar tu cuenta?
            </p>
            <button className="GeneralButton4" onClick={handleErrorDeleteUserPopUpClose}>
              Mejor no
            </button>
            <br/>
            <br/>
            <button className="GeneralButton4" onClick={handleDeleteUser}>
              Eliminar Cuenta
            </button>
            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (popUpDeleteUser === "Fail") {
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

            <button className="GeneralButton4" onClick={handleErrorDeleteUserPopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if(popUpDeleteUser === ""){
    popUpContent = <></>;
  }

  if (subPage === "DeleteAccount") {
    subPageContent = (
      <DeleteUserPage handleReturn={handleReturn} inputValue={inputValue} handleOnChangeInput={handleOnChangeInput} handleWarningPopUp={handleWarningPopUp}></DeleteUserPage>
    );
  }

  if(subPage === "") {
    subPageContent = <></>;
  }

  return (
    <>
    {popUpContent}
    {subPageContent}
    <div className="CodePageContainer">
        <div className="headerSpacer"></div>
        <p className="CodeTitle">Configuración</p>
        <div style={{opacity: "0.3", width: "90%"}} className="Divider"></div>
        <p className="CodeText" onClick={handleDeleteAccountSubPage}>Eliminar cuenta</p>
        <p style={{color: "black"}} className="CodeText">
          Al eliminar tu cuenta no podrás recuperar tus datos guardados ni tus diamantes
        </p>
        
        
      </div>
    </>
  );
}


export default Config;
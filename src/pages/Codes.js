import { ExchangeCode } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import { useContext, useRef, useState } from "react";
import "../styles/Codes.css";
import diamond from "../assets/diamond.svg";
import SamsConfetti from "../components/SamsConfetti";

function Codes() {
  const { deleteSavedItems, changeRoute, getCurrentToken } = useContext(ElementContextRoute);
  const { SetUserData, UserData, setNewUserDiamonds } = useContext(ElementContextData);

  const [popUpResponse, setPopUpResponse] = useState("");
  const [inputValue, setInputValue] = useState('');

  let redeemedDiamonds = useRef(0);
  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");
  let rewardPopUpContent = <></>;

  const handleOnChangeInput = (input) => {
    setInputValue(input);
  }

  const codeNotFoundPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, no existe el código que escribiste.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos códigos para ti, pendiente en nuestras redes sociales.";
    setPopUpResponse("Error");
  }

  const expiredCodePopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, este código ha expirado.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos códigos para ti, pendiente en nuestras redes sociales.";
    setPopUpResponse("Error");
  }

  const maxRedemptionsReachedPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, se han agotado los canjes permitidos para este código.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos códigos para ti, pendiente en nuestras redes sociales.";
    setPopUpResponse("Error");
  }

  const noStockErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, se han agotado los canjes permitidos para este código.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos códigos para ti, pendiente en nuestras redes sociales.";
    setPopUpResponse("Error");
  }

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  }

  const handleRewardPopUpClose = () => {
    redeemedDiamonds.current = 0;
    setInputValue("");
    setPopUpResponse(null);
  }

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const handleExchangeCode = async () => {
    if (inputValue === "") return;

    const token = getCurrentToken();

    const response = await ExchangeCode(`Bearer ${token}`, inputValue);
    const data = await response.json();
    if (response.ok) {
        redeemedDiamonds.current = data.user.related.diamonds - UserData.current.user.related.diamonds;
        setNewUserDiamonds(data.user.related.diamonds);
        setPopUpResponse("Success");
        setInputValue("");
      } else {
        if (data.message) {
          switch(data.message) {
            case "api.error.unauthorized":
              await handleLogOut();
              break;
            case "api.error.code_not_found":
              codeNotFoundPopUp();
              break;
            case "api.error.code_expired":
              expiredCodePopUp();
              break;
            case " api.error.max_redemptions_reached":
              maxRedemptionsReachedPopUp();
              break;
            case " api.error.no_stock":
              noStockErrorPopUp();
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

  if(popUpResponse === "Error"){
    rewardPopUpContent = (
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

            <button className="GeneralButton4" onClick={handleRewardPopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if(popUpResponse === "Success"){
    rewardPopUpContent = (
      <>
        <SamsConfetti></SamsConfetti>
        <div className="PopUp">
          <div style={{ height: "auto" }} className="PopUpDialog">
            <div className="GeneralButtonContainer">
              <img
                src={diamond}
                style={{ height: "130px", paddingTop: "20px" }}
                alt="An illustration representative of a diamond."
              ></img>

              <p className="subTitlePopUpReward">
                ¡Código canjeado con exito!
              </p>

              <p
                style={{
                  fontWeight: "800",
                  margin: "0px",
                  marginBottom: "20px",
                  color: "#0066A1",
                }}
                className="subTitlePopUpReward"
              >
                {`${redeemedDiamonds.current} diamantes`}
              </p>

              <p
                style={{
                  fontWeight: "400",
                  margin: "0px",
                  marginBottom: "20px",
                }}
                className="subTitlePopUpReward"
              >
                Tú código ha sido redimido correctamente.
                Disfruta de tus recompensas y gracias por ser parte de nuestra comunidad
                de Sam's Lover.
              </p>

              <button
                style={{}}
                className="GeneralButton4"
                onClick={handleRewardPopUpClose}
              >
                Aceptar
              </button>

              <div style={{ height: "30px" }}></div>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
    <>{rewardPopUpContent}</>
      <div className="CodePageContainer">
        <div className="headerSpacer"></div>
        <p className="CodeTitle">Redime tu código</p>
        <p className="CodeText">
          Obten diamantes gratis con los códigos Sam's Lovers ¿Ya tienes un
          código? Redimelo aquí
        </p>
        <div style={{opacity: "0.3", width: "90%"}} className="Divider"></div>
        <div className="CodeInputContainer">

            <p className="CodeInputText"> Introduce tu código de 16 dígitos</p>
          <input style={{width: "auto"}} placeholder="Código"  className="GeneralInput" value={inputValue} onChange={e => handleOnChangeInput(e.target.value)}></input>
        </div>
        <div style={{width: "70%", paddingTop: "10px"}} className="CodeButtonContainer">
          <button style={{fontSize: "14px"}} className="GeneralButton4" onClick={handleExchangeCode}>Canjear código</button>
        </div>
      </div>
    </>
  );
}

export default Codes;

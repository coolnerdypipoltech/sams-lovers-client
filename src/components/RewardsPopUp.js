import React, { useState, useContext } from "react";
import { render } from "react-dom";
import diamond from "../assets/diamond.svg";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { ElementContextData } from "../context/DataContext";

function RewardsPopUp({ closePopUp, handlePurchase }) {
  const [popUpResponse, setPopUpResponse] = useState(null);
  const { UserData, currentReward } = useContext(ElementContextData);

  const handleExchange = () => {
    setPopUpResponse("Success");
    handlePurchase();
    closePopUp();
  };

  const handleCancel = () => {
    setPopUpResponse("Fail");
  };

  const handleClose = () => {
    closePopUp();
  };

  let content = <></>;

  if (popUpResponse === "Success") {
    content = (
      <>
        <Confetti
          style={{ zIndex: "100" }}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="PopUp">
          <div style={{ height: "auto" }} className="PopUpDialog">
            <div className="GeneralButtonContainer">
              <img
                src={diamond}
                style={{ height: "130px", paddingTop: "20px" }}
              ></img>

              <p className="subTitlePopUpReward">
                Tu premio ha sido canjeado correctamente.
              </p>

              <p
                style={{
                  fontWeight: "400",
                  margin: "0px",
                  marginBottom: "20px",
                }}
                className="subTitlePopUpReward"
              >
                Disfruta de tus recompensas, no te olvides de revisar la bandeja
                de entrada de tu correo electrónico registrado.
              </p>

              <button
                style={{}}
                className="GeneralButton4"
                onClick={handleClose}
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

  if (popUpResponse === "Fail") {
    content = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              Lo sentimos, este premio se encuentra agotado.
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              Aun tenemos muchísimos premios para ti.
            </p>

            <button className="GeneralButton4" onClick={handleClose}>
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
      {popUpResponse === null ? (
        <div className="PopUp">
          <div style={{ height: "75%" }} className="PopUpDialog">
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
              className="GeneralButtonContainer"
            >
              <p
                style={{
                  padding: "0px",
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "10px",
                  color: "#0B204F",
                }}
                className="challengesPage-Title"
              >
                {currentReward.name}
              </p>
              <div>
                <div className="popUpOutline" style={{borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px"}}>
                  <p className="RewardsPopUpText">
                    {" "}
                    Tus diamantes disponibles:
                  </p>
                  <div style={{ paddingLeft: "5px" }} className="rowAlign">
                    <img src={diamond} alt="diamondLogo"></img>
                    <p
                      style={{ marginBottom: "0px", paddingLeft: "10px" }}
                      className="challengesPage-Title"
                    >
                      {`${UserData.current.user.related.diamonds} DIAMANTES`}
                    </p>
                  </div>
                </div>

                <div className="popUpOutline" style={{borderTopLeftRadius:" 0px",  borderTopRightRadius: "0px"}}>
                  <p className="RewardsPopUpText"> Costo:</p>
                  <div style={{ paddingLeft: "5px" }} className="rowAlign">
                    <img src={diamond} alt="diamondLogo"></img>
                    <p
                      style={{ marginBottom: "0px", paddingLeft: "10px" }}
                      className="challengesPage-Title"
                    >
                      {`${currentReward.price} DIAMANTES`}
                    </p>
                  </div>
                </div>

                <div className="popUpOutline">
                  <p className="RewardsPopUpText">
                    {" "}
                    Diamantes después de la compra:
                  </p>
                  <div style={{ paddingLeft: "5px" }} className="rowAlign">
                    <img src={diamond} alt="diamondLogo"></img>
                    <p
                      style={{ marginBottom: "0px", paddingLeft: "10px" }}
                      className="challengesPage-Title"
                    >
                      {`${((UserData.current.user.related.diamonds - currentReward.price) <= 0) ? 0 : UserData.current.user.related.diamonds - currentReward.price} DIAMANTES`}
                    </p>
                  </div>
                  <p className="RewardsDisclaimerText">
                    Se enviará un comprobante e instrucciones de canje al correo
                    electrónico registrado.
                  </p>
                </div>
              </div>

              <div style={{paddingBottom: "15px"}}>
                <button
                  style={{ height: "55px", width:"80%" }}
                  className="GeneralButton4"
                  onClick={handleExchange}
                >
                  Canjear
                </button>
                <div style={{ height: "15px" }}></div>

                <button
                  style={{ height: "55px", width:"80%" }}
                  className="GeneralButton1"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{content}</>
      )}
    </>
  );
}

export default RewardsPopUp;

import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
import InfoToolTip from "../components/InfoTooltip";
import { useRef, useState } from "react";
import testImage from "../assets/Grupo 560@2x.png";
import RewardsPopUp from "../components/RewardsPopUp";
import RewardInfoBox from "../components/RewardInfoBox";

function RewardPage({ returnPage, ConfirmPage }) {
  const [rotated, setRotated] = useState(false);
  const [showPopUp, setShowPopUp] = useState(true);
  const textRef = useRef(null);

  const handleClick = () => {
    setRotated((prev) => !prev);
    if (textRef.current !== null) {
      textRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handleReturn = () => {
    returnPage();
  };

  const handleParticipation = () => {
    setShowPopUp(true);
  };

  return (
    <>
      {showPopUp ? (
        <RewardsPopUp closePopUp={handleClosePopUp}></RewardsPopUp>
      ) : (
        <></>
      )}

      <div className="subPageContainer">
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

          <div className="challenge-image-container">
            <img
              className="challenge-image-container"
              src={testImage}
              alt="Challenge illustrative reference"
            />
          </div>
          <p className="challengesPage-Title">Nombre de la recompensa</p>
          <p className="challenge-text">
            Descripción. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s
          </p>
          <div className="informationRewardPageContainer">
            <RewardInfoBox
              text={"Costo en diamantes"}
              ammount={"450"}
              icon={diamond}
            ></RewardInfoBox>

            <div className="challenge-information-container">
              <p
                style={{ paddingTop: "20px", paddingLeft: "20px" }}
                className="challenge-text-title"
              >
                Vigencia
              </p>
              <div className="diamondsContainer">
                <p style={{ color: "#0B204F" , paddingLeft: "15px" }} className="challenge-text">
                  01. 06 a 01.15 del 2025
                </p>
              </div>
            </div>
          </div>

          <div className="informationRewardPageContainer">
            <RewardInfoBox
              text={"Recompensas \n disponibles"}
              ammount={"450"}
              icon={diamond}
              toolTipText={
                "El número máximo \n de veces que puedes  \n canjear este artículo"
              }
            ></RewardInfoBox>

            <RewardInfoBox
              text={"Canjes disponibles"}
              ammount={"1"}
              icon={diamond}
              toolTipText={
                "El número máximo \n de veces que puedes  \n canjear este artículo"
              }
            ></RewardInfoBox>
          </div>

          

          <div
            style={{ justifyContent: "space-between", paddingRight: "3%" }}
            className="rowAlign"
          >
            <p className="challenge-information-text-conditions">Condiciones</p>
            <img
              src={chevronRight}
              alt="enter"
              onClick={handleClick}
              style={{
                transition: "transform 0.3s ease",
                transform: rotated ? "rotate(90deg)" : "rotate(0deg)",
                cursor: "pointer",
              }}
            ></img>
          </div>

          {rotated ? (
            <span className="descriptionText" ref={textRef}>
              Descripción. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s
            </span>
          ) : (
            <></>
          )}

          {/*(challenge.transaction !== null) && <div>
            <p className="challenge-text-title">Estatus</p>
            <p className="challenge-text">{challenge.transaction?.status}</p>
          </div>*/}
          {/*(challenge.transaction !== null && challenge.transaction?.feedback !== "") && <div>
            <p className="challenge-text-title">Feedback</p>
            <p className="challenge-text">{challenge.transaction?.feedback}</p>
          </div>*/}
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
        </div>

        <>
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          <div className="participationContainer">
            <button
              style={{ width: "80%", fontSize: "15px" }}
              className="GeneralButton4"
              onClick={handleParticipation}
            >
              Obtener
            </button>
          </div>
        </>
      </div>
    </>
  );
}

export default RewardPage;

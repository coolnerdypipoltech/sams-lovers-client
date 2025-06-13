import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
import InfoToolTip from "../components/InfoTooltip";
import { useRef, useState, useContext } from "react";
import testImage from "../assets/Grupo 560@2x.png";
import RewardsPopUp from "../components/RewardsPopUp";
import RewardInfoBox from "../components/RewardInfoBox";
import { ElementContextData } from "../context/DataContext";

function RewardPage({ returnPage, handlePurchase, reward }) {
  const { UserData, currentReward } = useContext(ElementContextData);

  const [rotated, setRotated] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
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

  const handleOpenPurchasePopUp = () => {

    if (((UserData.current.user.related.diamonds - currentReward.price) <= 0) ||
      (currentReward.stock <= 0) ||
      (currentReward.total_user_transactions_left <= 0 || currentReward.status !== "ACTIVO")
    ) {
      return;
    }

    setShowPopUp(true);
  };

  const returnDayAndMonth = (_date) => {
    const dateArray = _date.split("-");
    const noTimeDateArray = dateArray[2].split("T");
    return `${noTimeDateArray[0]}.${dateArray[1]}`;
  }
  const returnYear = (_date) => {
    const dateArray = _date.split("-");
    return dateArray[0];
  }

  const isButtonActive = () => {
    if (((UserData.current.user.related.diamonds - currentReward.price) <= 0) ||
      (currentReward.stock <= 0) ||
      (currentReward.total_user_transactions_left <= 0 || currentReward.status !== "ACTIVO")
    ) {
      return false;
    }else{
      return true;
    }
  }

  return (
    <>
      {showPopUp ? (
        <RewardsPopUp closePopUp={handleClosePopUp} handlePurchase={handlePurchase}></RewardsPopUp>
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
              src={reward.image_url !== null || reward.image_url !== "" ? reward.image_url : testImage}
              alt="Challenge illustrative reference"
            />
          </div>
          <p className="challengesPage-Title">{reward.name}</p>
          <p className="challenge-text">
            {reward.description}
          </p>
          <div className="informationRewardPageContainer">
            <RewardInfoBox
              text={"Costo en diamantes"}
              ammount={reward.price}
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
                  {`Vigencia del ${returnDayAndMonth(reward.starts_on)} al ${returnDayAndMonth(reward.ends_on)} del ${returnYear(reward.ends_on)}`}
                </p>
              </div>
            </div>
          </div>

          <div className="informationRewardPageContainer">
            <RewardInfoBox
              text={"Recompensas \n disponibles"}
              ammount={(reward.stock > 0) ? reward.stock : "Agotado"}
              icon={diamond}
              toolTipText={
                "El número máximo \n de veces que puedes  \n canjear este artículo"
              }
            ></RewardInfoBox>

            <RewardInfoBox
              text={"Canjes disponibles"}
              ammount={(reward.total_user_transactions_left > 0) ? reward.total_user_transactions_left : "Agotado" }
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
              {reward.transaction_text}
            </span>
          ) : (
            <></>
          )}
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
        </div>

        <>
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          <div className="participationContainer">
            <button
              style={{ width: "80%", fontSize: "15px" }}
              className={isButtonActive() ? "GeneralButton4" : "GeneralButton4-Inactive"}
              onClick={handleOpenPurchasePopUp}
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

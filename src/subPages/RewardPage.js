import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
import InfoToolTip from "../components/InfoTooltip";
import { useRef, useState } from "react";
import testImage from "../assets/Grupo 560@2x.png"

function RewardPage({ returnPage, ConfirmPage }) {
  const [rotated, setRotated] = useState(false);
  const textRef = useRef(null);

  const handleClick = () => {
    setRotated((prev) => !prev);
    if(textRef.current !== null){
      textRef.current.scrollIntoView({behavior: "smooth"})
    }
  };

  const handleReturn = () => {
    returnPage();
  };

  const handleParticipation = () => {
    ConfirmPage();
  };

  return (
    <>
      <div className="subPageContainer">
        <div style={{ width: "90%" }} className="challenges-subpage-container">
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          <p style={{color: "#3C74F3"}} className="challenge-back-button-text" onClick={handleReturn}>
            Volver
          </p>

          <div className="challenge-image-container">
            <img
              className="challenge-image-container"
              src={testImage}
              alt="Challenge illustrative reference"
            />
          </div>
          <p className="challengesPage-Title">Retos</p>
          <p className="challenge-text">
            Descripción. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s
          </p>
          <div className="informationRewardPageContainer">
            <div className="challenge-information-container">
              <div
                style={{
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  paddingTop: "5px",
                  height: "90px"
                }}
                className="rowAlign"
              >
                <img src={diamond} alt="diamonds"></img>
                <div >
                  <p className="infoText" >Costo en diamantes</p>
                  <div className="diamondsContainer">
                    <p className="challenge-text-information-diamonds">450</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="challenge-information-container">
              <p className="challenge-text-title">Vigencia</p>
              <div className="diamondsContainer">
                <p style={{ paddingLeft: "0px" }} className="challenge-text">
                  2/06/2025
                </p>
              </div>
            </div>
          </div>

          <div className="informationRewardPageContainer">
            <div className="challenge-information-container">
              <div
                style={{
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  paddingTop: "5px",
                  height: "90px"
                }}
                className="rowAlign"
              >
                <img src={diamond} alt="diamonds"></img>
                <div>
                  <p className="infoText">
                    Recompensas disponibles
                  </p>
                  <div className="diamondsContainer">
                    <p className="challenge-text-information-diamonds">50</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-92px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <InfoToolTip dark={true}></InfoToolTip>
              </div>
            </div>

            <div className="challenge-information-container">
              <div
                style={{
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  paddingTop: "5px",
                  height: "90px"
                }}
                className="rowAlign"
              >
                <img src={diamond} alt="diamonds"></img>
                <div>
                  <p className="infoText">Canjes disponible</p>
                  <div className="diamondsContainer">
                    <p className="challenge-text-information-diamonds">1</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-92px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <InfoToolTip dark={true}></InfoToolTip>
              </div>
            </div>
          </div>

          <div style={{ justifyContent: "space-between" }} className="rowAlign">
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
                Descripción. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s 
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
            <p
              style={{ width: "60%" }}
              className="participate-button"
              onClick={handleParticipation}
            >
              Participar
            </p>
          </div>
        </>
      </div>
    </>
  );
}

export default RewardPage;

import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
import RewardInfoBox from "../components/RewardInfoBox";
import { useRef, useState } from "react";
function ChallengePage({ returnPage, challengeParticipationPage, challenge }) {
    const [rotated, setRotated] = useState(false);
    const textRef = useRef(null);
  const handleReturn = () => {
    returnPage();
  };

  const handleClick = () => {
    setRotated((prev) => !prev);
    if (textRef.current !== null) {
      textRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(challenge);

  const handleParticipation = () => {
    challengeParticipationPage();
  };

  return (
    <>
      <div className="subPageContainer">
        <div className="challenges-subpage-container">
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>

          <p className="challenge-back-button-text" onClick={handleReturn}>
            Volver
          </p>

          <div>
            {challenge.image_url === "" ? (
              <div className="challenge-image-container" />
            ) : (
              <img
                className="challenge-image-container"
                src={challenge.image_url}
                alt="Challenge illustrative reference"
              />
            )}
          </div>
          <p style={{ paddingTop: "30px" }} className="challengesPage-Title">
            {challenge.name}
          </p>
          <p style={{ marginBottom: "30px" }} className="challenge-text">
            Descripción: {challenge.description}
          </p>

          <div style={{paddingBottom: "10px"}} className="challenge-information-container">
            <p
              style={{ paddingTop: "20px", paddingLeft: "20px" }}
              className="challenge-text-title"
            >
              Costo en diamantes
            </p>
            <div className="diamondsContainer">
              
              
              <div className="rowAlign" style={{paddingLeft: "15px"}}>
                <img src={diamond} alt="diamondLogo"></img>
                <p
                style={{  paddingLeft: "15px" }}
                className="challenge-text-information-diamonds"
              >
                {challenge.diamonds}
              </p>
              </div>
            </div>
          </div>
            <div style={{height: "15px", minHeight: "15px"}} ></div>
          <div className="challenge-information-container">
            <p
              style={{ paddingTop: "20px", paddingLeft: "20px" }}
              className="challenge-text-title"
            >
              Vigencia
            </p>
            <div className="diamondsContainer">
              <p
                style={{ color: "#0B204F", paddingLeft: "15px" }}
                className="challenge-text"
              >
                {challenge.ends_on}
              </p>
            </div>
          </div>

          <div style={{ justifyContent: "space-between", paddingTop: "15px" }} className="rowAlign">
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

          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
        </div>

        {((challenge.transaction === null &&
          challenge.status_challenge !== "TERMINADO") ||
          (challenge.transaction?.status === "SUBMITTED" &&
            challenge.status_challenge !== "TERMINADO")) && (
          <>
            <div className="headerSpacer"></div>
            <div className="headerSpacer"></div>
            <div style={{alignItems: "center"}} className="participationContainer">
              <p
                style={{ width: "60%", margin: "0px" }}
                className="participate-button"
                onClick={handleParticipation}
              >
                Participar
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChallengePage;

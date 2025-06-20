import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
import RewardInfoBox from "../components/RewardInfoBox";
import completedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Aceptado.svg";
import inReviewStatusLogo from "../assets/challenge-rewards-Icons/Icon_Espera.svg";
import rejectedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Rechazado.svg";
import { useContext, useRef, useState } from "react";
import InfoTooltip from "../components/InfoTooltip";
import { formatDate } from "../hooks/dateHandler";
import { ElementContextData } from "../context/DataContext";
function ChallengePage({ returnPage, challengeParticipationPage }) {

  const { currentChallenge } = useContext(ElementContextData);

  const challenge = currentChallenge;
  console.log("---------", challenge);

  const [rotated, setRotated] = useState(false);
  const textRef = useRef(null);

  let dateTextColor = useRef("");
  if(challenge.status_challenge !== "TERMINADO") {
    dateTextColor.current = "#0B204F";
  }else{
    dateTextColor.current = "#E81F7D";
  }

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

            {
              challenge.transaction != null && (<>
          {challenge.transaction.status === "SUBMITTED" && (
            <>
              <div
                style={{
                  width: "99%",
                  height: "0px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ paddingTop: "1px" }}>
                  <InfoTooltip dark={true}></InfoTooltip>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FFEFC3" }}
                className="challenge-information-container"
              >
                <div
                  style={{ height: "72px", paddingLeft: "20px" }}
                  className="rowAlign"
                >
                  <img
                    src={inReviewStatusLogo}
                    style={{ height: "32px" }}
                    alt="logo"
                  ></img>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingLeft: "10px",
                      color: "#003087",
                    }}
                    className="challenge-text-title"
                  >
                    En revisión
                  </p>
                </div>
              </div>
              <div style={{ height: "15px", minHeight: "15px" }}></div>
            </>
          )}

          {challenge.transaction.status === "APPROVED" && (
            <>
              <div
                style={{
                  width: "99%",
                  height: "0px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ paddingTop: "1px" }}>
                  <InfoTooltip dark={true}></InfoTooltip>
                </div>
              </div>
              <div
                style={{ backgroundColor: "##ccffc3" }}
                className="challenge-information-container"
              >
                <div
                  style={{ height: "72px", paddingLeft: "20px" }}
                  className="rowAlign"
                >
                  <img
                    src={completedStatusLogo}
                    style={{ height: "32px" }}
                    alt="logo"
                  ></img>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingLeft: "10px",
                      color: "#003087",
                    }}
                    className="challenge-text-title"
                  >
                    Aprobado
                  </p>
                </div>
              </div>
              <div style={{ height: "15px", minHeight: "15px" }}></div>
            </>
          )}

          {challenge.transaction.status === "REJECTED" && (
            <>
              <div
                style={{
                  width: "99%",
                  height: "0px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ paddingTop: "1px" }}>
                  <InfoTooltip dark={true}></InfoTooltip>
                </div>
              </div>
              <div
                style={{ backgroundColor: "##ffc4c3" }}
                className="challenge-information-container"
              >
                <div
                  style={{ height: "72px", paddingLeft: "20px" }}
                  className="rowAlign"
                >
                  <img
                    src={rejectedStatusLogo}
                    style={{ height: "32px" }}
                    alt="logo"
                  ></img>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingLeft: "10px",
                      color: "#003087",
                    }}
                    className="challenge-text-title"
                  >
                    Rechazado
                  </p>
                </div>
              </div>
              <div style={{ height: "15px", minHeight: "15px" }}></div>
            </>
          )}
              </>)
            }


          <div
            style={{ paddingBottom: "10px" }}
            className="challenge-information-container"
          >
            <p
              style={{ paddingTop: "20px", paddingLeft: "20px" }}
              className="challenge-text-title"
            >
              Costo en diamantes
            </p>
            <div className="diamondsContainer">
              <div className="rowAlign" style={{ paddingLeft: "15px" }}>
                <img src={diamond} alt="diamondLogo"></img>
                <p
                  style={{ paddingLeft: "15px" }}
                  className="challenge-text-information-diamonds"
                >
                  {challenge.diamonds}
                </p>
              </div>
            </div>
          </div>
          <div style={{ height: "15px", minHeight: "15px" }}></div>
          <div className="challenge-information-container">
            <p
              style={{ paddingTop: "20px", paddingLeft: "20px" }}
              className="challenge-text-title"
            >
              Vigencia
            </p>
            <div className="diamondsContainer">
              <p
                style={{ color: dateTextColor.current, paddingLeft: "15px" }}
                className="challenge-text"
              >
                {(challenge.status_challenge !== "TERMINADO") ? formatDate(challenge.starts_on, challenge.ends_on) : "Terminado"}
              </p>
            </div>
          </div>

          <div
            style={{ justifyContent: "space-between", paddingTop: "15px" }}
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

          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
        </div>

        {((challenge.transaction === null &&
          challenge.status_challenge === "ACTIVO") ||
          (challenge.transaction?.status === "SUBMITTED" &&
            challenge.status_challenge === "ACTIVO")) && (
          <>
            <div className="headerSpacer"></div>
            <div className="headerSpacer"></div>
            <div
              style={{ alignItems: "center" }}
              className="participationContainer"
            >
              {challenge.transaction?.status === "SUBMITTED" ? (
                <p
                  style={{ width: "60%", margin: "0px" }}
                  className="participate-button"
                  onClick={handleParticipation}
                >
                  Volver a subir URL
                </p>
              ) : (
                <p
                  style={{ width: "60%", margin: "0px" }}
                  className="participate-button"
                  onClick={handleParticipation}
                >
                  Participar
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChallengePage;

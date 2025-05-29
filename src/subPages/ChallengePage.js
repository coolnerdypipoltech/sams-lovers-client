import diamond from "../assets/diamond.svg";
import chevronRight from "../assets/chevronRightBlack.svg";
function ChallengePage({ returnPage, challengeParticipationPage, challenge }) {
  const handleReturn = () => {
    returnPage();
  };

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

          <div className="challenge-image-container">
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
          <p className="challenge-text">Descripción. {challenge.description}</p>

          <div className="challenge-information-container">
            <p className="challenge-information-text-title">
              Costo en diamantes
            </p>
            <div className="diamondsContainer">
              <div className="rowAlign">
                <img src={diamond} alt="diamonds"></img>
                <p className="challenge-text-information-diamonds">
                  {challenge.diamonds}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="challenge-text-title">Vigencia</p>
            <p className="challenge-text">{challenge.end_date}</p>
          </div>
          <div style={{ justifyContent: "space-between" }} className="rowAlign">
            <p className="challenge-information-text-conditions">Condiciones</p>
            <img src={chevronRight} alt="enter"></img>
          </div>

          {/*(challenge.transaction !== null) && <div>
            <p className="challenge-text-title">Estatus</p>
            <p className="challenge-text">{challenge.transaction?.status}</p>
          </div>}
          {(challenge.transaction !== null && challenge.transaction?.feedback !== "") && <div>
            <p className="challenge-text-title">Feedback</p>
            <p className="challenge-text">{challenge.transaction?.feedback}</p>
          </div>*/}
        </div>

        {(challenge.transaction === null ||
          challenge.transaction?.status === "in_review") && (
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
        )}
      </div>
    </>
  );
}

export default ChallengePage;

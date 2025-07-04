import bell from "../assets/Trazado 905.svg";
import InfoTooltip from "../components/InfoTooltip";

function ChallengeParticipationPage({
  handleReturn,
  handleParticipation,
  challenge,
  handleOnChangeInput,
}) {
  return (
    <>
      <div style={{ overflowY: "scroll" }} className="subPageContainer">
        <div className="challenges-subpage-container">
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          <p onClick={handleReturn} className="challenge-back-button-text">
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
          <p style={{ paddingTop: "30px", marginBottom: "30px" }} className="challengesPage-Title">
            {challenge.name}
          </p>
          <div
            style={{
              height: "0px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ paddingTop: "5px" }}>
              <InfoTooltip
                text={
                  "Busca, copia y pega \nel link del video que \nrealizaste para el reto."
                }
                dark={true}
              ></InfoTooltip>
            </div>
          </div>
          <div
            style={{ padding: "10px", width: "auto", paddingBottom:"20px" }}
            className="challenge-information-container"
          >
            <div
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="challenge-information-text-title">URL</p>
              <input
                className="url-input"
                placeholder={
                  challenge.transaction !== null &&
                  challenge.transaction?.url !== ""
                    ? challenge.transaction?.url
                    : "https://www.facebook/susana.com"
                }
                type="url"
                onChange={(e) => handleOnChangeInput(e.target.value)}
              ></input>
            </div>
          </div>
          <div style={{ minHeight: "20px" }}></div>

          <div
            style={{
              padding: "10px",
              height: "auto",
              paddingTop: "30px",
              paddingBottom: "30px",
              width: "auto"
            }}
            className="challenge-information-container"
          >
            <img
              src={bell}
              alt="bell"
              style={{ height: "26px", paddingBottom: "15px" }}
            ></img>
            <p className="participation-information-text">
              Tu video será revisado, si es aprobado obtendrás los diamantes y
              aparecerá como completado en la sección de retos.
            </p>
            <p className="participation-information-text">
              Recuerda que tu cuenta debe estar pública para que se pueda ver tu
              video.
            </p>
          </div>
          <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          {/*<div>
          <p className="challenge-text-title">Estatus</p>
          <p className="challenge-text">{challenge.transaction?.status}</p>
        </div>*/}
            
           
        </div>
        
      </div>

      {((challenge.transaction === null &&
        challenge.status_challenge !== "TERMINADO") ||
        (challenge.transaction?.status === "SUBMITTED" &&
          challenge.status_challenge !== "TERMINADO")) && (
        <div className="participationContainer">
          <button
            style={{ width: "60%" }}
            className="GeneralButton4"
            onClick={handleParticipation}
          >
            Enviar
          </button>
        </div>
      )}
      
    </>
  );
}

export default ChallengeParticipationPage;

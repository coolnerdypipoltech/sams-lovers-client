function ChallengeParticipationPage({ handleReturn, handleParticipation, challenge, handleOnChangeInput }) {
  return (
    <div className="subPageContainer">
      <div className="confirmation-subpage-container">
        <p onClick={handleReturn} className="challenge-back-button-text">Volver</p>
        <div className="challenge-image-container">
          {(challenge.image_url === "") ? (
            <div className="challenge-image-container"/>
          ) : (
            <img className="challenge-image-container" src={challenge.image_url} alt="Challenge illustrative reference"/>
          )}
        </div>
        <p className="challenge-title">{challenge.name}</p>
        <p className="challenge-text">Intrucciones. {challenge.instructions}</p>
        <div className="challenge-information-container">
          <p className="challenge-information-text-title">URL</p>
          <input className="url-input" placeholder={((challenge.transaction !== null) && (challenge.transaction?.url !== "")) ? challenge.transaction?.url : "https://www.facebook/susana.com"} type="url" onChange={e => handleOnChangeInput(e.target.value)}></input>
        </div>
        <div className="participation-information-holder">
          <p className="participation-information-text">
            Tu video será revisado, si es aprobado obtendrás los diamantes y aparecerá como completado en la sección de retos.
          </p>
          <p className="participation-information-text">
            Recuerda que tu cuenta debe estar pública para que se pueda ver tu video.
          </p>
        </div>
        {/*<div>
          <p className="challenge-text-title">Estatus</p>
          <p className="challenge-text">{challenge.transaction?.status}</p>
        </div>*/}
        {
          ((challenge.transaction === null && challenge.status_challenge !== "TERMINADO") || (challenge.transaction?.status === "SUBMITTED" && challenge.status_challenge !== "TERMINADO")) &&
            <p className="participate-button" onClick={handleParticipation}>Participar</p>
        }
      </div>
    </div>
  );
}

export default ChallengeParticipationPage;

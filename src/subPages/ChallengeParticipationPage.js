function ChallengeParticipationPage({ returnPage, participation, challenge }) {

  const handleReturn =  () =>{
    returnPage()
  }

  const handleParticipation = () =>{
    participation();
  }

  return (
    <div className="subPageContainer">
      <div className="confirmation-subpage-container">
        <p onClick={handleReturn} className="articleText">Volver</p>
        <div className="row">
          <p className="challenge-title">{challenge.name}</p>
        </div>
        <div className="challenge-image-container">
          <img className="challenge-image-container" src={challenge.image_url} alt="Challenge illustrative reference"></img>
        </div>
        <p className="challenge-text">Intrucciones. {challenge.instructions}</p>
        <div>
          <div className="row">
            <p className="url-title">URL</p>
          </div>
          <input className="url-input"></input>
        </div>
        <p className="challenge-text">
          Tu video será revisado, si es aprobado obtendrás los diamantes y <br/>
          aparecerá como completado en la sección de retos.
        </p>
        <div>
          <p className="challenge-text-title">Estatus</p>
          <p className="challenge-text">{challenge.transaction?.status}</p>
        </div>
        <div>
          <p className="challenge-text-title">Feedback</p>
          <p className="challenge-text">{challenge.transaction?.feedback}</p>
        </div>
        <p className="participate-button" onClick={handleParticipation}>PARTICIPAR</p>
        <p className="challenge-text">
          Recuerda que tu cuenta debe estar pública para que se pueda ver tu video.
        </p>
      </div>
    </div>
  );
}

export default ChallengeParticipationPage;

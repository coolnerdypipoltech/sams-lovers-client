function ChallengePage({returnPage, challengeParticipationPage, challenge}) {

  const handleReturn =  () =>{
    returnPage()
  }

  const handleParticipation =  () =>{
    challengeParticipationPage()
  }

    return (
    <>
      <div className="subPageContainer">
        <div className="challenges-subpage-container">
          <p className="challenge-back-button-text" onClick={handleReturn}>Volver</p>
          <div className="challenge-image-container">
          {(challenge.image_url === "") ? (
            <div className="challenge-image-container"/>
          ) : (
            <img className="challenge-image-container" src={challenge.image_url} alt="Challenge illustrative reference"/>
          )}
          </div>
          <p className="challenge-title">{challenge.name}</p>
          <p className="challenge-text">Descripción. {challenge.description}</p>
          <div className="challenge-information-container">
            <p className="challenge-information-text-title">Diamantes por particpar</p>
            <p className="challenge-text-information">{challenge.diamonds}</p>
          </div>
          <div className="challenge-information-container">
            <p className="challenge-information-text-title">Vigencia</p>
            <p className="challenge-text-information">{challenge.end_date}</p>
          </div>
          <div className="challenge-information-container">
            <p className="challenge-information-text-title">Condiciones</p>
            <p className="challenge-text-information">{challenge.conditions}</p>
          </div>
          {/*(challenge.transaction !== null) && <div>
            <p className="challenge-text-title">Estatus</p>
            <p className="challenge-text">{challenge.transaction?.status}</p>
          </div>*/}
          {/*(challenge.transaction !== null && challenge.transaction?.feedback !== "") && <div>
            <p className="challenge-text-title">Feedback</p>
            <p className="challenge-text">{challenge.transaction?.feedback}</p>
          </div>*/}
          {((challenge.transaction === null) || challenge.transaction?.status === "in_review" ) && <p className="participate-button" onClick={handleParticipation}>Participar</p>}
        </div>
      </div>
    </>
  );
}

export default ChallengePage;

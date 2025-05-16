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
          <p onClick={handleReturn} className="articleText">Volver</p>
          <div className="row">
            <p className="challenge-title">{challenge.name}</p>
          </div>
          <div className="challenge-image-container">
            <img className="challenge-image-container" src={challenge.image_url} alt="Challenge illustrative reference"></img>
          </div>
          <p className="challenge-text">Descripción. {challenge.description}</p>
          <div>
            <p className="challenge-text-title">Diamantes por particpar</p>
            <p className="challenge-text">{challenge.diamonds}</p>
          </div>
          <div>
            <p className="challenge-text-title">Vigencia</p>
            <p className="challenge-text">{challenge.end_date}</p>
          </div>
          <div>
            <p className="challenge-text-title">Condiciones</p>
            <p className="challenge-text">{challenge.conditions}</p>
          </div>
          <div>
            <p className="challenge-text-title">Estatus</p>
            <p className="challenge-text">{challenge.transaction?.status}</p>
          </div>
          {((challenge.transaction === null) || challenge.transaction?.status === "in_review" ) && <p className="participate-button" onClick={handleParticipation}>PARTICIPAR</p>}
        </div>
      </div>
    </>
  );
}

export default ChallengePage;

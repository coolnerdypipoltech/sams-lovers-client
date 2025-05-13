function ChallengeParticipationPage({ returnPage, participation, challenge }) {

  const handleReturn =  () =>{
    returnPage()
  }

  const handleParticipation = () =>{
    participation();
  }

return (
    <div className="subPageContainer">
      <div className="confirmationSubpageContainer">

          <div className="ArticleItem">
            <p className="articleTitle">{challenge.name}]</p>
            <img className="challengeImageContainer" src={challenge.image_url} alt="challenge illustrative reference"/>
          </div>


          <p className="arrticleText">{challenge.instructions}</p>
          <input placeholder="URL"></input>
          <p className="arrticleText">{challenge.diamonds}</p>
          <br />
          <p>
            Tu video será revisado, si es aprobado obtendrás los diamantes y <br/>
            aparecerá como completado en la sección de retos.
          </p>
          <br />
          <p classNAme="challengeStatus">{challenge.transaction?.status}</p>
          <br />
          <p>Feedback:</p>


          <div className="RewardButtonsContainer">
            <p onClick={handleReturn} className="ParticipateText">CANCELAR</p>
            <p onClick={handleParticipation} className="ParticipateText">PARTICIPAR</p>
          </div>

        </div>
    </div>
  );
}

export default ChallengeParticipationPage;

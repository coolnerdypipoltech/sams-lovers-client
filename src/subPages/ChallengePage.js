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
        <div className="rewardsSubpageContainer">
          <p onClick={handleReturn} className="articleText">Volver</p>

          <div className="ArticleItem">
            <p className="articleTitle">{challenge.name}</p>
            <img className="challengeImageContainer" src={challenge.image_url} alt="challenge illustrative reference"/>
          </div>

          <div className="articleImageContainer"></div>
          <p className="arrticleText">{challenge.description}</p>
          <p className="arrticleText">{challenge.diamonds}</p>
          <p className="arrticleText">{challenge.end_date}</p>
          <p className="arrticleText">{challenge.conditions}</p>
          <p classNAme="challengeStatus">{challenge.transaction?.status}</p>

          <p onClick={handleParticipation} className="ParticipateText">PARTICIPAR</p>
        </div>
      </div>
    </>
  );
}

export default ChallengePage;

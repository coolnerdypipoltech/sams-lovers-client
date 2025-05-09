function ChallengeParticipationPage({ data, setSubPage }) {
  const participateOnChallenge = (e) => {};

  return (
    <div className="subPageContainer">
      <button className="listItemTitle" onClick={() => setSubPage("")}>
        Volver
      </button>
      <img className="challengeImageContainer" src={data.image_url} />
      <div>
        <p className="challengeTitle">{data.instructions}</p>
        <input placeholder="URL"></input>
        <p className="challengeDiamonds">Diamantes: {data.diamonds}</p>
        <p>
          Tu video será revisado, si es aprobado obtendrás los diamantes y
          aparecerá como completado en la sección de retos.
        </p>
        <p classNAme="challengeStatus">
          STATUS: {data.transaction?.status || "pending"}
        </p>
        <p>Feedback: {data.transaction?.feedback}</p>
        <button className="listItemTitle" onClick={participateOnChallenge}>
          Participar
        </button>
      </div>
    </div>
  );
}

export default ChallengeParticipationPage;

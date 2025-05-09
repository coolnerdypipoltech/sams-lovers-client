function ChallengePage({ data, setSubPage }) {
  return (
    <div className="subPageContainer">
      <button className="listItemTitle" onClick={() => setSubPage("")}>
        Volver
      </button>
      <img className="challengeImageContainer" src={data.image_url} />
      <div>
        <p className="challengeTitle">Nombre: {data.name}</p>
        <p className="challengeDiamonds">Diamantes: {data.diamonds}</p>
        <p classNAme="challengeStatus">
          STATUS: {data.transaction?.status || "pending"}
        </p>
        <button
          className="listItemTitle"
          onClick={() => setSubPage("ChallengeParticipation")}
        >
          Participar
        </button>
      </div>
    </div>
  );
}

export default ChallengePage;

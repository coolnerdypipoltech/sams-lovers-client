function ChallengeListItem({data}) {
    return (
      <>
        <div className="listItem">
            <img className="imageContainer" src={data.image_url}/>
            <div>
              <p className="listItemTitle">Nombre: {data.name}</p>
              <p className="listItemSubtitle">Diamantes: {data.diamonds}</p>
              <p classNAme="challengeStatus">STATUS: {data.transaction?.status || "pending"}</p>
            </div>
          </div>
      </>
    );
  }

  export default ChallengeListItem;
function ChallengeListItem({challenge}){
  return (
    <>
      <div className="listItem">
          <div className="imageContainer">
            <img className="imageContainer" src={challenge.image_url} alt="Challenge illustrative reference"></img>
          </div>
          <div>
            <p className="listItemTitle">{challenge.name}</p>
            <p className="listItemSubtitle">{challenge.diamonds}</p>
            <p className="listItemSubtitle">{challenge.transaction?.status}</p>
          </div>
        </div>
    </>
  );
}

export default ChallengeListItem;

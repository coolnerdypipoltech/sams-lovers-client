function ChallengeListItem({key, challenge}){
  return (
    <>
      <div className="listItem">
          <div className="imageContainer"></div>
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

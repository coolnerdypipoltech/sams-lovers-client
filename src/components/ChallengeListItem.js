import completedStatusLogo from "../assets/hamburger_icon_white.png"
import inReviewStatusLogo from "../assets/hamburger_icon_white.png"
import rejectedStatusLogo from "../assets/hamburger_icon_white.png"

const getStatusIcon = (status) => {
  switch(status) {
    default:
      return null;
    case "completed":
      return completedStatusLogo;
    case "in_review":
      return inReviewStatusLogo;
    case "rejected":
      return rejectedStatusLogo;
  }

}

const getStatusBackgroundColor = (status) => {
  switch(status) {
    default:
      return "";
    case "completed":
      return "green";
    case "in_review":
      return "yellow";
    case "rejected":
      return "red";
  }

}

function ChallengeListItem({challenge}){
  return (
    <>
      {(getStatusIcon(challenge.transaction?.status) !== null) && (
          <div className="list-item-status-container" style={{backgroundColor: getStatusBackgroundColor(challenge.transaction?.status)}}>
            {<img className="status-icon" src={getStatusIcon(challenge.transaction?.status)} alt="Transaction status icon"/>}
          </div>
        )}
      <div className="listItem">
        {(challenge.image_url === "") ? (
          <div className="imageContainer"/>
        ) : (
          <img className="imageContainer" src={challenge.image_url} alt="Challenge illustrative reference"/>
        )}
        <div className="listItemTextContainer">
          <p className="listItemTitle">{challenge.name}</p>
          <p className="listItemSubtitle">{challenge.diamonds}</p>
        </div>
      </div>
    </>
  );
}

export default ChallengeListItem;

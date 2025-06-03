import completedStatusLogo from "../assets/Icon_menu.svg"
import inReviewStatusLogo from "../assets/Icon_menu.svg"
import rejectedStatusLogo from "../assets/Icon_menu.svg"
import challengeOverStatusLogo from "../assets/Icon_menu.svg"

const getStatusIcon = (status) => {
  switch(status) {
    case "APPROVED":
      return completedStatusLogo;
    case "SUBMITTED":
      return inReviewStatusLogo;
    case "REJECTED":
      return rejectedStatusLogo;
    case "TERMINADO":
      return challengeOverStatusLogo;
    default:
      return null;
  }

}

const getStatusBackgroundColor = (status) => {
  switch(status) {
    case "APPROVED":
      return "green";
    case "SUBMITTED":
      return "yellow";
    case "REJECTED":
      return "red";
    case "TERMINADO":
      return "gray";
    default:
      return "";
  }
}

function ChallengeListItem({challenge}){
  return (
    <>
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
        {(getStatusIcon(challenge.transaction?.status) !== null) ?
          (
            <div className="list-item-status-container" style={{backgroundColor: getStatusBackgroundColor(challenge.transaction?.status)}}>
              {<img className="status-icon" src={getStatusIcon(challenge.transaction?.status)} alt="Transaction status icon"/>}
            </div>
          ) : (challenge.status_challenge === "TERMINADO") &&
            <div className="list-item-status-container" style={{backgroundColor: getStatusBackgroundColor(challenge.status_challenge)}}>
              {<img className="status-icon" src={getStatusIcon(challenge.status_challenge )} alt="Transaction status icon"/>}
            </div>
        }
      </div>
    </>
  );
}

export default ChallengeListItem;

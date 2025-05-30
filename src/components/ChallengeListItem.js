import completedStatusLogo from "../assets/Icon_menu.svg"
import inReviewStatusLogo from "../assets/Icon_menu.svg"
import rejectedStatusLogo from "../assets/Icon_menu.svg"

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
        {(getStatusIcon(challenge.transaction?.status) !== null) && (
          <div className="list-item-status-container" style={{backgroundColor: getStatusBackgroundColor(challenge.transaction?.status)}}>
            {<img className="status-icon" src={getStatusIcon(challenge.transaction?.status)} alt="Transaction status icon"/>}
          </div>
        )}
      </div>
    </>
  );
}

export default ChallengeListItem;

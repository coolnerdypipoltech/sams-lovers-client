import completedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Aceptado.svg"
import inReviewStatusLogo from "../assets/challenge-rewards-Icons/Icon_Espera.svg"
import rejectedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Rechazado.svg"
import timeout from "../assets/challenge-rewards-Icons/Icon_Rechazado (1).svg"
import diamond from "../assets/diamond.svg";
const getStatusIcon = (status) => {
  switch(status) {
    default:
      return null;
    case "APPROVED":
      return completedStatusLogo;
    case "SUBMITTED":
      return inReviewStatusLogo;
    case "REJECTED":
      return rejectedStatusLogo;
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
          <div className="rowAlign">
            <img src={diamond} className="diamondLogo" alt="diamonds"></img>
            <p className="listItemSubtitle">{challenge.diamonds} Diamantes</p>
          </div>
          
        </div>
        {(getStatusIcon(challenge.transaction?.status) !== null) ?
          (
            <div className="status-icon">
              <img  src={getStatusIcon(challenge.transaction?.status)} alt="Transaction status icon"/>
            </div>
          ) : (challenge.status_challenge === "TERMINADO") &&
            <div className="status-icon">
              {<img src={timeout} alt="Transaction status icon"/>}
            </div>

           

            
        }
      </div>
    </>
  );
}

export default ChallengeListItem;

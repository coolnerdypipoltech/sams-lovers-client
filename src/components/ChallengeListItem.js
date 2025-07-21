import completedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Aceptado.svg"
import inReviewStatusLogo from "../assets/challenge-rewards-Icons/Icon_Espera.svg"
import rejectedStatusLogo from "../assets/challenge-rewards-Icons/Icon_Rechazado.svg"
import timeout from "../assets/challenge-rewards-Icons/Icon_Rechazado_1.svg"
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

const truncateByScreenWidth = (str) => {
  const width = window.innerWidth;
  let maxLength = str.length;

  if (width <= 350) maxLength = 13;
  else if (width <= 400) maxLength = 30;
  else if (width <= 450) maxLength = 33;
  else if (width <= 500) maxLength = 36;
  else if (width <= 600) maxLength = 56;
  else if (width <= 800) maxLength = 100;

  if (str.length > maxLength) {
    let sliced = str.slice(0, maxLength);
    if (sliced.endsWith(' ')) {
      sliced = sliced.slice(0, -1);
    }
    return sliced + '...';
  }

  return str;
}

function ChallengeListItem({challenge}){

  return (
    <>

      <div className="listItem" style={{gap: "0px"}}>
        {(challenge.image_url === "") ? (
          <div className="imageContainer"/>
        ) : (
          <img className="imageContainer" src={challenge.image_url} alt="Challenge illustrative reference"/>
        )}
        <div className="listItemTextContainer">
          <p className="listItemTitle">{truncateByScreenWidth(challenge.name) }</p>
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

import testImage from "../assets/Grupo 560@2x.png";
import diamond from "../assets/diamond.svg";
import { formatOneDate } from "../hooks/dateHandler";

const truncateByScreenWidth = (str) => {
  const width = window.innerWidth;
  let maxLength = str.length;

  if (width <= 350) maxLength = 22;
  else if (width <= 370) maxLength = 26;
  else if (width <= 390) maxLength = 28;
  else if (width <= 410) maxLength = 31;
  else if (width <= 450) maxLength = 33;
  else if (width <= 500) maxLength = 38;
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

function MyRewardsListItem({ reward, userTransaction }) {
  let imageHandler = testImage;
  if (reward.image_url !== null && reward.image_url !== "") {
    imageHandler = reward.image_url;
  }

  return (
    <>
      <div className="listItem">
        <div>
          <img
            className="imageContainer"
            src={imageHandler}
            alt="Challenge illustrative reference"
          />
        </div>
        <div style={{width: "100%"}}  className="listItemContainer">
          <div>
            <p style={{width: "96%"}} className="listItemTitle">{truncateByScreenWidth(reward.name)}</p>
          </div>
          <div  style={{justifyContent: "space-between", width: "100%"}} className="rowAlign">
          <div className="rowAlign">
            <p
              style={{ color: "#0B204F" }}
              className="listItemSubtitle"
            >{`${formatOneDate(userTransaction.created_at)}`}</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRewardsListItem;

import testImage from "../assets/Grupo 560@2x.png";
import diamond from "../assets/diamond.svg";
import { formatOneDate } from "../hooks/dateHandler";

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
            <p style={{width: "90%"}} className="listItemTitle">{reward.name}</p>
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

import testImage from "../assets/Grupo 560@2x.png"
import diamond from "../assets/diamond.svg";
import { formatOneDate } from "../hooks/dateHandler";

function MyRewardsListItem({reward, userTransaction}) {

  let imageHandler = testImage
  if(reward.image_url !== null && reward.image_url !== ""){
    imageHandler = reward.image_url
  }

  return (
    <>
      <div className="listItem">
          <div >
             <img
              className="imageContainer"
              src={imageHandler}
              alt="Challenge illustrative reference"
            />
          </div>
          <div className="listItemContainer">
            <div>
              <p className="listItemTitle">{reward.name}</p>
            <p className="listItemTitle">{reward.stock > 0 ? "En tienda" : "No disponible"}</p>
            </div>
            <div className="rowAlign">
            <p style={{color: "#0B204F"}} className="listItemSubtitle">{`${formatOneDate(userTransaction.created_at)}`}</p>
            </div>

          </div>
        </div>
    </>
  );
}

export default MyRewardsListItem;
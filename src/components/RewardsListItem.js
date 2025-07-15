import testImage from "../assets/Grupo 560@2x.png";
import diamond from "../assets/diamond.svg";

function ListItem({ reward }) {
  return (
    <>
      <div className="listItem">
        <div>
          <img
            className="imageContainer"
            src={
              reward.image_url !== null || reward.image_url !== ""
                ? reward.image_url
                : testImage
            }
            alt="Challenge illustrative reference"
          />
        </div>
        <div style={{width: "100%"}} className="listItemContainer">
          <div>
            <p style={{width: "90%"}}  className="listItemTitle">{reward.name}</p>
          </div>
          <div style={{justifyContent: "space-between", width: "100%"}} className="rowAlign">
            <div className="rowAlign">
              <img
                src={diamond}
                style={{ height: "17px" }}
                alt="diamonds"
              ></img>
              <p className="listItemSubtitle">{`${reward.price} Diamantes`}</p>
            </div>
            <p style={{paddingRight: "15px"}} className="listItemTitle">
              {reward.stock > 0 ? "Disponible" : "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListItem;

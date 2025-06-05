import testImage from "../assets/Grupo 560@2x.png"
import diamond from "../assets/diamond.svg";

function ListItem({reward}) {
  return (
    <>
      <div className="listItem">
          <div >
             <img
              className="imageContainer"
              src={reward.image_url !== null || reward.image_url !== "" ? reward.image_url : testImage}
              alt="Challenge illustrative reference"
            />
          </div>
          <div className="listItemContainer">
            <div>
              <p className="listItemTitle">{reward.name}</p>
            <p className="listItemTitle">{reward.stock > 0 ? "En tienda" : "No disponible"}</p>
            </div>
            <div className="rowAlign">
                          <img src={diamond} style={{height: "17px"}} alt="diamonds"></img>
            <p className="listItemSubtitle">{`${reward.price} Diamantes`}</p>
            </div>

          </div>
        </div>
    </>
  );
}

export default ListItem;

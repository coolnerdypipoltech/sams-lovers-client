import testImage from "../assets/Grupo 560@2x.png"
import diamond from "../assets/diamond.svg";

function ListItem() {
  return (
    <>
      <div className="listItem">
          <div >
             <img
              className="imageContainer"
              src={testImage}
              alt="Challenge illustrative reference"
            />
          </div>
          <div className="listItemContainer">
            <div>
              <p className="listItemTitle">Nombre de un reward </p>
            <p className="listItemTitle">en tienda </p>
            </div>
            <div className="rowAlign">
                          <img src={diamond} style={{height: "17px"}} alt="diamonds"></img>
            <p className="listItemSubtitle">5 Diamantes</p>
            </div>

          </div>
        </div>
    </>
  );
}

export default ListItem;

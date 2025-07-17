import testImage from "../assets/Grupo 560@2x.png";
import diamond from "../assets/diamond.svg";


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


function ListItem({ reward }) {


  
  return (
    <>
      <div className="listItem" style={{gap: "0px"}}>
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
        <div style={{width: "100%", paddingLeft: "10px"}} className="listItemContainer">
          <div>
            <p style={{width: "94%"}}  className="listItemTitle">{truncateByScreenWidth(reward.name)}</p>
          </div>
          <div style={{justifyContent: "space-between", width: "100%"}} className="rowAlign">
            <div  className="rowAlign">
              <img
                src={diamond}
                style={{ height: "17px" }}
                alt="diamonds"
              ></img>
              <p className="listItemSubtitle">{`${reward.price} Diamantes`}</p>
            </div>
            <p style={{paddingRight: "15px", paddingLeft: "5px"}} className="listItemTitle">
              {reward.stock > 0 ? "Disponible" : "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListItem;

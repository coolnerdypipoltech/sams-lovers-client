import testImage from "../assets/Grupo 560@2x.png";
import diamond from "../assets/diamond.svg";


const truncateByScreenWidth = (str) => {
  const width = window.innerWidth;
  let maxLength = str.length;

  if (width <= 350) maxLength = 13;
  else if (width <= 400) maxLength = 28;
  else if (width <= 450) maxLength = 32;
  else if (width <= 500) maxLength = 36;
  else if (width <= 600) maxLength = 56;
  else if (width <= 800) maxLength = 100;


  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
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
            <p style={{width: "90%"}}  className="listItemTitle">{truncateByScreenWidth(reward.name)}</p>
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

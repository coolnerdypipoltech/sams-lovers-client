import diamond from "../assets/Icon_Felicidades.svg";
import Confetti from "react-confetti";


function ChallengePopUp({ closePopUp }) {
  const handleClose = () => {
    closePopUp();
  };

  return (
    <>
        <Confetti
        colors={["#1454F5", "#5C82F7"]}
          drawShape={ctx => {
    const size = 10;
    const radius = 2;

    const top = { x: 0, y: -size };
    const right = { x: size, y: 0 };
    const bottom = { x: 0, y: size };
    const left = { x: -size, y: 0 };

    ctx.beginPath();

    ctx.moveTo(0, -size + radius);

    ctx.quadraticCurveTo(top.x, top.y, radius, -size + radius);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(right.x, right.y, size - radius, radius);

    ctx.lineTo(radius, size - radius);
    ctx.quadraticCurveTo(bottom.x, bottom.y, 0, size - radius);

    ctx.lineTo(-size + radius, 0);
    ctx.quadraticCurveTo(left.x, left.y, -size + radius, -radius);

    ctx.lineTo(-radius, -size + radius);
    ctx.quadraticCurveTo(top.x, top.y, 0, -size + radius);

    ctx.closePath();
    ctx.fill();
  }}

          style={{ zIndex: "100" }}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="PopUp">
          <div style={{ height: "auto", paddingTop: "30px" }} className="PopUpDialog">
            <div style={{ display: "flex", justifyContent: "space-between", height: "300px", flexDirection: "column" }} className="GeneralButtonContainer">
              <img
                src={diamond}
                alt="star"
                style={{ height: "65px", paddingTop: "20px" }}
              ></img>

              <p className="subTitlePopUpReward">
                Felicidades, tu reto ha sido enviado, muy pronto obtendrás los resultados.
              </p>

              <button
                style={{}}
                className="GeneralButton4"
                onClick={handleClose}
              >
                Aceptar
              </button>

              <div style={{ height: "30px" }}></div>
            </div>
          </div>
        </div>
      </>
  );
}

export default ChallengePopUp;

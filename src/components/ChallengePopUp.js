import diamond from "../assets/diamond.svg";
import Confetti from "react-confetti";


function ChallengePopUp({ closePopUp }) {
  const handleClose = () => {
    closePopUp();
  };

  return (
    <>
        <Confetti
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

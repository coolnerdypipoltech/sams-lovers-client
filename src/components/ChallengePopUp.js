import diamond from "../assets/Icon_Felicidades.svg";

import SamsConfetti from "./SamsConfetti";


function ChallengePopUp({ closePopUp }) {
  const handleClose = () => {
    closePopUp();
  };

  return (
    <>
        <SamsConfetti></SamsConfetti>
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

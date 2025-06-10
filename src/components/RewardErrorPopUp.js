function RewardErrorPopUp({ popUpTitle, popUpContent, closePopUp }) {
  const handleClose = () => {
    closePopUp();
  };

  return (
    <>
    <div className="PopUp">
    <div style={{ height: "auto", paddingTop: "30px" }} className="PopUpDialog">
        <div style={{ display: "flex", justifyContent: "space-between", height: "300px", flexDirection: "column" }} className="GeneralButtonContainer">
        <p className="subTitlePopUpReward">
            {popUpTitle}
        </p>
        <p className="subTitlePopUpReward">
            {popUpContent}
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

export default RewardErrorPopUp;
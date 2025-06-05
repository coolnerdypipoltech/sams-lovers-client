function ConfirmationPage({returnPage, handlePurchase, reward}) {

  const handleReturn =  () =>{
    returnPage()
  }

  return (
    <div className="subPageContainer">
      <div className="confirmationSubpageContainer">

          <div className="ArticleItem">
            <p className="articleTitle">CONFIRMACIÓN DE CANJE</p>
          </div>

          <p className="arrticleText">{`Obtendrás ${reward.name} canjeandolo por cantidad de diamantes`}</p>
          <p className="arrticleText">{`Tus cantidad de diamantes después de esta compra: `}</p>
          <p className="arrticleText">####</p>


          <div className="RewardButtonsContainer">
            <p onClick={handleReturn} className="ParticipateText">CANCELAR</p>
            <p onClick={handleReturn} className="ParticipateText">OBTENER</p>
          </div>

        </div>
    </div>
  );
}

export default ConfirmationPage;

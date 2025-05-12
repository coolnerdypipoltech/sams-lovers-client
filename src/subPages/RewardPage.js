function RewardPage({returnPage, ConfirmPage}) {

 const handleReturn =  () =>{
    returnPage()
  } 

  const handleConfirm =  () =>{
    ConfirmPage()
  } 

  return (
    <>
      <div className="subPageContainer">
        <div className="rewardsSubpageContainer">
          <p onClick={handleReturn} className="arrticleText">Volver</p>

          <div className="ArticleItem">
            <p className="articleTitle">Titulo</p>
          </div>

          <div className="articleImageContainer"></div>
          <p className="arrticleText">Texto</p>
          <p className="arrticleText">Costo en diamantes</p>
          <p className="arrticleText">Cantidad disponible</p>
          <p className="arrticleText">Condiciones</p>

          <p onClick={handleConfirm} className="ParticipateText">OBTENER</p>
        </div>

        
      </div>
    </>
  );
}

export default RewardPage;

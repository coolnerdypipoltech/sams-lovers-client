function SelectedMiReward({returnPage}) {

 const handleReturn =  () =>{
    returnPage()
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

        </div>

      </div>
    </>
  );
}

export default SelectedMiReward;


import List from "../components/RewardsList";

function MyRewards({returnPage, selectPage}) {

    const handleReturn = () => {
    returnPage();
  };

  return (
    <>
    <div className="headerSpacer"></div>
      <div className="MyRewardsContainer">
        <div className="headerSpacer"></div>
        <p onClick={handleReturn} className="backButton">Volver</p>
        <p className="Title">Mis recompensas</p>
        <p className="challenges-text">Historial de recompensas canjeadas</p>
        <List changeToSubPage={selectPage}></List>
      </div>
    </>
  );
}

export default MyRewards;

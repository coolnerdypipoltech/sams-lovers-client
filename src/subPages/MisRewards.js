
import List from "../components/RewardsList";

function MisRewards({returnPage, selectPage}) {

    const handleReturn = () => {
    returnPage();
  };

  return (
    <>
      <div className="RewardsContainer">
        <div style={{width: "100%", height: "50px"}}></div>
        <p onClick={handleReturn} className="backButton">Volver</p>
        <p className="Title">Mis Rewards</p>

        <List changeToSubPage={selectPage}></List>
      </div>
    </>
  );
}

export default MisRewards;


import List from "../components/RewardsList";

function MyRewards({returnPage, selectPage}) {

    const handleReturn = () => {
    returnPage();
  };

  return (
    <>
      <div className="subPageContainer">
      <div className="MyRewardsContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <p onClick={handleReturn} className="backButton">Volver</p>
        <p className="Title">Mis Rewards</p>

        <List changeToSubPage={selectPage}></List>
      </div>
      </div>
    </>
  );
}

export default MyRewards;

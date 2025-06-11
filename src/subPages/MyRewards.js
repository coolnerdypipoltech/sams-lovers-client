
import MyRewardsList from "../components/MyRewardsList";

function MyRewards({returnPage, selectPage}) {

    const handleReturn = () => {
    returnPage();
  };

  return (
    <>
    <div className="subPageContainer"></div>
      <div
          style={{ width: "90%", backgroundColor: "#F2F4FF" }}
          className="challenges-subpage-container"
        >
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <p
            style={{ color: "#3C74F3" }}
            className="challenge-back-button-text"
            onClick={handleReturn}
        >
          Volver
        </p>
        <p className="challengesPage-Title">Mis Recompensas</p>
        <p className="challenge-text">Historial de recompensas canjeadas</p>
        <MyRewardsList changeToSubPage={selectPage}></MyRewardsList>
      </div>
    </>
  );
}

export default MyRewards;

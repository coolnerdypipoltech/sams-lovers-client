import { useState, useContext } from "react";
import MyRewardsList from "../components/MyRewardsList";
import SelectedMyReward from "./SelectedMyReward";
import { ElementContextData } from "../context/DataContext";

function MyRewards({returnPage, selectPage}) {

  const { setUserRewardsTransactionData } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState(null);

  let userRewardTransactionPage = <></>

  const handleReturn = () => {
    setUserRewardsTransactionData(null);
    returnPage();
  };

  const handleLocalReturn = () => {
    setSubPage(null);
  }

  const handleUserRewardTransactionSubPage = () => {
    setSubPage("SelectRewardPage")
  }

  if (subPage === "SelectRewardPage") {
    userRewardTransactionPage = <SelectedMyReward returnPage={handleLocalReturn}></SelectedMyReward>;
  }

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
        <p style={{paddingLeft: "0px"}} className="challengesPage-Title">Mis Recompensas</p>
        <p style={{paddingLeft: "0px"}} className="challenge-text">Historial de recompensas canjeadas</p>
        <MyRewardsList style={{paddingLeft: "0px"}} changeToSubPage={handleUserRewardTransactionSubPage}></MyRewardsList>
      </div>
      {userRewardTransactionPage}
    </>
  );
}

export default MyRewards;

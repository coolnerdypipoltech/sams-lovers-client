import { useContext } from "react";
import { ElementContextData } from "../context/DataContext";
import { formatOneDate } from "../hooks/dateHandler";

function SelectedMyReward({returnPage}) {

  const { currentUserRewardTransaction } = useContext(ElementContextData);

  const handleReturn =  () =>{
    returnPage()
  }

  return (
    <>
      <div className="subPageContainer">
        <div style={{gap:"0px", width: "100%", alignItems: "center"}} className="CodePageContainer">
          <div style={{maxWidth: "1000px"}}>
            <div className="headerSpacer"></div>
          <div className="headerSpacer"></div>
          <p
            style={{ color: "#3C74F3", paddingLeft: "5%" }}
            className="challenge-back-button-text"
            onClick={handleReturn}
        >
          Volver
        </p>
         <p className="challengesPage-Title">Mis Recompensas</p>
        <p className="challenge-text">{formatOneDate(currentUserRewardTransaction.current.created_at)}</p>
          <div style={{paddingTop: "15px"}} className="ArticleItem">
            <p className="challenge-text">{currentUserRewardTransaction.current.transactionable.name}</p>
          </div>
          <p className="challenge-text">{currentUserRewardTransaction.current.transactionable.transaction_text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectedMyReward;

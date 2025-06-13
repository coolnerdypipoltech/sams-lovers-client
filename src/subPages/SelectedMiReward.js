import { useContext } from "react";
import { ElementContextData } from "../context/DataContext";
import { formatOneDate } from "../hooks/dateHandler";

function SelectedMiReward({returnPage}) {

  const { currentUserRewardTransaction } = useContext(ElementContextData);

  const handleReturn =  () =>{
    returnPage()
  }

  console.log(currentUserRewardTransaction.current);

  return (
    <>
      <div className="subPageContainer">
        <div className="rewardsSubpageContainer">
          <p onClick={handleReturn} className="arrticleText">Volver</p>
          <div className="ArticleItem">
            <p className="articleTitle">{currentUserRewardTransaction.current.transactionable.name}</p>
          </div>
          <p className="arrticleText">{`${formatOneDate(currentUserRewardTransaction.current.created_at)}`}</p>
          <p className="arrticleText">{currentUserRewardTransaction.current.transactionable.transaction_text}</p>
        </div>
      </div>
    </>
  );
}

export default SelectedMiReward;

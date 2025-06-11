import { useContext } from "react";
import { ElementContextData } from "../context/DataContext";
import { formatOneDate } from "../hooks/dateHandler";

function SelectedMiReward({returnPage}) {

  const { currentUserReward, currentUserRewardTransaction } = useContext(ElementContextData);

  const handleReturn =  () =>{
    returnPage()
  }

  console.log(currentUserReward.current);

  return (
    <>
      <div className="subPageContainer">
        <div className="rewardsSubpageContainer">
          <p onClick={handleReturn} className="arrticleText">Volver</p>
          <div className="ArticleItem">
            <p className="articleTitle">{currentUserReward.current.name}</p>
          </div>
          <p className="arrticleText">{`${formatOneDate(currentUserRewardTransaction.current.created_at)}`}</p>
          <p className="arrticleText">{currentUserReward.current.transaction_text}</p>
        </div>
      </div>
    </>
  );
}

export default SelectedMiReward;

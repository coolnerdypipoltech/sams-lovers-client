import { useState, useEffect, useRef, useContext } from "react";
import MyRewardsListItem from "./MyRewardsListItem";
import { ElementContextData } from "../context/DataContext";

function MyRewardsList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const limit = 10;

  const { initRequestUserRewards, currentUserReward, currentUserRewardTransaction, userRewardsData, requestMoreUserRewardsByURL, nextUserReward } = useContext(ElementContextData);

  useEffect(() => {
    initRequestUserRewards(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreUserRewards = () => {
    if(isLoading) return;
    if(nextUserReward.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreUserRewardsByURL();
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      listContainerRef.current &&
      listContainerRef.current.scrollTop +
        listContainerRef.current.clientHeight >=
        listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      loadMoreUserRewards();
    }
  };

  const handleSelectReward = (itemData, transactionData) => {
    currentUserReward.current = itemData;
    currentUserRewardTransaction.current = transactionData;
    changeToSubPage();
  };

  console.log(userRewardsData)

  return (
    <>
      {userRewardsData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" }}
        >
          {userRewardsData.map((reward, index) => (
            <div key={index}>
                    {" "}
                    <div>
                        {reward.user_transactions.map((transaction, transactionKey) => (
                            <div key={transactionKey} onClick={() => handleSelectReward(reward, transaction)}>
                                {" "}
                                <MyRewardsListItem reward={reward} userTransaction={transaction} />
                            </div>
                        ))}
                    </div>
                </div>
          ))}

          {isLoading && (
            <div className="loading">Cargando más recompensas...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyRewardsList;
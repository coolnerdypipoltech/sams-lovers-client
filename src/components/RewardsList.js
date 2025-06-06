import { useState, useEffect, useRef, useContext } from "react";
import RewardsListItem from "./RewardsListItem";
import { ElementContextData } from "../context/DataContext";

function RewardsList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const limit = 10;

  const { initRequestRewards, setCurrentReward, rewardsData, requestMoreRewardsByURL, nextRewards } = useContext(ElementContextData);

  useEffect(() => {
    initRequestRewards(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreRewards = () => {
    if(isLoading) return;
    if(nextRewards.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreRewardsByURL();
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
      loadMoreRewards();
    }
  };

  const handleSelectReward = (itemData) => {
    setCurrentReward(itemData);
    changeToSubPage();
  };

  return (
    <>
      {rewardsData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" }}
        >
          {rewardsData.map((reward, index) => (
            <div key={index} onClick={() => handleSelectReward(reward)}>
              {" "}
              <RewardsListItem key={index} reward={reward} />
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

export default RewardsList;

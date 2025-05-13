import { useState, useEffect, useRef, useContext } from "react";
import RewardsListItem from "./RewardsListItem";
import { ElementContextData } from "../context/DataContext";

function RewardsList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { initRequestRewards, currentReward, rewardsData, requestMoreRewards } = useContext(ElementContextData);

  useEffect(() => {
    initRequestRewards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreRewards = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreRewards();
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

    console.log("aca")
  const handleSelectReward = (itemData) => {
    currentReward.current = itemData;
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
            <div onClick={handleSelectReward}>
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

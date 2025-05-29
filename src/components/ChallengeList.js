import { useState, useEffect, useRef, useContext } from "react";
import ChallengeListItem from "./ChallengeListItem";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";

function ChallengesList({offset, handleSetOffset, changeToSubPage, challengeStatusFilter, transactionStatusFilter}) {
  const { getLogInToken } = useContext(ElementContextRoute);

  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { initRequestChallenges, currentChallenge, challengesData, requestMoreChallenges } = useContext(ElementContextData);

  const limit = 5;

  useEffect(() => {
    initRequestChallenges(challengeStatusFilter, transactionStatusFilter, limit, offset);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreChallenges = () => {
    if(isLoading) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreChallenges(getLogInToken, challengeStatusFilter, transactionStatusFilter, limit, offset);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if(listContainerRef.current &&
      listContainerRef.current.scrollTop +
      listContainerRef.current.clientHeight >=
      listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      handleSetOffset(limit);
      loadMoreChallenges();
    }
  };

  const handleSelectChallenge = (itemData) => {
    currentChallenge.current = itemData;
    changeToSubPage();
  };

  return (
    <>
      {challengesData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" }}
        >
          {challengesData.map((challenge, index) => (
            <div onClick={() => handleSelectChallenge(challenge)}
            key={index}
            >
              {" "}
              <ChallengeListItem challenge={challenge} />
            </div>
          ))}

          {isLoading && (
            <div className="loading">Cargando...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChallengesList;

import { useState, useEffect, useRef, useContext } from "react";
import ChallengeListItem from "./ChallengeListItem";
import { ElementContextData } from "../context/DataContext";

function ChallengesList({changeToSubPage, challengeStatusFilter, transactionStatusFilter}) {

  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { currentChallenge, nextChallenges, initRequestChallenges, challengesData, requestMoreChallengesByURL } = useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    initRequestChallenges(challengeStatusFilter, transactionStatusFilter, limit, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreChallenges = () => {
    if(isLoading) return;
    if(nextChallenges.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreChallengesByURL();
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

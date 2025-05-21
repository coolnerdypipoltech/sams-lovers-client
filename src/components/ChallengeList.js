import { useState, useEffect, useRef, useContext } from "react";
import ChallengeListItem from "./ChallengeListItem";
import { ElementContextData } from "../context/DataContext";

function ChallengesList({changeToSubPage, endDateFilterType, statusFilterType}) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { initRequestChallenges, currentChallenge, challengesData, requestMoreChallenges } = useContext(ElementContextData);

  useEffect(() => {
    initRequestChallenges(endDateFilterType, statusFilterType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreChallenges = () => {
    if(isLoading) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreChallenges();
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
            <div className="loading">Cargando más retos...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChallengesList;

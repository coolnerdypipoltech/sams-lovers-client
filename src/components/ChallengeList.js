import { useState, useEffect, useRef, useContext } from "react";
import ChallengeListItem from "./ChallengeListItem";
import { ElementContextData } from "../context/DataContext";

function ChallengesList({changeToSubPage}) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { initRequestChallenges, currentChallenge, challengeData, requestMoreChallenges } = useContext(ElementContextData);

  useEffect(() => {
    initRequestChallenges();
    console.log(challengeData);
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
      {challengeData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" }}
        >
          {challengeData.map((challenge, index) => (
            <div onClick={handleSelectChallenge}>
              {" "}
              <ChallengeListItem key={index} challenge={challenge} />
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

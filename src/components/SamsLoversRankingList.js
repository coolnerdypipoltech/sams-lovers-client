import SamsLoversRankingItem from "./SamsLoverRankingItem";
import { useState, useEffect, useRef, useContext } from "react";
import { ElementContextData } from "../context/DataContext";

function SamsLoversRankingList() {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { nextTopUsers, initRequestTopUsers, topUsersData, RequestMoreTopUsersByURL } = useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    initRequestTopUsers(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreChallenges = () => {
    if(isLoading) return;
    if(nextTopUsers.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await RequestMoreTopUsersByURL();
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

  return (
    <>
      {topUsersData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh", paddingTop: "10px" }}
        >
          {topUsersData.map((topUser, index) => (
            <div key={index}>
              {" "}
              <SamsLoversRankingItem topUser={topUser} rank={index + 1}/>
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

export default SamsLoversRankingList;
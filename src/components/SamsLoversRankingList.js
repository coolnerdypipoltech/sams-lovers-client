import SamsLoversRankingItem from "./SamsLoverRankingItem";
import { useState, useEffect, useRef, useContext } from "react";
import { ElementContextData } from "../context/DataContext";
import backgroundImage from "../assets/headerMenu/Gradient.png";
import deco from "../assets/Rectángulo 238.svg";
function SamsLoversRankingList() {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const {
    nextTopUsers,
    initRequestTopUsers,
    topUsersData,
    RequestMoreTopUsersByURL,
  } = useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    initRequestTopUsers(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreChallenges = () => {
    if (isLoading) return;
    if (nextTopUsers.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await RequestMoreTopUsersByURL();
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
      loadMoreChallenges();
    }
  };

  return (
    <>
      {topUsersData != null ? (
        <div style={{width: "100%", height:"600px"}}>
        
          <div className="SamsLoversRankingListContainer">
            <p className="RankingHeader">Ranking Sam's Lovers</p>
            <p className="RankingTitle">¡Felicidades!</p>
            <p className="RankingSubTitle">
              Ellos no solo superaron retos... ¡la rompieron!
            </p>
            <p className="RankingSubTitle">
              Inspírate, comparte y brilla. El top 1 te espera
            </p>
            <div style={{ padding: "50px" }}>
              <div
                className="listContainer"
                ref={listContainerRef}
                onScroll={handleScroll}
                style={{
                  overflowY: "auto",
                  height: "300px",
                  paddingTop: "10px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(70, 178, 255, 0.34)",
                  
                  width: "100%",
                }}
              >
                {topUsersData.map((topUser, index) => (
                  <div key={index}>
                    {" "}
                    <SamsLoversRankingItem topUser={topUser} rank={index + 1} />
                  </div>
                ))}

                {isLoading && <div className="loading">Cargando...</div>}
              </div>
            </div>
          </div>
          <img className="deco1" alt="deco" src={deco}></img>
          <img className="deco2" alt="deco" src={deco}></img>
          <img className="deco3" alt="deco" src={deco}></img>
          <img className="deco4" alt="deco" src={deco}></img>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SamsLoversRankingList;

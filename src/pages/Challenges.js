import { useState, useContext } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import filter from "../assets/filter.png"
import { ElementContextRoute } from "../context/RouteContext";

function Challenges() {
  const [subPage, setSubPage] = useState("");
  const [challengeStatusFilter, setChallengeStatusFilter] = useState("all");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState("all");
  const [challengeFilter, setChallengeFilter] = useState(false);
  const [offset, setOffset] = useState(0);

  const { getLogInToken } = useContext(ElementContextRoute);

  const refresh_limit = 5;
  const refresh_offset = 0;

  const { initRequestChallenges, currentChallenge } =
    useContext(ElementContextData);

  let subPageContent = null;

  const handleSelectChallenge = () => {
    setSubPage("ChallengePage");
  };

  const handleReturn = () => {
    setSubPage("");
  };

  const handleSelectParticipation = () => {
    setSubPage("ChallengeParticipationPage");
  };

  const handleParticipation = () => {
    console.log("Participation");
  };

  const handleRefreshList = () => {
    initRequestChallenges(getLogInToken, challengeStatusFilter, transactionStatusFilter, refresh_limit, refresh_offset);
  };

  const handleChallengeStatusFilter = (challengeStatus) => {
    setChallengeStatusFilter(challengeStatus);
  };

  const handleTransactionStatusFilter = (transactionStatus) => {
    setTransactionStatusFilter(transactionStatus);
  };

  const handleSetOffset = (_limit) => {setOffset(offset + _limit); };

  if (subPage === "ChallengePage") {
    subPageContent = (
      <ChallengePage
        returnPage={handleReturn}
        challengeParticipationPage={handleSelectParticipation}
        challenge={currentChallenge.current}
      ></ChallengePage>
    );
  }

  if (subPage === "ChallengeParticipationPage") {
    subPageContent = (
      <ChallengeParticipationPage
        returnPage={handleReturn}
        participation={handleParticipation}
        challenge={currentChallenge.current}
      ></ChallengeParticipationPage>
    );
  }

  function handleSetChallengeFilter(event, value) {
    if (event.target.className === "challenges-filter-container") {
      setChallengeFilter(value);
    }
  }

  return (
    <>
      <>{subPageContent}</>
      <div className="challenges-container">
        <div style={{ width: "100%", height: "60px" }}></div>
        <div className="challenge-header">
          <p className="challenge-header-title">Retos</p>
          <div
            className="challenge-filter-button-container"
            onClick={() => setChallengeFilter(true)}
          >
            <p className="challenge-filter-title">Filtrar</p>
            <img className="challenge-filter-icon" src={filter} alt="filter icon"/>
          </div>
        </div>
        <div className="challenge-instructions-container">
          <p className="challenges-text">¡No te lo pierdas!</p>
          <p className="challenges-text">Sumáte a los retos, se auténtic@ y gana muchos premios, que tu creatividad brille como nunca.</p>
        </div>
        <ChallengeList
          offset = {offset}
          handleSetOffset = {handleSetOffset}
          changeToSubPage={handleSelectChallenge}
          challengeStatusFilter={challengeStatusFilter}
          transactionStatusFilter={transactionStatusFilter}
        ></ChallengeList>
      </div>
      {challengeFilter && (
        <div>
          <div
            className="challenges-filter-container"
            onClick={(e) => {
              handleSetChallengeFilter(e, false);
              setOffset(0);
              handleRefreshList();
            }}
          >
            <ChallengeFilter
              challengeStatusFilter={challengeStatusFilter}
              transactionStatusFilter={transactionStatusFilter}
              handleChallengeStatusFilter={handleChallengeStatusFilter}
              handleTransactionStatusFilter={handleTransactionStatusFilter}
            ></ChallengeFilter>
          </div>
        </div>
      )}
    </>
  );
}

export default Challenges;

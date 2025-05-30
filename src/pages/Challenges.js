import { useState, useContext } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import filter from "../assets/filter.png"
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import filter from "../assets/filter.png"

function Challenges() {
  const [subPage, setSubPage] = useState("");
  const [challengeStatusFilter, setChallengeStatusFilter] = useState("TODO");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState("TODO");
  const [challengeFilter, setChallengeFilter] = useState(false);
  const [offset, setOffset] = useState(0);

  const refresh_limit = 5;
  const refresh_offset = 0;

  const { initRequestChallenges, currentChallenge } =
    useContext(ElementContextData);

  let subPageContent = null;

  const handleSelectChallenge = () => {
    setSubPage("ChallengePage");
  };

  const handleReturn = () => {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("");
  };

  const handleSelectParticipation = () => {
    setSubPage("ChallengeParticipationPage");
  };

  const handleParticipation = () => {
    console.log("Participation");
  };

  const handleRefreshList = () => {
    initRequestChallenges(challengeStatusFilter, transactionStatusFilter, refresh_limit, refresh_offset);
  };

  const handleChallengeStatusFilter = (challengeStatus) => {
    setChallengeStatusFilter(challengeStatus);
  };

  const handleTransactionStatusFilter = (transactionStatus) => {
    setTransactionStatusFilter(transactionStatus);
  };

  const handleSetOffset = (_limit) => {setOffset(offset + _limit); };

  if (subPage === "ChallengePage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
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
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <div className="challenge-header">
          <p className="challenges-Title">Retos</p>
          <div
            className="challenge-filter-button-container"
            onClick={() => setChallengeFilter(true)}
          >

            <img className="challenge-filter-icon" src={filter} alt="filter icon"/>
          </div>
        </div>
        <p  className="challenges-text"> ¡No te lo pierdas! Sumáte a los retos, se auténtic@ y gana muchos premios, que tu creatividad brille como nunca.</p>
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

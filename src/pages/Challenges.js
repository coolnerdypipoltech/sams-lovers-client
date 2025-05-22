import { useState, useContext } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import filter from "../assets/filter.png"

function Challenges() {
  const [subPage, setSubPage] = useState("");
  const [endDateFilterType, setEndDateFilterType] = useState("all");
  const [statusFilterType, setStatusFilterType] = useState("all");
  const [challengeFilter, setChallengeFilter] = useState(false);

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
    initRequestChallenges(endDateFilterType, statusFilterType);
  };

  const handleEndDateFilterType = (endDateFilterType) => {
    setEndDateFilterType(endDateFilterType);
  };

  const handleStatusFilterType = (statusFilterType) => {
    setStatusFilterType(statusFilterType);
  };

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
          changeToSubPage={handleSelectChallenge}
          endDateFilterType={endDateFilterType}
          statusFilterType={statusFilterType}
        ></ChallengeList>
      </div>
      {challengeFilter && (
        <div>
          <div
            className="challenges-filter-container"
            onClick={(e) => {
              handleSetChallengeFilter(e, false);
              handleRefreshList();
            }}
          >
            <ChallengeFilter
              endDateFilterType={endDateFilterType}
              statusFilterType={statusFilterType}
              handleEndDateFilterType={handleEndDateFilterType}
              handleStatusFilterType={handleStatusFilterType}
            ></ChallengeFilter>
          </div>
        </div>
      )}
    </>
  );
}

export default Challenges;

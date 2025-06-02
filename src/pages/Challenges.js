import { useState, useContext, useEffect, useRef, use } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import filter from "../assets/filter.png"
import { CreateSubmission } from "../hooks/apicalls";

function Challenges() {
  const { UserData, initRequestChallenges, currentChallenge, setNewTransaction } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("");
  const [challengeStatusFilter, setChallengeStatusFilter] = useState("TODO");
  const [prevChallengeStatusFilter, setPrevChallengeStatusFilter] = useState("TODO");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState("TODO");
  const [prevTransactionStatusFilter, setPrevTransactionStatusFilter] = useState("TODO");
  const [challengeFilter, setChallengeFilter] = useState(false);
  const [submissionURL, setSubmissionURL] = useState("");

  let filterHasBeenModified = useRef(null);

  const refresh_limit = 10;
  const refresh_offset = 0;

  let subPageContent = null;

  useEffect(() => {
    if(prevChallengeStatusFilter !== challengeStatusFilter){
      filterHasBeenModified.current = true;
      setPrevChallengeStatusFilter(challengeStatusFilter);
    }
  }, [challengeStatusFilter, prevChallengeStatusFilter, filterHasBeenModified]);

  useEffect(() => {
    if(prevTransactionStatusFilter !== transactionStatusFilter){
      filterHasBeenModified.current = true;
      setPrevTransactionStatusFilter(transactionStatusFilter);
    }
  }, [transactionStatusFilter, prevTransactionStatusFilter, filterHasBeenModified]);

  const handleSelectChallenge = () => {
    setSubPage("ChallengePage");
  };

  const handleReturn = () => {
    if(subPage === "ChallengeParticipationPage") setSubPage("ChallengePage"); else setSubPage("");
  };

  const handleSelectParticipation = () => {
    setSubPage("ChallengeParticipationPage");
  };

  const handleParticipation = async () => {

    if(submissionURL === "") return;

    const response = await CreateSubmission(
            `${UserData.current.token_type} ${UserData.current.access_token}`,
            currentChallenge.id,
            submissionURL
    );
    const data = await response.json();
    console.log(data.challenges);
    if (response.ok) {
      setNewTransaction(data.transaction);
    }else{
      if (data.message) {
        if(response.status === 400) {
          switch(data.message) {
            case "api.error.challenge_expired":
              //todo send user a message of expiration
              break;
            default:
              break;
          }
        }

        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const handleRefreshList = () => {
    filterHasBeenModified.current = false;
    initRequestChallenges(challengeStatusFilter, transactionStatusFilter, refresh_limit, refresh_offset);
  };

  const handleChallengeStatusFilter = (challengeStatus) => {
    setChallengeStatusFilter(challengeStatus);
  };

  const handleTransactionStatusFilter = (transactionStatus) => {
    setTransactionStatusFilter(transactionStatus);
  };

  const handleOnChangeInput = (input) => {
    setSubmissionURL(input);
  }

  if (subPage === "ChallengePage") {
    subPageContent = (
      <ChallengePage
        returnPage={handleReturn}
        challengeParticipationPage={handleSelectParticipation}
        challenge={currentChallenge}
      ></ChallengePage>
    );
  }

  if (subPage === "ChallengeParticipationPage") {
    subPageContent = (
      <ChallengeParticipationPage
        handleReturn={handleReturn}
        handleParticipation={handleParticipation}
        challenge={currentChallenge}
        handleOnChangeInput={handleOnChangeInput}
      ></ChallengeParticipationPage>
    );
  }

  function handleSetChallengeFilter(event, value) {
    if (event.target.className === "challenges-filter-container") {
      setChallengeFilter(value);
      if(!value && filterHasBeenModified.current){
        handleRefreshList();
      }
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

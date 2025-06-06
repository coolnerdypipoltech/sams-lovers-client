import { useState, useContext, useEffect, useRef, use } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import filter from "../assets/filter.png"
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import { CreateSubmission } from "../hooks/apicalls";
import ChallengePopUp	 from "../components/ChallengePopUp";

function Challenges() {
  const { UserData, initRequestChallenges, currentChallenge, setNewTransaction } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("");
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
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
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
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
    console.log(data.transaction);
    if (response.ok) {
      setShowSuccessPopUp(true)
      setNewTransaction(data.transaction);
      setSubPage("ChallengePage");
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
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = (
      <ChallengePage
        returnPage={handleReturn}
        challengeParticipationPage={handleSelectParticipation}
        
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
      {showSuccessPopUp && (
        <ChallengePopUp closePopUp={() => setShowSuccessPopUp(false)}></ChallengePopUp>
      )}
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

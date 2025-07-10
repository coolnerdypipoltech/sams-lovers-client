import { useState, useContext, useEffect, useRef, use } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import filter from "../assets/Icon_Filtro.svg"
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import ChallengeFilter from "../components/ChallengeFilter";
import { CreateSubmission } from "../hooks/apicalls";
import ChallengePopUp	 from "../components/ChallengePopUp";
import { ElementContextRoute } from "../context/RouteContext";


function Challenges() {

  const { changeRoute, deleteSavedItems, getCurrentToken } = useContext(ElementContextRoute);
  const { SetUserData, UserData, initRequestChallenges, currentChallenge, setNewChallengeTransaction } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("");
  const [challengePopUp, setChallengePopUp] = useState(false);
  const [challengeStatusFilter, setChallengeStatusFilter] = useState("TODO");
  const [prevChallengeStatusFilter, setPrevChallengeStatusFilter] = useState("TODO");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState("TODO");
  const [prevTransactionStatusFilter, setPrevTransactionStatusFilter] = useState("TODO");
  const [challengeFilter, setChallengeFilter] = useState(false);
  const [submissionURL, setSubmissionURL] = useState("");
  const [errorPopUpResponse, setErrorPopUpResponse] = useState("");

  let filterHasBeenModified = useRef(null);
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  let errorPopUp = <></>;

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

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

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

  const openChallengeExpiredErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, el reto ha expirado.";
    errorPopUpContent.current = "Aún tenemos muchísimos retos disponibles para ti, pendiente en nuestras redes sociales.";
    setErrorPopUpResponse("Error");
  }

  const openGeneralErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    errorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setErrorPopUpResponse("Error");
  }

  const handleErrorPopUpClose = () => {
    setSubmissionURL("");
    setErrorPopUpResponse(null);
  }

  const handleParticipation = async () => {

    if(submissionURL === "") return;

    const token = await getCurrentToken();

    if(token === null || token === "") {
      await handleLogOut();
      return;
    }

    const response = await CreateSubmission(
      `Bearer ${token}`,
      currentChallenge.id,
      submissionURL
    );

    const data = await response.json();

    if (response.ok) {
      setChallengePopUp(true)
      setNewChallengeTransaction(data.transaction);
      setSubPage("ChallengePage");
    }else{
      if (data.message) {
        switch(data.message) {
          case "api.error.challenge_expired":
            openChallengeExpiredErrorPopUp();
            break;
          case "api.error.unauthorized":
            await handleLogOut();
            break;
          default:
            openGeneralErrorPopUp();
            break;
        }
      }else{
        openGeneralErrorPopUp();
      }
    }
  };

  const handleRefreshList = async () => {
    filterHasBeenModified.current = false;

    const token = await getCurrentToken();

      if(token === null || token === "") {
        await handleLogOut();
        return;
      }

    initRequestChallenges(challengeStatusFilter, transactionStatusFilter, token, refresh_limit, refresh_offset);
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

  if(errorPopUpResponse === "Error"){
    errorPopUp = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {errorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {errorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handleErrorPopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
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
    <>{errorPopUp}</>
      {challengePopUp && (
        <ChallengePopUp closePopUp={() => setChallengePopUp(false)}></ChallengePopUp>
      )}
      <>{subPageContent}</>
      <div  className="challenges-container">
        <div style={{maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center"}}>
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

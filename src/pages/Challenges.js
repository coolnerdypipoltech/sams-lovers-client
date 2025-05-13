
import { useState, useContext } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css"
import  ChallengePage  from "../subPages/ChallengePage";
import  ChallengeParticipationPage  from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";

function Challenges() {
  const [subPage, setSubPage] = useState("");
const { currentChallenge } = useContext(ElementContextData);
  let subPageContent = null;

  const handleSelectChallenge =  () =>{
    console.log("I clicked")
    setSubPage("ChallengePage")
  }

  const handleReturn =  () =>{
    console.log("I clicked")
    setSubPage("")
  }

  const handleSelectParticipation =  () =>{
    setSubPage("ChallengeParticipationPage")
  }

  const handleParticipation =  () =>{
    console.log("Participation");
  }

  if (subPage === "ChallengePage") {
    subPageContent = <ChallengePage returnPage={handleReturn} challengeParticipationPage={handleSelectParticipation} challenge={currentChallenge}></ChallengePage>;
  }

  if (subPage === "ChallengeParticipationPage") {
    subPageContent = <ChallengeParticipationPage returnPage={handleReturn} participation={handleParticipation} challenge={currentChallenge}></ChallengeParticipationPage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="ChallengesContainer">
        <div style={{width: "100%", height: "50px"}}></div>
        <p className="Title">Desafíos</p>

        <ChallengeList changeToSubPage={handleSelectChallenge}></ChallengeList>
      </div>
    </>
  );
}

export default Challenges;

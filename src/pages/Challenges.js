
import { useState } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css"
import  ChallengePage  from "../subPages/ChallengePage";

function Challenges() {
  const [subPage, setSubPage] = useState("");
  let subPageContent = null;

  if (subPage === "ChallengePage") {
    subPageContent = <ChallengePage></ChallengePage>;
  }

  return (
    <>
      <>{subPageContent}</>
      <div className="ChallengesContainer">
        <p className="Title">Retos</p>
        <ChallengeList></ChallengeList>
      </div>
    </>
  );
}

export default Challenges;


import { useState } from "react";
import List from "../components/List";
import "../styles/Rewards.css"
import  ChallengePage  from "../subPages/ChallengePage";
function Retos() {
  const [subPage, setSubPage] = useState("");
  let subPageContent = null;

  if (subPage === "ChallengePage") {
    subPageContent = <ChallengePage></ChallengePage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="RewardsContainer">
        <p className="Title">Retos</p>

        <List></List>

        

      </div>
    </>
  );
}

export default Retos;

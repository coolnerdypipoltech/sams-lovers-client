import { useState } from "react";
import List from "../components/List";
import "../styles/Rewards.css";
import  RewardPage  from "../subPages/RewardPage";
import  ConfirmationPage  from "../subPages/ConfirmationPage";
function Rewards() {
  const [subPage, setSubPage] = useState("");
  let subPageContent = null;

  if (subPage === "RewardPage") {
    subPageContent = <RewardPage></RewardPage>;
  }

  if (subPage === "ConfirmationPage") {
    subPageContent = <ConfirmationPage></ConfirmationPage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="RewardsContainer">
        <p className="Title">Rewards disponibles</p>

        <List></List>
      </div>
    </>
  );
}

export default Rewards;

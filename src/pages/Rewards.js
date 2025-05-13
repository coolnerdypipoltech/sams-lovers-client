import { useState } from "react";
import List from "../components/RewardsList";
import "../styles/Rewards.css";
import  RewardPage  from "../subPages/RewardPage";
import  ConfirmationPage  from "../subPages/ConfirmationPage";
function Rewards() {
  const [subPage, setSubPage] = useState("ConfirmationPage");
  let subPageContent = null;
  const handleSelectReward =  () =>{
    console.log("I clicked")
    setSubPage("RewardPage")
  } 

  const handleReturn =  () =>{
    console.log("I clicked")
    setSubPage("")
  }

  const handleConfirm =  () =>{
    setSubPage("ConfirmationPage")
  } 

  if (subPage === "RewardPage") {
    subPageContent = <RewardPage ConfirmPage={handleConfirm} returnPage={handleReturn}></RewardPage>;
  }

  if (subPage === "ConfirmationPage") {
    subPageContent = <ConfirmationPage returnPage={handleReturn} ></ConfirmationPage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="RewardsContainer">
        <div style={{width: "100%", height: "50px"}}></div>
        <p className="Title">Rewards disponibles</p>

        <List changeToSubPage={handleSelectReward}></List>
      </div>
    </>
  );
}

export default Rewards;

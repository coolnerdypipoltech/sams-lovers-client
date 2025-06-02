import { useState } from "react";
import List from "../components/RewardsList";
import "../styles/Rewards.css";
import  RewardPage  from "../subPages/RewardPage";
import  ConfirmationPage  from "../subPages/ConfirmationPage";
function Rewards() {
  const [subPage, setSubPage] = useState("");
  let subPageContent = null;
  const handleSelectReward =  () =>{
    setSubPage("RewardPage")
  } 

  const handleReturn =  () =>{
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("")
  }

  const handleConfirm =  () =>{
    setSubPage("ConfirmationPage")
  } 

  if (subPage === "RewardPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <RewardPage ConfirmPage={handleConfirm} returnPage={handleReturn}></RewardPage>;
  }

  if (subPage === "ConfirmationPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <ConfirmationPage returnPage={handleReturn} ></ConfirmationPage>;
  }

  return (
    <>
      <>{subPageContent}</>

      <div className="RewardsContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <div className="challenge-header">
        <p  className="challenges-Title">Recompensas disponibles</p>
        </div>
        <p  className="challenges-text"> Redime tus diamantes por increibles premios.</p>
        

        <List changeToSubPage={handleSelectReward}></List>
      </div>
    </>
  );
}

export default Rewards;

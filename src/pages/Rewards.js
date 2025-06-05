import { useState, useContext} from "react";
import RewardsList from "../components/RewardsList";
import "../styles/Rewards.css";
import  RewardPage  from "../subPages/RewardPage";
import  ConfirmationPage  from "../subPages/ConfirmationPage";
import { PurchaseReward } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";

function Rewards() {
  const { UserData, currentReward, setNewReward, setNewUserDiamonds } = useContext(ElementContextData);

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

  const handlePurchase = async () => {
      const response = await PurchaseReward(
              `${UserData.current.token_type} ${UserData.current.access_token}`,
              currentReward.id
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setNewReward(data.reward);
        setNewUserDiamonds(data.diamonds_left)
      }else{
      if (data.message) {
        switch(data.message) {
          case "api.error.unauthorized":
            //todo send user to log in page
            break;
          default:
            break;
        }
      }
      return;
    }
  };


  if (subPage === "RewardPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <RewardPage returnPage={handleReturn} handlePurchase={handlePurchase} reward={currentReward}></RewardPage>;
  }

  if (subPage === "ConfirmationPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <ConfirmationPage returnPage={handleReturn} handlePurchase={handlePurchase} reward={currentReward}></ConfirmationPage>;
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
        <RewardsList changeToSubPage={handleSelectReward}></RewardsList>
      </div>
    </>
  );
}

export default Rewards;

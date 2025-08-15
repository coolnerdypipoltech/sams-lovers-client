import { useState, useContext, useRef, useEffect } from "react";
import RewardsList from "../components/RewardsList";
import "../styles/Rewards.css";
import RewardPage from "../subPages/RewardPage";
import ConfirmationPage from "../subPages/ConfirmationPage";
import { PurchaseReward } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import { ElementContextPopUp } from "../context/PopUpContext";
import gift from "../assets/Recompensa.svg";
import filter from "../assets/Icon_Filtro.svg";
import RewardsFilter from "../components/RewardsFilter";

import SamsConfetti from "../components/SamsConfetti";

function Rewards() {
  const { deleteSavedItems, changeRoute, getCurrentToken, forceUpdate } =
    useContext(ElementContextRoute);
  const {
    SetUserData,
    UserData,
    currentReward,
    setNewReward,
    setNewUserDiamonds,
    setNewRewardTransaction,
    initRequestRewards
  } = useContext(ElementContextData);
  const { changePopUpLoading } = useContext(ElementContextPopUp);
  const [subPage, setSubPage] = useState("");
  const [popUpResponse, setPopUpResponse] = useState("");
  const [rewardsStatusFilter, setRewardsStatusFilter] = useState("TODO");
  const [prevRewardsStatusFilter, setPrevRewardsStatusFilter] = useState("TODO");
  const [rewardsFilter, setRewardsFilter] = useState(false);

  let filterHasBeenModified = useRef(null);
  let subPageContent = null;
  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");
  let rewardPopUpContent = <></>;

  const refresh_limit = 10;
  const refresh_offset = 0;

  const handleSelectReward = () => {
    setSubPage("RewardPage");
  };

  useEffect(() => {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("");
  }, [forceUpdate]);
  const handleReturn = () => {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("");
  };

  useEffect(() => {
    if(prevRewardsStatusFilter !== rewardsStatusFilter){
      filterHasBeenModified.current = true;
      setPrevRewardsStatusFilter(rewardsStatusFilter);
    }
  }, [rewardsStatusFilter, prevRewardsStatusFilter, filterHasBeenModified]);

  const openNoDiamondsPopUp = () => {
    rewardErrorPopUpTitle.current =
      "Lo sentimos, no tienes los suficientes diamantes.";
    rewardErrorPopUpContent.current =
      "Participa en más retos para obtener diamantes.";
    setPopUpResponse("Error");
  };

  const openNoStockPopUp = () => {
    rewardErrorPopUpTitle.current =
      "Lo sentimos, este premio se encuentra agotado.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  };

  const openMaxPurchasesReachedPopUp = () => {
    rewardErrorPopUpTitle.current =
      "Lo sentimos, haz agotado tus canjes permitidos para este premio.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  };

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current =
      "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  };

  const handleRewardPopUpClose = () => {
    setPopUpResponse(null);
  };

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  };

  const handlePurchase = async () => {
    changePopUpLoading(true);
    if (UserData.current.user.related.diamonds < currentReward.price) {
      openNoDiamondsPopUp();
      return;
    }

    if (currentReward.stock <= 0) {
      openNoStockPopUp();
      return;
    }

    if (currentReward.total_user_transactions_left <= 0) {
      openMaxPurchasesReachedPopUp();
      return;
    }

    const token = await getCurrentToken();

    if (token === null || token === "") {
      await handleLogOut();
      return;
    }

    const response = await PurchaseReward(`Bearer ${token}`, currentReward.id);
    const data = await response.json();
    if (response.ok) {
      setNewReward(data.reward);
      setNewRewardTransaction(data.transaction);
      setNewUserDiamonds(data.diamonds_left);
      setPopUpResponse("Success");
    } else {
      if (data.message) {
        switch (data.message) {
          case "api.error.unauthorized":
            await handleLogOut();
            break;
          case "api.error.max_purchases_reached":
            openMaxPurchasesReachedPopUp();
            break;
          case "api.error.not_enough_diamonds":
            openNoDiamondsPopUp();
            break;
          default:
            openGeneralErrorPopUp();
            break;
        }
      } else {
        openGeneralErrorPopUp();
      }
    }
    changePopUpLoading(false);
  };

  const handleRefreshList = async () => {
    filterHasBeenModified.current = false;

    const token = await getCurrentToken();

      if(token === null || token === "") {
        await handleLogOut();
        return;
      }

    await initRequestRewards(token, rewardsStatusFilter, refresh_limit, refresh_offset);
  };

  const handleRewardsStatusFilter = (rewardsStatus) => {
    setRewardsStatusFilter(rewardsStatus);
  };

  if (subPage === "RewardPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = (
      <RewardPage
        returnPage={handleReturn}
        handlePurchase={handlePurchase}
        reward={currentReward}
      ></RewardPage>
    );
  }

  if (subPage === "ConfirmationPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = (
      <ConfirmationPage
        returnPage={handleReturn}
        handlePurchase={handlePurchase}
        reward={currentReward}
      ></ConfirmationPage>
    );
  }

  if (popUpResponse === "Error") {
    rewardPopUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {rewardErrorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {rewardErrorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handleRewardPopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (popUpResponse === "Success") {
    rewardPopUpContent = (
      <>
        <SamsConfetti></SamsConfetti>
        <div className="PopUp">
          <div style={{ height: "auto" }} className="PopUpDialog">
            <div className="GeneralButtonContainer">
              <img
                src={gift}
                style={{ height: "130px", paddingTop: "20px" }}
                alt="An illustration representative of a gift."
              ></img>

              <p className="subTitlePopUpReward">
                Tu premio ha sido canjeado correctamente.
              </p>

              <p
                style={{
                  fontWeight: "400",
                  margin: "0px",
                  marginBottom: "20px",
                }}
                className="subTitlePopUpReward"
              >
                Disfruta de tus recompensas, no te olvides de revisar la bandeja
                de entrada de tu correo electrónico registrado.
              </p>

              <button
                style={{}}
                className="GeneralButton4"
                onClick={handleRewardPopUpClose}
              >
                Aceptar
              </button>

              <div style={{ height: "30px" }}></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function handleSetRewardsFilter(event, value) {
    if (event.target.className === "challenges-filter-container") {
      setRewardsFilter(value);
      if(!value && filterHasBeenModified.current){
        handleRefreshList();
      }
    }
  }

  return (
    <>
      <>{rewardPopUpContent}</>
      <>{subPageContent}</>

      <div className="RewardsContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "1000px",
            width: "100%",
            overflowY: "overlay",
            paddingBottom: "20px",
          }}
          className="challenge-header"
        >
          <div
            style={{
              maxWidth: "1000px",
              width: "80%",
            }}
          >
            <p
              style={{ textAlign: "left", width: "100%" }}
              className="challenges-Title"
            >
              Recompensas disponibles
            </p>
            <div
              className="challenge-filter-button-container"
              onClick={() => setRewardsFilter(true)}
            >
              <img className="challenge-filter-icon" src={filter} alt="filter icon"/>
            </div>

            <p style={{ textAlign: "left" }} className="challenges-text">
              {" "}
              Redime tus diamantes por increibles premios.
            </p>
          </div>
          <RewardsList changeToSubPage={handleSelectReward}></RewardsList>
        </div>
      </div>
      {rewardsFilter && (
        <div>
          <div
            className="challenges-filter-container"
            onClick={(e) => {
              handleSetRewardsFilter(e, false);
            }}
          >
            <RewardsFilter
              rewardsStatusFilter={rewardsStatusFilter}
              handleRewardsStatusFilter={handleRewardsStatusFilter}
            ></RewardsFilter>
          </div>
        </div>
      )}
    </>
  );
}

export default Rewards;

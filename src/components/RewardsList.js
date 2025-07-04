import { useState, useEffect, useRef, useContext } from "react";
import RewardsListItem from "./RewardsListItem";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";

function RewardsList({ changeToSubPage }) {

  const { changeRoute, deleteSavedItems, getCurrentToken } = useContext(ElementContextRoute);
  const { SetUserData, initRequestRewards, setCurrentReward, rewardsData, requestMoreRewardsByURL, nextRewards } = useContext(ElementContextData);


  const [isLoading, setIsLoading] = useState(false);
  const [errorPopUpResponse, setErrorPopUpResponse] = useState("");

  const listContainerRef = useRef(null);
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  let errorPopUp = <></>;

  const limit = 10;

  useEffect(() => {
    Initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreRewards = () => {
    if(isLoading) return;
    if(nextRewards.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      const token = await getCurrentToken();
      const result = await requestMoreRewardsByURL(token);
      setIsLoading(false);
      if(!result.ok){
        switch (result.data.message) {
          case "api.error.unauthorized":
            await handleLogOut();
            break;
          default:
            openGeneralErrorPopUp();
            break;
        }
      }
    }, 1000);
  };

  const handleScroll = () => {
    if (
      listContainerRef.current &&
      listContainerRef.current.scrollTop +
        listContainerRef.current.clientHeight >=
        listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      loadMoreRewards();
    }
  };

  const openGeneralErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    errorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setErrorPopUpResponse("Error");
  }

  const handleErrorPopUpClose = () => {
    setErrorPopUpResponse(null);
  }

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const Initialize = async () => {
    const token = await getCurrentToken();
    const result = await initRequestRewards(token, limit, 0);
    if(!result.ok){
      switch (result.data.message) {
        case "api.error.unauthorized":
          await handleLogOut();
          break;
        default:
          openGeneralErrorPopUp();
          break;
      }
    }
  }

  const handleSelectReward = (itemData) => {
    setCurrentReward(itemData);
    changeToSubPage();
  };

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

  return (
    <>
    <>{errorPopUp}</>
      {rewardsData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" }}
        >
          {((rewardsData !== null) && (rewardsData.length > 0)) ?
              (<>
                {rewardsData.map((reward, index) => (
                  <div key={index} onClick={() => handleSelectReward(reward)}>
                    {" "}
                    <RewardsListItem key={index} reward={reward} />
                  </div>)
                )}
              </>)
            :
              (<p style={{textAlign: "center"}} className="challenge-text">No hay recompensas disponibles...</p>)
            }
          {isLoading && (
            <div className="loading">Cargando más recompensas...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default RewardsList;

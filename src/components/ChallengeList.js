import { useState, useEffect, useRef, useContext } from "react";
import ChallengeListItem from "./ChallengeListItem";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";

function ChallengesList({changeToSubPage, challengeStatusFilter, transactionStatusFilter}) {

  const [isLoading, setIsLoading] = useState(false);
  const [errorPopUpResponse, setErrorPopUpResponse] = useState("");

  const listContainerRef = useRef(null);
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  let errorPopUp = <></>;

  const { changeRoute, deleteSavedItems, getCurrentToken } = useContext(ElementContextRoute);
  const { SetUserData, setCurrentChallenge, nextChallenges, initRequestChallenges, challengesData, requestMoreChallengesByURL } = useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    Initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openGeneralErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    errorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setErrorPopUpResponse("Error");
  }

  const handleErrorPopUpClose = () => {
    setErrorPopUpResponse(null);
  }

  const Initialize = async () => {
    const token = await getCurrentToken();

    if(token === null || token === "") {
      await handleLogOut();
      return;
    }

    const result = await initRequestChallenges(challengeStatusFilter, transactionStatusFilter, token, limit, 0);
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

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const loadMoreChallenges = () => {
    if(isLoading) return;
    if(nextChallenges.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      const token = await getCurrentToken();

      if(token === null || token === "") {
        await handleLogOut();
        return;
      }

      const result = await requestMoreChallengesByURL(token);
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
    if(listContainerRef.current &&
      listContainerRef.current.scrollTop +
      listContainerRef.current.clientHeight >=
      listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      loadMoreChallenges();
    }
  };

  const handleSelectChallenge = (itemData) => {
    setCurrentChallenge(itemData);
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
      {challengesData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "overlay", height: "100%", paddingTop: "10px", paddingBottom: "30px",}}
        >
          {((challengesData !== null) && (challengesData.length > 0)) ?
              (<>
                {challengesData.map((challenge, index) => (
                  <div
                    onClick={() => handleSelectChallenge(challenge)}
                    key={index}
                  >
                  {" "}
                  <ChallengeListItem challenge={challenge} />
                  </div>)
                )}
              </>)
            :
              (<p style={{textAlign: "center"}} className="challenge-text">No hay retos disponibles...</p>)
            }
          {isLoading && (
            <div className="loading">Cargando más retos...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChallengesList;

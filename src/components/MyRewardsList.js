import { useState, useEffect, useRef, useContext } from "react";
import MyRewardsListItem from "./MyRewardsListItem";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";

function MyRewardsList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopUpResponse, setErrorPopUpResponse] = useState("");

  const listContainerRef = useRef(null);
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  let errorPopUp = <></>;

  const limit = 10;

  const { changeRoute, deleteSavedItems, getCurrentToken } = useContext(ElementContextRoute);
  const { SetUserData, initRequestUserRewardsTransactions, currentUserRewardTransaction, userRewardsTransactionData, requestMoreUserRewardsTransactionsByURL, nextUserRewardTransaction } = useContext(ElementContextData);

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

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const Initialize = async () => {
    const token = await getCurrentToken();
    const result = await initRequestUserRewardsTransactions(token, limit, 0);
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

  const loadMoreUserRewardsTransactions = () => {
    if(isLoading) return;
    if(nextUserRewardTransaction.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      const token = await getCurrentToken();
      const result = await requestMoreUserRewardsTransactionsByURL(token);
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
      loadMoreUserRewardsTransactions();
    }
  };

  const handleSelectRewardTransaction = (transactionData) => {
    currentUserRewardTransaction.current = transactionData;
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
      {userRewardsTransactionData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh", width: "100%" }}
        >
          {((userRewardsTransactionData !== null) && (userRewardsTransactionData.length > 0)) ?
              (<>
                {userRewardsTransactionData.map((transaction, index) => (
                  <div key={index}>
                    {" "}
                    <div key={index} onClick={() => handleSelectRewardTransaction(transaction)}>
                      <MyRewardsListItem reward={transaction.transactionable} userTransaction={transaction} />
                    </div>
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

export default MyRewardsList;
import { useState, useEffect, useRef, useContext } from "react";
import AcademyListItem from "./AcademyItem";
import { ElementContextData } from "../context/DataContext";
import SamsFooter from "./SamsFooter";
import { ElementContextRoute } from "../context/RouteContext";

function AcademyList({ changeToSubPage }) {

  const { changeRoute, deleteSavedItems } = useContext(ElementContextRoute);
  const { SetUserData, initRequestArticles, setCurrentArticle, articleData, requestMoreArticlesByURL, nextArticles } = useContext(ElementContextData);

  const [isLoading, setIsLoading] = useState(false);
  //const [triggerUpdate, setTriggerUpdate] = useState(0);
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

  const loadMoreArticles = () => {
    if (isLoading) return;
    if(nextArticles.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      const result = await requestMoreArticlesByURL();
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
    const result = await initRequestArticles(limit, 0);
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

  const handleScroll = () => {
    if (
      listContainerRef.current &&
      listContainerRef.current.scrollTop +
        listContainerRef.current.clientHeight >=
        listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      if(nextArticles.current != null) {
        loadMoreArticles();
      }
    }
  };

  const handleSelectArticle = (itemData) => {
    setCurrentArticle(itemData);
    changeToSubPage();
  };

  let contentHelper

  if(isLoading){
    if(nextArticles.current != null){
      contentHelper = (<div className="loading">Cargando más artículos...</div>)
    }else{
      contentHelper = (<SamsFooter></SamsFooter>)
    }
  }else{
    if(nextArticles.current === null){
      contentHelper = (<SamsFooter></SamsFooter>)
    }
  }

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
      {articleData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" , width: "100%" }}
        >
          <div style={{width: "95%", paddingLeft: "2.5%", paddingRight: "2.5%"}}>
                    {articleData.map((article, index) => (
            <div key={index}>
              <AcademyListItem doClick={() => handleSelectArticle(article)} key={index} article={article}  />
            </div>
          ))}
          </div>
          <div>{contentHelper}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AcademyList;

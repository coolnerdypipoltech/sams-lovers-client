
import { useState, useContext, useEffect } from "react";
import AcademyList from "../components/AcademyList";
import "../styles/Academy.css";
import AcademyPage from "../subPages/AcademyPage";
import { ElementContextData } from "../context/DataContext";
import { ElementContextPopUp } from "../context/PopUpContext";
import { ElementContextRoute } from "../context/RouteContext";

function Academy() {

  useEffect(() => {
    if(currentArticle !== null) setCurrentArticleArticleIndex();
  });

  const { getCurrentToken, deleteSavedItems, changeRoute, forceUpdate } = useContext(ElementContextRoute);
  const { changePopUpLoading } = useContext(ElementContextPopUp);
  const { SetUserData, currentArticle, articleData, requestNextArticle, articlePosition, totalArticles } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("");
  let [hasNextArticle, setHasNextArticle] = useState(true);
  let subPageContent = null;

  const handleSelectArticle =  () =>{
    setSubPage("AcademyPage")
  }

    useEffect(() => {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("");
  }, [forceUpdate]);

  const handleReturn =  () =>{
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("")
  }

  const setCurrentArticleArticleIndex = () => {
    let articleDataTemp = articleData;
    for (let i = 0; i < articleDataTemp.length; i++){
      if (articleDataTemp[i].id === currentArticle.id){
        articlePosition.current = i;
        handleNextArticleValue();
        break;
      }
    }
  }

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const handleNextArticle = async () => {
    changePopUpLoading(true);
    const token = await getCurrentToken();

    if(token === null || token === "") {
      await handleLogOut();
      return;
    }

    await requestNextArticle(token);
    changePopUpLoading(false);
  }

  const handleNextArticleValue = () => {
   if((articlePosition.current + 1) < (totalArticles.current)){
      setHasNextArticle(true);
    }else{
      setHasNextArticle(false);
    }
  }

  if (subPage === "AcademyPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <AcademyPage onReturn={handleReturn} handleNextArticle={handleNextArticle} hasNextArticle={hasNextArticle}></AcademyPage>;
  }

  return (
    <>
    <>{subPageContent}</>
      <div className="AcademyContainer">
      <div className="headerSpacer"></div>
      <div className="headerSpacer"></div>
      <p className="AcademyTitle" style={{paddingBottom: "20px"}}>Sam's Lovers Academy</p>
        <AcademyList changeToSubPage={handleSelectArticle}></AcademyList>
      </div>
    </>
  );
}

export default Academy;
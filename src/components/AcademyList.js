import { useState, useEffect, useRef, useContext } from "react";
import AcademyListItem from "./AcademyItem";
import { ElementContextData } from "../context/DataContext";
import SamsFooter from "./SamsFooter";
function AcademyList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const listContainerRef = useRef(null);

  const { initRequestArticles, currentArticle, articleData, requestMoreArticlesByURL, nextArticles} =
    useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    initRequestArticles(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreArticles = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreArticlesByURL();
      setIsLoading(false);
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
      if(nextArticles.current != null) {
        loadMoreArticles();
      }
      
    }
  };

  const handleSelectArticle = (itemData) => {
    currentArticle.current = itemData;
    changeToSubPage();
  };

  let contentHelper

  console.log(nextArticles)

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

  

  return (
    <>
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

import { useState, useEffect, useRef, useContext } from "react";
import AcademyListItem from "./AcademyItem";
import { ElementContextData } from "../context/DataContext";

function AcademyList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const { initRequestArticles, currentArticle, articleData, requestMoreArticlesByURL, nextArticles } =
    useContext(ElementContextData);

  const limit = 10;

  useEffect(() => {
    initRequestArticles(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreArticles = () => {
    if (isLoading) return;
    if(nextArticles.current === null) return;
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
      loadMoreArticles();
    }
  };

  const handleSelectArticle = (itemData) => {
    currentArticle.current = itemData;
    changeToSubPage();
  };

  return (
    <>
      {articleData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh" , width: "95%" }}
        >
          {articleData.map((article, index) => (
            <div key={index}>
              {" "}
              <AcademyListItem key={index} article={article} onClick={() => handleSelectArticle(article)} />
            </div>
          ))}

          {isLoading && (
            <div className="loading">Cargando más artículos...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AcademyList;

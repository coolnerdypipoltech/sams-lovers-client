import React, { useState, useContext, useEffect } from "react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";



import SamsFooter from "../components/SamsFooter";
import { ElementContextData } from "../context/DataContext";
import ArticleGallery from "../components/ArticleGalley";
import {formatOneDate} from "../hooks/dateHandler"
function AcademyPage({ onReturn }) {

    const { currentArticle, loadNextArticle, hasNextArticle } =useContext(ElementContextData);

  const handleOnReturn = () => {
    onReturn();
  };

  const handleNextArticle = async () => {
    await loadNextArticle();
    setUpdate(update + 1)
    setHasNext(hasNextArticle())
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  }
  useEffect(() => {
    setHasNext(hasNextArticle())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  console.log(currentArticle.current)

  const [isYoutube, SetIsYoutube] = useState(true);
  const [update, setUpdate] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  return (
    <>
      <div key={update} className="AcademyPageContainer">
        <div className="AcademyArticlePageContainer">
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}> 
            <div className="headerSpacer"></div>
            <div className="headerSpacer"></div>
            <p
              onClick={handleOnReturn}
              style={{ padding: "0px", margin: "0px" }}
              className="challenge-back-button-text"
            >
              Volver
            </p>

            <p
              style={{ padding: "0px", margin: "0px" }}
              className="AcademyTitle"
            >
            {currentArticle.current.title}
            </p>
            {currentArticle.current.main.type !== "VIDEO" ? (
              <img
                style={{ width: "100%", paddingLeft: "0px" }}
                className="imageAcademyItem"
                src={currentArticle.current.main.absolute_url}
                alt="bannerLogo"
              ></img>
            ) : (
              <LiteYouTubeEmbed style={{borderRadius: "36px", marginTop: "20px"}} id={(currentArticle.current.main.absolute_url.split("/")[3]).split("?")[0]} />
            )}
            <p className="AcademyArticleDate">{formatOneDate(currentArticle.current.created_at)}</p>
            <div dangerouslySetInnerHTML={{__html: currentArticle.current.content}}></div>
            <ArticleGallery
              gallery={currentArticle.current.gallery}
            ></ArticleGallery>
            {hasNext && <p className="ArticleNext" onClick={handleNextArticle}> Ver siguiente entrada</p>}
            
          </div>
          <SamsFooter></SamsFooter>
        </div>
      </div>
    </>
  );
}

export default AcademyPage;

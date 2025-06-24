import React, { useState, useContext, useEffect } from "react";
import { render } from "react-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import banner from "../assets/test/Banners_Sams_Banner1131x669_Blog@2x.png";
import SamsFooter from "../components/SamsFooter";
import { ElementContextData } from "../context/DataContext";
import ArticleGallery from "../components/ArticleGalley";

function AcademyPage({ onReturn }) {

    const { currentArticle, loadNextArticle, hasNextArticle } =useContext(ElementContextData);

  const handleOnReturn = () => {
    onReturn();
  };

  const handleNextArticle = async () => {
    await loadNextArticle();
    setUpdate(update + 1)
    setHasNext(hasNextArticle())
  }
  useEffect(() => {
    setHasNext(hasNextArticle())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

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
            <p className="AcademyArticleDate">Enero,06 2025</p>
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

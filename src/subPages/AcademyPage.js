import React, { useState, useContext } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import SamsFooter from "../components/SamsFooter";
import { ElementContextData } from "../context/DataContext";
import ArticleGallery from "../components/ArticleGalley";
import { formatOneDate } from "../hooks/dateHandler";

function AcademyPage({ onReturn, handleNextArticle, hasNextArticle }) {
  const { currentArticle } = useContext(ElementContextData);

  const [update, setUpdate] = useState(0);

  const handleOnReturn = () => {
    onReturn();
  };

  const OnNextArticleOnClick = async () => {
    await handleNextArticle();
    setUpdate(update + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div key={update} className="AcademyPageContainer">
        <div className="AcademyArticlePageContainer">
          <div className="center">
            <div style={{ maxWidth: "1000px" }}>
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
                style={{
                  padding: "0px",
                  margin: "0px",
                  paddingTop: "20px",
                  lineHeight: "1.2",
                }}
                className="AcademyTitle"
              >
                {currentArticle.title}
              </p>
              {currentArticle.main.type !== "VIDEO" ? (
                <img
                  style={{ width: "100%", paddingLeft: "0px" }}
                  className="imageAcademyItem"
                  src={currentArticle.main.absolute_url}
                  alt="bannerLogo"
                ></img>
              ) : (
                <div className="center">
                  <div className="YtContainer">
                    <LiteYouTubeEmbed
                      style={{
                        borderRadius: "36px",
                        marginTop: "20px",
                        maxWidth: "500px",
                      }}
                      id={
                        currentArticle.main.absolute_url
                          .split("/")[3]
                          .split("?")[0]
                      }
                    />
                  </div>
                </div>
              )}
              <p className="AcademyArticleDate">
                {formatOneDate(currentArticle.created_at)}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              ></div>
              <div style={{ minHeight: "20px" }}></div>
              <div className="center">
                <div
                  className="center"
                  style={{ width: "100%", maxWidth: "800px" }}
                >
                  <ArticleGallery
                    gallery={currentArticle.gallery}
                  ></ArticleGallery>
                </div>
              </div>
              {hasNextArticle && (
                <p className="ArticleNext" onClick={OnNextArticleOnClick}>
                  {" "}
                  Ver siguiente entrada
                </p>
              )}
            </div>
          </div>
          <SamsFooter></SamsFooter>
        </div>
      </div>
    </>
  );
}

export default AcademyPage;

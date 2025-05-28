import React from "react";
import { render } from "react-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function ArticlePage({ onReturn }) {
  const handleOnReturn = () => {
    onReturn();
  };

  return (
    <>
      <div className="ArticlePage">
        <div className="ArticlePageContainer">
          <div className="headerSpacer"></div>
          <p onClick={handleOnReturn} className="arrticleText">
            Volver
          </p>

          <div className="ArticleItem">
            <p className="articleTitle">Titulo</p>
            <p style={{ fontStyle: "italic" }} className="arrticleText">
              Fecha
            </p>
          </div>
          <p className="arrticleText">Texto</p>
          <div className="articleImageContainer"></div>
          <LiteYouTubeEmbed id="L2vS_050c-M" />
        </div>

        <p className="articlePageNextArticle"> Ver siguiente entrada</p>
      </div>
    </>
  );
}

export default ArticlePage;

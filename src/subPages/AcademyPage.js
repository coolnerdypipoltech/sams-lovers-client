import React, { useState, useContext } from "react";
import { render } from "react-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import banner from "../assets/test/Banners_Sams_Banner1131x669_Blog@2x.png";
import SamsFooter from "../components/SamsFooter";
import { ElementContextData } from "../context/DataContext";

function AcademyPage({ onReturn }) {

    const { currentArticle } =
    useContext(ElementContextData);

  const handleOnReturn = () => {
    onReturn();
  };

  const [isYoutube, SetIsYoutube] = useState(true);

  return (
    <>
      <div className="AcademyPageContainer">
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
              Sam's Lovers Academy
            </p>
            {!isYoutube ? (
              <img
                style={{ width: "100%", paddingLeft: "0px" }}
                className="imageAcademyItem"
                src={banner}
                alt="bannerLogo"
              ></img>
            ) : (
              <LiteYouTubeEmbed style={{borderRadius: "36px", marginTop: "20px"}} id="L2vS_050c-M" />
            )}
            <p className="AcademyArticleDate">Enero,06 2025</p>
            <p className="AcademyArticleText">
              Contenido del tip, tutorial o noticia. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting
            </p>
            <p className="AcademyArticleText">
              Contenido del tip, tutorial o noticia. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting
            </p>
            <img
              style={{ width: "100%", paddingLeft: "0px" }}
              className="imageAcademyItem"
              src={banner}
              alt="bannerLogo"
            ></img>
            <p className="ArticleNext"> Ver siguiente entrada</p>
          </div>
          <SamsFooter></SamsFooter>
        </div>
      </div>
    </>
  );
}

export default AcademyPage;

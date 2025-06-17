import React from "react";
import { render } from "react-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
function ArticleItem( {article} ) {

  

    return (
      <>
        <div className="ArticleItem">
          
            <p className="articleTitle">Titulo</p>
            <p className="arrticleText">Texto</p>
            <LiteYouTubeEmbed
            style={{pointerEvents: "none"}}
              playerClass="playerBtnThumbnail"
              wrapperClass="playerWrapperThumbnail"
              id="L2vS_050c-M"
              adNetwork={false}
              poster="hqdefault" 
              title="YouTube Embed" 
              cookie={false}
            />
          </div>
      </>
    );
  }
  
  export default ArticleItem;
  
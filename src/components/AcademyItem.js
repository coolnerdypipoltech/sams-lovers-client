
function AcademyItem({ article, doClick }) {
  const handleClick = () => {
    doClick();
  };

  return (
    <>
      <div style={{maxWidth: "500px"}} className="AcademyItemContainer">
        <img className="imageAcademyItem" src={article.thumbnail.absolute_url} alt="bannerLogo"></img>
        <div className="AcademyTextContainer">
          <p className="itemTitle" style={{    lineHeight: "1.2"
}}>
            {article.title}
          </p>
          <p className="itemSubtitle">
            {article.preview_text}
          </p>
          <p onClick={handleClick}  className="itemMoreText">Leer más</p>
        </div>
        <div style={{ height: "10px" }}></div>
      </div>
    </>
  );
}

export default AcademyItem;

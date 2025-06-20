import banner from "../assets/test/Banners_Sams_Banner1131x669_Blog@2x.png";
function AcademyItem({ article, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <div className="AcademyItemContainer">
        <img className="imageAcademyItem" src={article.thumbnail.absolute_url} alt="bannerLogo"></img>
        <div className="AcademyTextContainer">
          <p className="itemTitle">
            {article.title}
          </p>
          <p className="itemSubtitle">
            {article.preview_text}
          </p>
          <p className="itemMoreText">Leer más</p>
        </div>
        <div onClick={handleClick} style={{ height: "10px" }}></div>
      </div>
    </>
  );
}

export default AcademyItem;

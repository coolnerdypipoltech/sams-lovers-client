import banner from "../assets/test/Banners_Sams_Banner1131x669_Blog@2x.png";
function AcademyItem({ article, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <div className="AcademyItemContainer">
        <img className="imageAcademyItem" src={banner} alt="bannerLogo"></img>
        <div className="AcademyTextContainer">
          <p className="itemTitle">
            Qué es Sam's Lovers, la nueva campaña de Sam's Club?
          </p>
          <p className="itemSubtitle">
            "Sam's Lovers" es una emocionante campaña de Sam's Club que busca
            recompensar la fidelidad de sus socios
          </p>
          <p className="itemMoreText">Leer más</p>
        </div>
        <div onClick={handleClick} style={{ height: "10px" }}></div>
      </div>
    </>
  );
}

export default AcademyItem;

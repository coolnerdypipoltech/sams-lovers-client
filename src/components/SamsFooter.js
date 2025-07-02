import { useState, useContext, useEffect, useRef } from "react";
import samsLogo from "../assets/Brand_SamsLovers.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import whatsapp from "../assets/Icon_whatsapp.svg";
import { ElementContextData } from "../context/DataContext";

const SamsFooter = () => {

  const { initRequestFooterLinks, footerLinksData } = useContext(ElementContextData);

  const footerLinksDataRelated = useRef(footerLinksData.current);
  const [socialMedia, setSocialMedia] = useState([
    {social_media: "facebook", link: footerLinksDataRelated.current?.facebook_url, icon: facebook},
    {social_media: "instagram", link: footerLinksDataRelated.current?.instagram_url, icon: instagram},
    {social_media: "tiktok", link: footerLinksDataRelated.current?.tiktok_url, icon:tiktok },
    {social_media: "youtube", link: footerLinksDataRelated.current?.youtube_url, icon: youtube},
    {social_media: "x", link: footerLinksDataRelated.current?.x_url, icon: X},
    {social_media: "whatsapp", link: footerLinksDataRelated.current?.whatsapp_url, icon: whatsapp}
  ]);

  useEffect(() => {
    handleInitRequestFooterLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInitRequestFooterLinks = async () => {
    await initRequestFooterLinks();
    footerLinksDataRelated.current = footerLinksData.current;
    setSocialMedia([
    {social_media: "facebook", link: footerLinksDataRelated.current?.facebook_url, icon: facebook},
    {social_media: "instagram", link: footerLinksDataRelated.current?.instagram_url, icon: instagram},
    {social_media: "tiktok", link: footerLinksDataRelated.current?.tiktok_url, icon:tiktok },
    {social_media: "youtube", link: footerLinksDataRelated.current?.youtube_url, icon: youtube},
    {social_media: "x", link: footerLinksDataRelated.current?.x_url, icon: X},
    {social_media: "whatsapp", link: footerLinksDataRelated.current?.whatsapp_url, icon: whatsapp}
  ]);

  }

  const handleOpenSocialMedia = (_socialMedia, _userName) => {
    const split = _userName.split('@');
    switch(_socialMedia){
      case "facebook":
        window.open(_userName);
        break;
      case "instagram":
        window.open(`https://www.instagram.com/${split[1]}`);
        break;
      case "tiktok":
        window.open(`https://www.tiktok.com/${_userName}`);
        break;
      case "x":
        window.open(`https://www.x.com/${split[1]}`);
        break;
      case "youtube":
        window.open(`https://www.youtube.com/${split[1]}`);
        break;
      case "whatsapp":
        window.open(_userName);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="footerBackground">
        <img
          className=""
          src={samsLogo}
          style={{ height: "33px", paddingTop: "40px" }}
          alt="SamsLogo"
        ></img>
        {socialMedia != null ? (
            <>
            <div className="socialMediaContainer">
              {socialMedia.map((item, index) => (
                ((item !== null) && (item?.link !== null) && (item?.link !== "")) && (<img onClick={() => {
                  window.open(handleOpenSocialMedia(socialMedia[index].social_media, socialMedia[index].link));
                }} key={index} src={socialMedia[index].icon} alt={`${item} logo`} />))
              )}
            </div>
            </>
          ) : (
            <></>
          )}
        <div>
          {((footerLinksData.current !== null) && (footerLinksData.current?.privacy_url !== null) && (footerLinksData.current?.privacy_url !== "")) && (<p onClick={() => {
                  window.open(footerLinksData.current.privacy_url);
                }} style={{ marginTop: "15px" }} className="footerText">Aviso de Privacidad</p>)}
          {((footerLinksData.current !== null) && (footerLinksData.current?.terms_url !== null) && (footerLinksData.current?.terms_url !== "")) && (<p onClick={() => {
                  window.open(footerLinksData.current.terms_url);
                }} style={{ marginTop: "15px" }} className="footerText">
            Términos y Condiciones
          </p>)}
        </div>
        <div style={{ width: "90%", paddingBottom: "25px" }}>
          {((footerLinksData.current !== null) && (footerLinksData.current?.copy_url !== "")) && (<p className="footerText">
            {footerLinksData.current?.copy_url}
          </p>)}
        </div>
      </div>
    </>
  );
};

export default SamsFooter;

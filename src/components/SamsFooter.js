import { useState, useContext, useEffect } from "react";
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

  const iconMap = {
    fb: facebook,
    insta: instagram,
    tiktok: tiktok,
    x: X,
    YT: youtube,
    WT: whatsapp,
  };

  const [links, setLinks] = useState([
    "fb",
    "insta",
    "tiktok",
    "x",
    "YT",
    "WT",
  ]);

  useEffect(() => {
    initRequestFooterLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLinkFromIndex = (_socialMedia) => {
    switch (_socialMedia) {
      case "fb":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.facebook_url);
      case "insta":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.instagram_url);
      case "tiktok":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.tiktok_url);
      case "x":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.x_url);
      case "YT":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.youtube_url);
      case "WT":
        return handleOpenSocialMedia(_socialMedia, footerLinksData.current.whatsapp_url);
      default:
        return null;
    }
  }

  const handleOpenSocialMedia = (_socialMedia, _username) => {
    const split = _username.split('@');
    switch(_socialMedia){
      case "fb":
        window.open(_username);
        break;
      case "insta":
        window.open(`https://www.instagram.com/${split[1]}`);
        break;
      case "tiktok":
        window.open(`https://www.tiktok.com/${_username}`);
        break;
      case "x":
        window.open(`https://www.x.com/${split[1]}`);
        break;
      case "YT":
        window.open(`https://www.youtube.com/${split[1]}`);
        break;
      case "WT":
        window.open(_username);
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
          onClick={() => {window.open(footerLinksData.current.copy_url);}}
        ></img>
        <div style={{ paddingTop: "10px", gap: "12px" }} className="rowAlign">
          {links.map((key, index) => (
            <img onClick={() => {
                  window.open(getLinkFromIndex(links[index]));
                }} key={index} src={iconMap[key]} alt={`${key} logo`} />
          ))}
        </div>
        <div>
          <p onClick={() => {
                  window.open(footerLinksData.current.privacy_url);
                }} style={{ marginTop: "15px" }} className="footerText">Aviso de Privacidad</p>
          <p onClick={() => {
                  window.open(footerLinksData.current.terms_url);
                }} style={{ marginTop: "15px" }} className="footerText">
            Términos y Condiciones
          </p>
        </div>
        <div style={{ width: "90%", paddingBottom: "25px" }}>
          <p className="footerText">
            SAM'S CLUB es una marca licenciada a Nueva Wal-Mart de México S. de
            R.L. de C.V. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
};

export default SamsFooter;

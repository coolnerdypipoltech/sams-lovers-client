import { useEffect, useContext } from "react";
import "../styles/Main.css";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import logo from "../assets/Imagen_Perfil.png";
import banner from "../assets/RetoCreadoresBanner1131x669@2x.png"
import SamsLoversMonth from "../components/SamsLoversMonth";
import logoLetters from "../assets/Brand_SamsLovers.svg";
import SamsFooter from "../components/SamsFooter";
import SamsLoversRankingList from "../components/SamsLoversRankingList";

import chevronUp from "../assets/Icon_Subir.svg"
function Main() {
  const { changeRoute } = useContext(ElementContextRoute);
  const { UserData, initMainPage, mainPageData } = useContext(ElementContextData);

  useEffect(() => {
    initMainPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeeChallengesAction = () => {
    changeRoute("Challenges");
    }

  const handleGoUp = () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth" // puedes usar "auto" si no quieres animación
  });
  }

  return (
    <>
      <div className="landingPageContainer">
        <div style={{zIndex: 2}}>
          <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <img src={logo} alt="logoSL" style={{width: "220px"}} className="DiamondImage"></img>
        <p style={{marginBottom: "05x"}} className="LandingPageTitle">Bienvenido a </p>
        <p style={{marginTop: "0px"}} className="LandingPageTitle">Sam's Lovers</p>
        </div>
        <div  className="backgroundLogoLetters">
          <img className="LogoLettersFade" src={logoLetters} alt="backgroundLogo"></img>
        </div>
        <p className="UserNameText">{`¡Hola, ${UserData.current.user.name}!`}</p>
        {(mainPageData !== null && <img src={mainPageData.home_banner.absolute_url} className="bannerImage" alt="banner"></img>)}
        <div style={{width: "70%", maxWidth: "300px", paddingTop: "30px"}}>
        <button className="GeneralButton4" onClick={handleSeeChallengesAction}>Conoce los retos del mes</button>
        </div>
        <p className="LandingPageTitle">Tú puedes ser nuestro próximo Sam's Lover del mes</p>
        <p className="LandingPageText">Súmate al reto, muestra lo mejor de ti y llévate premios únicos. ¿Tienes lo necesario para ser el próximo Sam's Lovers del mes?</p>
        <SamsLoversMonth sams_lover={mainPageData?.sams_lover}></SamsLoversMonth>
        <div style={{height: "30px"}} className="headerSpacer"></div>
        <SamsLoversRankingList></SamsLoversRankingList>
        <div style={{height: "30px"}} className="headerSpacer"></div>
        <SamsFooter></SamsFooter>
      </div>
      <div onClick={handleGoUp} className="overlayMenuUp">
        <img src={chevronUp} alt="up"></img>
      </div>
    </>
  );
}

export default Main;

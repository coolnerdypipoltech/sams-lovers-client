import "../styles/Landing.css";
import logo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import shimmer from "../assets/Rectángulo 302.gif"

import { useContext, useEffect } from "react";
import { ElementContextRoute } from "../context/RouteContext";
import SamsFooter from "../components/SamsFooter"
import { ElementContextData } from "../context/DataContext";

function Landing() {

  const { setLoginToken, changeRoute, registerFlow } = useContext(ElementContextRoute);
  const { initLandingPage, landingPageData } = useContext(ElementContextData);

  useEffect(() => {
        initLandingPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  const onclickLogin = () => {
    changeRoute("Login");
    registerFlow.current = false
  };

  const onclickRegister = () => {
    changeRoute("Login");
    registerFlow.current = true
  };

  return (
    <>
      <div className="landingPageContainer">
        <div className="header-container">
          <img className="header-logo" alt="logo" src={logo}></img>
          <div className="LoginLandingButton">
            <button onClick={onclickLogin} className="GeneralButton">Iniciar sesión</button>
          </div>
        </div>

        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        {landingPageData !== null ? (<img src={landingPageData?.main_banner.absolute_url} className="bannerImage" alt="banner"></img>) : <img src={shimmer} className="bannerImage" alt="banner"></img>}
        <p className="LandingPageTitle">Sam's me da más</p>
        <p className="LandingPageText">Pon a prueba tus habilidades, 
          completa los desafíos y acumula puntos 
          para ganar grandiosos premios.</p>
        <div style={{width: "70%", maxWidth: "300px"}}>
          <button onClick={onclickRegister} className="GeneralButton4">Regístrate</button>
        </div>
        {landingPageData !== null ? (<img src={landingPageData?.registration_banner.absolute_url} className="bannerImage" style={{paddingBottom: "30px"}} alt="banner"></img>) : <img src={shimmer} className="bannerImage" style={{paddingBottom: "30px"}} alt="banner"></img>}
       <SamsFooter></SamsFooter>

      </div>

    </>
  );
}

export default Landing;

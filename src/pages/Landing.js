import "../styles/Landing.css";
import logo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import banner from "../assets/Banner_1@2x.png"
import banner2 from "../assets/Banner_2@2x.png"
import { useContext } from "react";
import { ElementContextRoute } from "../context/RouteContext";
import SamsFooter from "../components/SamsFooter"
function Landing() {
  const { setLoginToken, changeRoute, registerFlow } = useContext(ElementContextRoute);

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
          <div style={{width: "200px", paddingRight: "2.5%"}}>
            <button onClick={onclickLogin} className="GeneralButton">Iniciar sesión</button>
          </div>
          
        </div>

        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <img src={banner} className="bannerImage" alt="banner"></img>
        <p className="LandingPageTitle">Sam's me da más</p>
        <p className="LandingPageText">Pon a prueba tus habilidades, 
          completa los desafíos y acumula puntos 
          para ganar grandiosos premios.</p>
        <div style={{width: "70%", maxWidth: "300px"}}>
          <button onClick={onclickRegister} className="GeneralButton4">Regístrate</button>
        </div>
        <img src={banner2} className="bannerImage" style={{paddingBottom: "30px"}} alt="banner"></img>

       <SamsFooter></SamsFooter>

      </div>

    </>
  );
}

export default Landing;

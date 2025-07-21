
import iconHome from "../assets/headerMenu/Icon_Inicio.svg";
import iconProfile from "../assets/headerMenu/Icon_Perfil.svg";
import iconChallenges from "../assets/headerMenu/Icon_Retos.svg"
import iconCode from "../assets/headerMenu/Icon_Codigos.svg"
import iconRewards from "../assets/headerMenu/Icon_Recompensas.svg"
import iconAcademy from "../assets/headerMenu/Icon_Sams_Lovers_Academy.svg"
import iconConfig from "../assets/headerMenu/Icon_Configuracion.svg"
import iconClose from "../assets/headerMenu/Icon_Cerrar_sesion.svg"
import "../styles/headerMenu.css";
import BackgroundSams from "./BackgroundSams";
import { useEffect } from "react";
function HeaderMenu({ handleBack, handleMenuRoute, handleLogOut }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowY = "";
    document.body.style.overflowX = "";
    };
  }, []);
  return (
    <>
      <div className="header-menu">


        <BackgroundSams></BackgroundSams>

        <p className="headerMenuBack" onClick={handleBack}>
          Volver
        </p>
        <div className="headerMenuColumn">
          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconHome}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Main")}
            >
              Inicio
            </div>
          </div>

          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconProfile}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Profile")}
            >
              Perfil
            </div>
          </div>

          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconChallenges}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Challenges")}
            >
              Retos
            </div>
          </div>
          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconCode}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Codes")}
            >
              Códigos
            </div>
          </div>
          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconRewards}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Rewards")}
            >
              Recompensas
            </div>
          </div>

          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconAcademy}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Academy")}
            >
              Sam's Lovers Academy
            </div>
          </div>
          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconConfig}></img>
            <div
              className="headerElement"
              onClick={(e) => handleMenuRoute("Config")}
            >
              Configuración
            </div>
          </div>
          <div style={{ height: "10px" }}></div>

          <div className="rowAlign">
            <img alt="logo" className="iconLogo" src={iconClose}></img>
            <div className="headerElement" onClick={(e) => handleLogOut()}>
              Cerrar sesión
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;

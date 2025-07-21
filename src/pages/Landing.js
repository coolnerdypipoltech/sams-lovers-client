import "../styles/Landing.css";
import logo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import shimmer from "../assets/Rectángulo 302.gif";

import { useContext, useEffect, useRef, useState } from "react";
import { ElementContextRoute } from "../context/RouteContext";
import SamsFooter from "../components/SamsFooter";
import { ElementContextData } from "../context/DataContext";
import { ElementContextPopUp } from "../context/PopUpContext";
import useIndexedDB from "../hooks/useIndexedDB";
function Landing() {
  const {
    changeRoute,
    registerFlow,
    persistLogin,
    hasSavedData,
    deleteSavedItems,
  } = useContext(ElementContextRoute);
  const {  isInitialize, } = useIndexedDB();
  const { changePopUpLoading } = useContext(ElementContextPopUp);
  const { initLandingPage, landingPageData, SetUserData } =
    useContext(ElementContextData);
  let loadingPersistanceLogIn = useRef(false);
  let errorPopUpTitle = useRef("");
  let errorPopUpContent = useRef("");
  const [popUpResponse, setPopUpResponse] = useState("");
  let popUpContent = <></>;
  useEffect( () => {
    Init()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialize]);

  const Init = async () => {
  await TryPersistLogIn();
    initLandingPage();
  }

  const TryPersistLogIn = async () => {
    if (loadingPersistanceLogIn.current) return;

    loadingPersistanceLogIn.current = true;
    
    const result = await hasSavedData();
    if (!result) {
      loadingPersistanceLogIn.current = false;
      return;
    }
    
    changePopUpLoading(true);

    const response = await persistLogin();

    try {
      const data = await response.json();
      if (response.ok) {
        SetUserData(data);
        loadingPersistanceLogIn.current = false;
        changeRoute("Main");
      } else {
        if (data.message) {
          await deleteSavedItems();
          switch (data.message) {
            case "api.error.unauthorized":
              openTokenExpiredErrorPopUp();
              break;
            default:
              openGeneralErrorPopUp();
              break;
          }
        }
      }
    } catch {
      await deleteSavedItems();
      openGeneralErrorPopUp();
    }

    loadingPersistanceLogIn.current = false;
    changePopUpLoading(false);
  };

  const openGeneralErrorPopUp = () => {
    errorPopUpTitle.current =
      "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    errorPopUpContent.current = "Vuelve a intentar más tarde.";
    setPopUpResponse("Error");
  };

  const openTokenExpiredErrorPopUp = () => {
    errorPopUpTitle.current = "Lo sentimos, ha ocurrido un error.";
    errorPopUpContent.current =
      "Tú sesión anterior ha expirado. Vuelve a inicar sesión con correo y contraseña.";
    setPopUpResponse("Error");
  };

  const onclickLogin = () => {
    changeRoute("Login");
    registerFlow.current = false;
  };

  const onclickRegister = () => {
    changeRoute("Login");
    registerFlow.current = true;
  };

    const handlePopUpClose = () => {
    setPopUpResponse(null);
  };

  if (popUpResponse === "Error") {
    popUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {errorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {errorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handlePopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <>
      <>{popUpContent}</>
      <div className="landingPageContainer">
        <div className="header-container">
          <img className="header-logo" alt="logo" src={logo}></img>
          <div className="LoginLandingButton">
            <button onClick={onclickLogin} className="GeneralButton">
              Iniciar sesión
            </button>
          </div>
        </div>

        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        {landingPageData !== null ? (
          <img
            src={landingPageData?.main_banner.absolute_url}
            className="bannerImage"
            alt="banner"
          ></img>
        ) : (
          <img src={shimmer} className="bannerImage" alt="banner"></img>
        )}
        <p className="LandingPageTitle">Sam's me da más</p>
        <p className="LandingPageText">
          Pon a prueba tus habilidades, completa los desafíos y acumula puntos
          para ganar grandiosos premios.
        </p>
        <div style={{ width: "70%", maxWidth: "300px" }}>
          <button onClick={onclickRegister} className="GeneralButton4">
            Regístrate
          </button>
        </div>
        {landingPageData !== null ? (
          <img
            src={landingPageData?.registration_banner.absolute_url}
            className="bannerImage"
            style={{ paddingBottom: "30px", paddingTop: "30px" }}
            alt="banner"
          ></img>
        ) : (
          <img
            src={shimmer}
            className="bannerImage"
            style={{ paddingBottom: "30px" }}
            alt="banner"
          ></img>
        )}
        <SamsFooter></SamsFooter>
      </div>
    </>
  );
}

export default Landing;

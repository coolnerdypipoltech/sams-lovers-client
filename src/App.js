import { ElementContextRoute } from "./context/RouteContext";
import { ElementContextPopUp } from "./context/PopUpContext";
import React, { useContext } from "react";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./pages/Main";
import Codes from "./pages/Codes";
import Landing from "./pages/Landing";
import Academy from "./pages/Academy";
import Config from "./pages/Config";
import loadingGif from "./assets/LoadingGif.gif"
import backgroundImage from "./assets/headerMenu/Gradient.png";
function App() {
  const { route } = useContext(ElementContextRoute);
  const { popUpText, closePopUp, popUpTitle, popUpLoading } = useContext(ElementContextPopUp);
  let currentPage;
  // eslint-disable-next-line default-case
  switch (route) {
    case "":
      currentPage = <Landing></Landing>;
      break;
      case "Landing":
      currentPage = <Landing></Landing>;
      break;
    case "Login":
      currentPage = <Login></Login>;
      break;

    case "Config":
      currentPage = (
        <>
          <Header></Header>
          <Config></Config>
        </>
      );
      break;

    case "Academy":
      currentPage = (
        <>
          <Header></Header>
          <Academy></Academy>
        </>
      );
      break;
    case "Main":
      currentPage = (
        <>
          <Header></Header>
          <Main></Main>
        </>
      );
      break;
      case "Codes":
      currentPage = (
        <>
          <Header></Header>
          <Codes></Codes>
        </>
      );
      break;
    case "Rewards":
      currentPage = (
        <>
          <Header></Header>
          <Rewards></Rewards>
        </>
      );
      break;
    case "Challenges":
      currentPage = (
        <>
          <Header></Header>
          <Challenges></Challenges>
        </>
      );
      break;
    case "Profile":
      currentPage = (
        <>
          <Header></Header>
          <Profile></Profile>
        </>
      );
      break;
    default:
      currentPage = <Login></Login>;
      break;
  }

  const handleClosePopUp = () => {
    closePopUp();
  };

  return (
    <div className="App">
      {popUpText !== "" ? (
        <div className="PopUp">
          <div className="PopUpDialog">
            <div className="GeneralButtonContainer">
              <p className="PopUpTitle">{popUpTitle}</p>
              <p className="PopUpText">{popUpText}</p>
              <button className="GeneralButton3" onClick={handleClosePopUp}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {popUpLoading ? (
        <div className="backgroundContainer">
          <img
          className="background"
          alt="background"
          src={backgroundImage}
        ></img>
        <div className="loadingGifContainer">
          <img src={loadingGif} className="loadingGif" alt="loading"></img>
        </div>
          
        </div>
      ) : (
        <></>
      )}
      <>{currentPage}</>
    </div>
  );
}

export default App;

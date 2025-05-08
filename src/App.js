import { ElementContextRoute } from "./context/RouteContext";
import { ElementContextPopUp } from "./context/PopUpContext";
import React, { useContext } from "react";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import Retos from "./pages/Retos"
import Profile from "./pages/Profile"
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./pages/Main";

function App() {
  const { route } = useContext(ElementContextRoute);
  const { popUpText, closePopUp, popUpTitle } = useContext(ElementContextPopUp);
  let currentPage;
  // eslint-disable-next-line default-case
  switch (route) {
    case "":
      currentPage = <Login></Login>;
      break;
    case "Login":
      currentPage = <Login></Login>;
      break;
      case "Main":
      currentPage = <><Header></Header><Main></Main></>;
      break;
    case "Rewards":
      currentPage = <><Header></Header><Rewards></Rewards></>;
      break;
    case "Retos":
      currentPage = <><Header></Header><Retos></Retos></>;
      break;
    case "Profile":
      currentPage = <><Header></Header><Profile></Profile></>;
      break;
      default:
      currentPage = <Login></Login>;
      break;

  }

  const handleClosePopUp = () => {
    closePopUp()
  }

  return (


    <div className="App">
      {popUpText !== "" ? (
        <div className="PopUp">
          <div className="PopUpDialog">
          <p className="PopUpText">{popUpTitle}</p>
            <p className="PopUpText">{popUpText}</p>
            <button className="PopUpButton" onClick={handleClosePopUp}>Close</button> 
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

import "../styles/Components.css";
import logo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import iconMenu from "../assets/Icon_menu.svg";
import diamond from "../assets/diamond.svg";
import { useContext, useState, useEffect } from "react";
import HeaderMenu from "./HeaderMenu";
import { ElementContextRoute } from "../context/RouteContext";
import { ElementContextData } from "../context/DataContext";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { route, changeRoute, deleteSavedItems } = useContext(ElementContextRoute);
  const { userDiamonds, SetUserData } = useContext(ElementContextData);

  const handleMenuRoute = (pageToTravelTo) => {
    changeRoute(pageToTravelTo);
    setMenuVisible(false);
  };

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  };

  const handleOnClickLogo = () => {
    if(route !== "Main") {
      changeRoute("Main");
    setMenuVisible(false);
    }
  }

  return (
    <>
      <div className="header-container">
        <img
          className="header-logo"
          alt="logo"
          src={logo}
          onClick={handleOnClickLogo}
        ></img>
        <div className="rowAlign">
          <div className="header-diamonds-container">
            <img
              className="header-diamonds-image"
              src={diamond}
              alt="diamond"
            ></img>
            <p className="header-diamonds-text">{userDiamonds}</p>
          </div>
          <img
            className="header-menu-icon"
            alt="options-menu"
            src={iconMenu}
            onClick={(e) => setMenuVisible(!menuVisible)}
          ></img>
        </div>
      </div>
      {menuVisible && (
        <HeaderMenu
          handleBack={(e) => setMenuVisible(!menuVisible)}
          handleMenuRoute={handleMenuRoute}
          handleLogOut={handleLogOut}
        >
          {" "}
        </HeaderMenu>
      )}
    </>
  );
}

export default Header;

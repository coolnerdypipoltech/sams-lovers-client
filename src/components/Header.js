import "../styles/Components.css";
import logo from "../assets/Brand_SamsLovers.svg";
import iconMenu from "../assets/Icon_menu.svg";
import diamond from "../assets/diamond.svg";
import { useContext, useState } from "react";
import HeaderMenu from "./HeaderMenu";
import { ElementContextRoute } from "../context/RouteContext";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { changeRoute } = useContext(ElementContextRoute);

  const handleMenuRoute = (pageToTravelTo) => {
    console.log(pageToTravelTo);
    changeRoute(pageToTravelTo);
  };

  const handleLogOut = () => {
    console.log("Log Out");
  };

  return (
    <>
      <div className="header-container">
        <img
          className="header-logo"
          alt="logo"
          src={logo}
        ></img>
        <div className="rowAlign">
          <div className="header-diamonds-container">
            <img
              className="header-diamonds-image"
              src={diamond}
              alt="diamond"
            ></img>
            <p className="header-diamonds-text">10</p>
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

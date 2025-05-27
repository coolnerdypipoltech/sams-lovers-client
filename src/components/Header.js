import "../styles/Components.css";
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
          src="/sams-lovers-client/static/media/Brand_SamsLovers.cd3316c5163e4c0b96992c9a0dd68168.svg"
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
        <div
          className="header-menu-container"
          onClick={(e) => setMenuVisible(!menuVisible)}
        >
          <HeaderMenu
            handleMenuRoute={handleMenuRoute}
            handleLogOut={handleLogOut}
          >
            {" "}
          </HeaderMenu>
        </div>
      )}
    </>
  );
}

export default Header;

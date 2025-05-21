import "../styles/Components.css";
import hamburguerIcon from "../assets/hamburger_icon_white.png"
import diamond from "../assets/diamond.png"
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
        <img className="header-logo" alt="logo" src="/sams-lovers-client/static/media/Brand_SamsLovers.cd3316c5163e4c0b96992c9a0dd68168.svg"></img>
        <div className="header-diamonds-container">
          <img className="header-diamonds-image" src={diamond} alt="diamond"></img>
          <p className="header-diamonds-text">10</p>
        </div>
        <img className="header-hambuerguer-icon" alt="options-menu" src={hamburguerIcon} onClick={e => setMenuVisible(!menuVisible)}></img>
      </div>
      {menuVisible && (<div className="header-menu-container" onClick={e => setMenuVisible(!menuVisible)}>
        <HeaderMenu handleMenuRoute={handleMenuRoute} handleLogOut={handleLogOut}> </HeaderMenu>
      </div>)}
    </>
  );
}

export default Header;
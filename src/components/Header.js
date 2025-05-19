import "../styles/Components.css";
import logo from "../assets/samsLogo.webp";
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
      <div className="headerContainer">
        <img src={logo} className="headerLogo" alt="logo"></img>
        <p>Diamantes</p>
        <button onClick={e => setMenuVisible(!menuVisible)}>Menú</button>
      </div>
      <div className="header-menu-container">
        {menuVisible && (<HeaderMenu handleMenuRoute={handleMenuRoute} handleLogOut={handleLogOut}> </HeaderMenu>)}
      </div>
    </>
  );
}

export default Header;
import "../styles/Components.css";
import logo from "../assets/samsLogo.webp";
import {useState} from "react";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuRoute = (pageToTravelTo) => {
    console.log(pageToTravelTo);
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
import "../styles/Components.css";
import logo from "../assets/samsLogo.webp";
import { ElementContextRoute } from "../context/RouteContext";
import { useContext } from "react";
function Header() {
  const { changeRoute } = useContext(ElementContextRoute);

  const onClickProfile = async () => {
    changeRoute("Profile");
  };

  const onClickMain = async () => {
    changeRoute("Main");
  };

  return (
    <>
      <div className="headerContainer">
        <img src={logo} onClick={onClickProfile} className="headerLogo" alt="logo"></img>
        <p onClick={onClickMain}>Diamantes</p>
        <p>Menú</p>
      </div>
    </>
  );
}

export default Header;

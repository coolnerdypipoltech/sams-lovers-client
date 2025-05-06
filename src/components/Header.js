import "../styles/Components.css";
import logo from "../assets/samsLogo.webp";

function Header() {
  return (
    <>
      <div className="headerContainer">
        <img src={logo} className="headerLogo" alt="logo"></img>
        <p>Diamantes</p>
        <p>Menú</p>
      </div>
    </>
  );
}

export default Header;

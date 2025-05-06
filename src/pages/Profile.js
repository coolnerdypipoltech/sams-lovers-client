import "../styles/Profile.css";
import logo from "../assets/samsLogo.webp";
import chevronRight from "../assets/chevronRight.svg"
import { useState } from "react";
function Profile() {
  const [createUser, setCreateUser] = useState(false);
const [menuType, setMenuType] = useState("Password");

  return (
    <>
      <div className="ProfileContainer">
        <p className="Title">Mi Perfil</p>

        <div className="ProfileContainer">

            <div className="containerProfilePic"><p className="EditProfile">Editar</p></div>
            <p className="userNameProfile">Usuario SamsLovers</p>

            <div className="socialMediaContainer">
                <div className="socialMediaItem"></div>
                <div className="socialMediaItem"></div>
                <div className="socialMediaItem"></div>
                <div className="socialMediaItem"></div>
            </div>

            <div className="ProfileItem">
                <p>Mis Rewards</p>
                <img src={chevronRight} alt="openImg"></img>
            </div>
        </div>

        

      </div>
    </>
  );
}

export default Profile;

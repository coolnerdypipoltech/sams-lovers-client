import "../styles/Profile.css";
import MyRewards from "../subPages/MyRewards";
import SelectedMiReward from "../subPages/SelectedMiReward";
import chevronRight from "../assets/chevronRight.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import ImagePicker from "../components/ImagePicker";
import EditProfilePage from "../subPages/EditProfilePage";
import { useState } from "react";
import logo from "../assets/profilePic.jpg";
function Profile() {
  const [subPage, setSubPage] = useState("ConfirmationPage");
  const [socialMedia, setSocialMedia] = useState([{link: "https://www.google.com", icon: facebook}, {link: "https://www.google.com", icon: instagram}, {link: "https://www.google.com", icon:tiktok }, {link: "https://www.google.com", icon: youtube}, {link: "https://www.google.com", icon: X} ]);
  const [imageSrc, setImageSrc] = useState(null);
  let subPageContent = null;


  const handleSelectReward = () => {
    setSubPage("RewardPage");
  };

  const handleEditProfile = () => {
    setSubPage("EditProfilePage");
  };

  const handleReturn = () => {
    setSubPage("");
  };

  const handleOpenSocialMedia = (_socialMedia) => {
    window.open(_socialMedia)
  }

  const handleSelectItem= () => {
    setSubPage("SelectRewardPage");
  };

  if (subPage === "RewardPage") {
    subPageContent = (
      <MyRewards
        selectPage={handleSelectItem}
        returnPage={handleReturn}
      ></MyRewards>
    );
  }

  if(subPage === "EditProfilePage"){
    subPageContent = (
      <EditProfilePage onReturn={handleReturn}></EditProfilePage>
    )
  }

  if (subPage === "SelectRewardPage") {
    subPageContent = <SelectedMiReward returnPage={handleReturn}></SelectedMiReward>;
  }

  return (
    <>
      <>{subPageContent} </>

      <div className="ProfileContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <p className="ProfileTitle">Mi Perfil</p>
        <div className="containerProfilePic">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Imagen seleccionada"
            className="imageProfilePic"
          />
        ) : <img
            src={logo}
            alt="Imagen por defecto"
            className="imageProfilePic"
          />
        }
        <p  className="EditProfile">
          Editar
        </p>
        </div>
        <div className="ProfileContainerItems">
          
          <p className="userNameProfile">Usuario SamsLovers</p>
          

          <div className="editSocialMediaButtonContainer">
            <p className="socialMediaTitle">Redes sociales</p>
            <p onClick={handleEditProfile}   className="editSocialMediaButton">Editar</p>
          </div>
        
          {socialMedia != null ? (<>
          <div className="socialMediaContainer">
          {socialMedia.map((item, index) => (
             <img src={item.icon} key={index} onClick={() => handleOpenSocialMedia(item)} ></img>
          ))}
        </div>
        <div style={{backgroundColor: "white"}} className="Divider"></div>
        </>
        
      ) : (
        <></>
      )}


          <div onClick={handleSelectReward} className="ProfileItem">
            <p className="profileRewardsText">Ver mis canjes</p>
            <img src={chevronRight} alt="openImg"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

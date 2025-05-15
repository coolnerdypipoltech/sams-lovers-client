import "../styles/Profile.css";
import MisRewards from "../subPages/MisRewards";
import SelectedMiReward from "../subPages/SelectedMiReward";
import chevronRight from "../assets/chevronRight.svg";
import ImagePicker from "../components/ImagePicker";
import EditProfilePage from "../subPages/EditProfilePage";
import { useState } from "react";
import logo from "../assets/profilePic.jpg";
function Profile() {
  const [subPage, setSubPage] = useState("ConfirmationPage");
  const [socialMedia, setSocialMedia] = useState(["https://www.google.com", "https://www.youtube.com", "https://www.amazon.com.mx" ]);
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
      <MisRewards
        selectPage={handleSelectItem}
        returnPage={handleReturn}
      ></MisRewards>
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
        <p className="Title">Mi Perfil</p>
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
        <p onClick={handleEditProfile} className="EditProfile">
          Editar
        </p>
        </div>
        <div className="ProfileContainer">
          
          <p className="userNameProfile">Usuario SamsLovers</p>

          {socialMedia != null ? (
          <div className="socialMediaContainer">
          {socialMedia.map((item, index) => (
             <div key={index} onClick={() => handleOpenSocialMedia(item)} className="socialMediaItem"></div>
          ))}
        </div>
      ) : (
        <></>
      )}

          <div onClick={handleSelectReward} className="ProfileItem">
            <p>Mis Rewards</p>
            <img src={chevronRight} alt="openImg"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

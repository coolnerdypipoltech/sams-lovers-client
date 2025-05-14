import "../styles/Profile.css";
import MisRewards from "../subPages/MisRewards";
import SelectedMiReward from "../subPages/SelectedMiReward";
import chevronRight from "../assets/chevronRight.svg";
import ImagePicker from "../components/ImagePicker";
import { useState } from "react";
function Profile() {
  const [subPage, setSubPage] = useState("ConfirmationPage");
  const [socialMedia, setSocialMedia] = useState(["https://www.google.com", "https://www.youtube.com", "https://www.amazon.com.mx" ]);
  let subPageContent = null;


  const handleSelectReward = () => {
    setSubPage("RewardPage");
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

  if (subPage === "SelectRewardPage") {
    subPageContent = <SelectedMiReward returnPage={handleReturn}></SelectedMiReward>;
  }

  return (
    <>
      <>{subPageContent} </>

      <div className="ProfileContainer">
        <p className="Title">Mi Perfil</p>
        <ImagePicker></ImagePicker>
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

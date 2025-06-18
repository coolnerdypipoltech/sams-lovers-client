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
import { useState, useContext, useEffect } from "react";
import logo from "../assets/profilePic.jpg";
import { ElementContextData } from "../context/DataContext";

function Profile() {
  const { UserData } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("ConfirmationPage");
  const [socialMedia, setSocialMedia] = useState([{link: "https://www.google.com", icon: facebook}, {link: "https://www.google.com", icon: instagram}, {link: "https://www.google.com", icon:tiktok }, {link: "https://www.google.com", icon: youtube}, {link: "https://www.google.com", icon: X} ]);
  const [imageSrc, setImageSrc] = useState(null);

  let subPageContent = null;

  useEffect(() => {
    initSocialMedia();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectReward = () => {
    setSubPage("RewardPage");
  };

  const handleEditProfile = () => {
    setSubPage("EditProfilePage");
  };

  const handleReturn = () => {
    if(subPage === "SelectRewardPage"){
      setSubPage("RewardPage");
      return;
    }
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

  /*if (subPage === "SelectRewardPage") {
    subPageContent = <SelectedMiReward returnPage={handleReturn}></SelectedMiReward>;
  }*/

  const initSocialMedia = () => {
    setSocialMedia([[{link: UserData.current.user.related.facebook, icon: facebook}, {link: UserData.current.user.related.instagram, icon: instagram}, {link: UserData.current.user.related.tiktok, icon:tiktok }, {link: UserData.current.user.related.youtube, icon: youtube}, {link: UserData.current.user.related.x, icon: X} ]]);
    console.log(socialMedia);
  }

  return (
    <>
      <>{subPageContent} </>
      <div className="ProfileContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <p className="ProfileTitle">Mi Perfil</p>
        <ImagePicker></ImagePicker>
        <div className="ProfileContainerItems">
          <p className="userNameProfile">Usuario SamsLovers</p>
          <div className="editSocialMediaButtonContainer">
            <p className="socialMediaTitle">Redes sociales</p>
            <p onClick={handleEditProfile}   className="editSocialMediaButton">Editar</p>
          </div>
          {socialMedia != null ? (
            <>
              <div className="socialMediaContainer">
                {socialMedia.map((item, index) => {(
                  (item.link !== null) && (<img src={item.icon} key={index} onClick={() => handleOpenSocialMedia(item.link)} alt={`${item.link}`}></img>)
                )})}
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

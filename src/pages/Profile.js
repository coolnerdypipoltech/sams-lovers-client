import "../styles/Profile.css";
import MyRewards from "../subPages/MyRewards";
import SelectedMiReward from "../subPages/SelectedMiReward";
import chevronRight from "../assets/chevronRightBlack.svg";
import facebook from "../assets/iconsBlue/Icon_Facebook.svg";
import instagram from "../assets/iconsBlue/Icon_Instagram.svg";
import tiktok from "../assets/iconsBlue/Icon_Tiktok.svg";
import X from "../assets/iconsBlue/Icon_X.svg";
import youtube from "../assets/iconsBlue/Icon_Youtube.svg";
import EditProfilePage from "../subPages/EditProfilePage";
import { useState, useContext } from "react";
import logo from "../assets/Perfil_default.png";
import { ElementContextData } from "../context/DataContext";

function Profile() {
  const { UserData } = useContext(ElementContextData);

  const [subPage, setSubPage] = useState("ConfirmationPage");

  const userDataRelated = UserData.current.user.related;
  const [socialMedia, setSocialMedia] = useState([
    {social_media: "facebook", link: userDataRelated.facebook, icon: facebook},
    {social_media: "instagram", link: userDataRelated.instagram, icon: instagram},
    {social_media: "tiktok", link: userDataRelated.tiktok, icon:tiktok },
    {social_media: "youtube", link: userDataRelated.youtube, icon: youtube},
    {social_media: "x", link: userDataRelated.x, icon: X}
  ]);

  let subPageContent = null;

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

    if(subPage === "EditProfilePage"){
      const userDataRelated = UserData.current.user.related;
      setSocialMedia([
        {social_media: "facebook", link: userDataRelated.facebook, icon: facebook},
        {social_media: "instagram", link: userDataRelated.instagram, icon: instagram},
        {social_media: "tiktok", link: userDataRelated.tiktok, icon:tiktok },
        {social_media: "youtube", link: userDataRelated.youtube, icon: youtube},
        {social_media: "x", link: userDataRelated.x, icon: X}
      ]);
    }

    setSubPage("");
  };

  const handleOpenSocialMedia = (_socialMedia, _username) => {
    const split = _username.split('@');
    switch(_socialMedia){
      case "instagram":
        window.open(`https://www.instagram.com/${split[1]}`);
        break;
      case "facebook":
        window.open(_username);
        break;
      case "tiktok":
        window.open(`https://www.tiktok.com/${_username}`);
        break;
      case "x":
        window.open(`https://www.x.com/${split[1]}`);
        break;
      case "youtube":
        window.open(`https://www.youtube.com/${split[1]}`);
        break;
      default:
        break;
    }
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

  return (
    <>
      <>{subPageContent} </>
      <div className="ProfileContainer">
        <div className="headerSpacer"></div>
        <div className="headerSpacer"></div>
        <p className="ProfileTitle">Mi Perfil</p>
        <div className="DiamondContainer">
          <img src={logo} className="DiamondImage" alt="ProfileLogo"></img>
        </div>
        <div className="ProfileContainerItems">
          <p className="userNameProfile">Usuario Sam's Lovers</p>
          <div className="editSocialMediaButtonContainer">
            <p className="socialMediaTitle">Redes sociales</p>
            <button onClick={handleEditProfile}  style={{height: "20px", minHeight: "20px", width: "82px", fontSize:"10px", marginTop: "10px"}}  className="GeneralButton4">Editar</button>
          </div>
          {socialMedia != null ? (
            <>
            <div className="socialMediaContainer">
              {socialMedia.map((item, index) => (
                (item.link !== null) && (<img src={item.icon} key={index} onClick={() => handleOpenSocialMedia(item.social_media, item.link)} alt={`${item.link}`}></img>))
              )}
            </div>
            </>
          ) : (
            <></>
          )}
          <div onClick={handleSelectReward} className="ProfileItem">
            <p className="socialMediaTitle">Ver mis recompensas</p>
            <img src={chevronRight} style={{height: "30px", marginTop: "10px"}} alt="openImg"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

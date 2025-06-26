import { useRef, useState, useContext } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import InfoTooltip from "../components/InfoTooltip";
import { UpdateUserInfo } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
import BackgroundSams from "../components/BackgroundSams";

function SocialMedia({ onReturn, onShowMessage }) {

  const { UserData, SetUserData } = useContext(ElementContextData);

  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);
  const [popUpResponse, setPopUpResponse] = useState("");

  const InputFacebook = useRef("");
  const InputInstagram = useRef("");
  const InputTiktok = useRef("");
  const InputX = useRef("");
  const InputYoutube = useRef("");

  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");
  let rewardPopUpContent = <></>;

  const handleSkip = async () => {
    onReturn();
    onShowMessage()
  };

  const handleRewardPopUpClose = () => {
    setPopUpResponse(null);
  }

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  }

  const handleContine = async () => {
    if (inputValidation()) {
      const response = await UpdateUserInfo(`${UserData.current.token_type} ${UserData.current.access_token}`,
         UserData.name,
         InputFacebook.current,
         InputInstagram.current,
         InputTiktok.current,
         InputX.current,
         InputYoutube.current
      );
      const data = await response.json();
      if(response.ok){
        if(data.user !== null){
          SetUserData(data);
          onReturn();
          onShowMessage();
        }
      }else{
        if (data.message) {
          switch(data.message) {
            case "api.error.unauthorized":
              // todo: delete cookie info
              break;
            default:
              openGeneralErrorPopUp();
              break;
          }
        }else{
          openGeneralErrorPopUp();
        }
      }
    }
  };

  const inputValidation = () => {
    const responseF = validateFacebook(InputFacebook.current.value);
    SetErrorInputFacebook(responseF);
    if ( responseF) {
      return true;
    } else {
      return false;
    }
  };

  const validateFacebook = (_userToTest) => {
    if (_userToTest.length === 0) {
      return true;
    }
    const regexFacebook = /^https:\/\/www\.facebook\.com\/.+$/;
    return regexFacebook.test(_userToTest);
  };

  if(popUpResponse === "Error"){
    rewardPopUpContent = (
      <div className="PopUp">
        <div style={{ height: "auto" }} className="PopUpDialog">
          <div className="GeneralButtonContainer">
            <p style={{ marginTop: "30px" }} className="subTitlePopUpReward">
              {rewardErrorPopUpTitle.current}
            </p>

            <p
              style={{ fontWeight: "400", margin: "0px", marginBottom: "20px" }}
              className="subTitlePopUpReward"
            >
              {rewardErrorPopUpContent.current}
            </p>

            <button className="GeneralButton4" onClick={handleRewardPopUpClose}>
              Aceptar
            </button>

            <div style={{ height: "30px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <>{rewardPopUpContent}</>
    
    <div className="subPageContainer">
      <div className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="LoginLogo"></img>
          <img src={samsLogo} alt="Logo" className="LoginLogo"></img>
        </div>

        <div className="createUserContainer">
          <p className="loginTitle">¡Bienvenido a Sam’s Lovers!</p>
          <p className="loginBottomText">
            Compártenos tus redes sociales para obtener grandiosos premios,
            recuerda que tu cuenta debe estar publica para que podamos validar
            las dinámicas.
          </p>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img
                src={tiktok}
                alt="tiktokLogo"
                className="socialMediaIcon"
              ></img>
              <input
                placeholder="usuario"
                className="GeneralInput"
                ref={InputTiktok}
              ></input>
              <InfoTooltip
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n cashi o Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputTiktok === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img
                src={instagram}
                alt="InstagramLogo"
                className="socialMediaIcon"
              ></img>
              <input
                placeholder="usuario"
                className="GeneralInput"
                ref={InputInstagram}
              ></input>
              <InfoTooltip
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “cashi o Walmart.245`}
              ></InfoTooltip>
            </div>

            {errorInputInstagram === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img
                src={facebook}
                alt="FacebookLogo"
                className="socialMediaIcon"
              ></img>
              <input
                placeholder="https://www.facebook.com/cashi"
                className="GeneralInput"
                ref={InputFacebook}
              ></input>
              <InfoTooltip
                text={"Pon el link de tu \n perfil de facebook"}
              ></InfoTooltip>
            </div>
            {errorInputFacebook === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img src={youtube} alt="YTLogo" className="socialMediaIcon"></img>
              <input
                placeholder="usuario"
                className="GeneralInput"
                ref={InputYoutube}
              ></input>
              <InfoTooltip
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “cashi o Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputYoutube === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img src={X} alt="XLogo" className="socialMediaIcon"></img>
              <input
                placeholder="usuario"
                className="GeneralInput"
                ref={InputX}
              ></input>
              <InfoTooltip
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “cashi o Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputX === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <p className="loginBottomText">Estos campos no son obligatorios</p>
          <button className="GeneralButton" onClick={handleContine}>
            Continuar
          </button>

          <div className="GeneralButton2" onClick={handleSkip}>
            Omitir
          </div>

          <div>
            <a
              className="loginBottomText"
              style={{ paddingBottom: "10px" }}
              href="https://www.google.com"
            >
              Términos de uso y Políticas
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SocialMedia;

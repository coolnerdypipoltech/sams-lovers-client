import { useState } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import InfoTooltip from "../components/InfoTooltip";
import BackgroundSams from "../components/BackgroundSams";
import cross from "../assets/clear_input.svg";

function SocialMedia({
  onReturn,
  handleSignIn,
  inputCreateUserFacebook,
  setInputCreateUserFacebook,
  inputCreateUserInstagram,
  setInputCreateUserInstagram,
  inputCreateUserTiktok,
  setInputCreateUserTiktok,
  inputCreateUserX,
  setInputCreateUserX,
  inputCreateUserYoutube,
  setInputCreateUserYoutube
 }) {

  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);

  const handleContine = async () => {
    if(inputValidation()){
      handleSignIn(false);
    }
  };

  const handleOmit = async () => {
    handleSignIn(true);
  };

  const inputValidation = () => {
    const responseF = validateFacebook(inputCreateUserFacebook);
    const responseI = validateUser(inputCreateUserInstagram);
    const responseT = validateUser(inputCreateUserTiktok);
    const responseX = validateUser(inputCreateUserX);
    const responseY = validateUser(inputCreateUserYoutube);

    SetErrorInputFacebook(responseF);
    SetErrorInputInstagram(responseI);
    SetErrorInputTiktok(responseT);
    SetErrorInputX(responseX);
    SetErrorInputYoutube(responseY);
    if (responseY && responseX && responseT && responseI && responseF) {
      return true;
    } else {
      return false;
    }
  };

  const validateUser = (_userToTest) => {
    if (_userToTest.length === 0) {
      return true;
    }
    const userRegex = /^@.+$/;
    return userRegex.test(_userToTest);
  };

  const validateFacebook = (_userToTest) => {
    if (_userToTest.length === 0) {
      return true;
    }
    const regexFacebook = /^https:\/\/www\.facebook\.com\/.+$/;
    return regexFacebook.test(_userToTest);
  };

  return (
    <>
    <div className="subPageContainer">
      <div className="LoginContainer">
        <BackgroundSams></BackgroundSams>
        <div style={{ paddingTop: "125px",overflowY: "scroll", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
          <div className="loginHeaderContainer">
            <p onClick={onReturn} className="loginHeaderText">
              Volver
            </p>
            <img src={samsLogo} alt="Logo" className="LoginLogoHeader"></img>
          </div>
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
                  placeholder="@usuario"
                  className="GeneralInput"
                  value={inputCreateUserTiktok}
                  onChange={e => setInputCreateUserTiktok(e.target.value)}
                ></input>
                <div onClick={() => { setInputCreateUserTiktok(""); }} >
                  <img
                    alt="cross"
                    className="clearCross"
                    src={cross}
                  ></img>
                </div>
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
                  placeholder="@usuario"
                  className="GeneralInput"
                  value={inputCreateUserInstagram}
                  onChange={e => setInputCreateUserInstagram(e.target.value)}
                ></input>
                <div onClick={() => { setInputCreateUserInstagram(""); }} >
                  <img
                    alt="cross"
                    className="clearCross"
                    src={cross}
                  ></img>
                </div>
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
                  placeholder={"https://www.facebook.com/samslovers"}
                  className="GeneralInput"
                  value={inputCreateUserFacebook}
                  onChange={e => setInputCreateUserFacebook(e.target.value)}
                ></input>
                <div onClick={() => { setInputCreateUserFacebook(""); }} >
                  <img
                    alt="cross"
                    className="clearCross"
                    src={cross}
                  ></img>
                </div>
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
                  placeholder="@usuario"
                  className="GeneralInput"
                  value={inputCreateUserYoutube}
                  onChange={e => setInputCreateUserYoutube(e.target.value)}
                ></input>
                <div onClick={() => { setInputCreateUserYoutube(""); }} >
                  <img
                    alt="cross"
                    className="clearCross"
                    src={cross}
                  ></img>
                </div>
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
                  placeholder="@usuario"
                  className="GeneralInput"
                  value={inputCreateUserX}
                  onChange={e => setInputCreateUserX(e.target.value)}
                ></input>
                <div onClick={() => { setInputCreateUserX(""); }} >
                  <img
                    alt="cross"
                    className="clearCross"
                    src={cross}
                  ></img>
                </div>
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
            <div className="GeneralButton2" onClick={handleOmit}>
              Omitir
            </div>
            <div>
              <a
                className="loginBottomText"
                style={{ paddingBottom: "10px" }}
                hvalue="https://www.google.com"
              >
                Términos de uso y Políticas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SocialMedia;

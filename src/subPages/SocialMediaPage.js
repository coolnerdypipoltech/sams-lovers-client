import { useRef, useState, useContext } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import samsLogo from "../assets/Sam's_Club_Logo_2020.svg@2x.png";
import InfoTooltip from "../components/InfoTooltip";


import { ElementContextRoute } from "../context/RouteContext";

function SocialMedia({ onReturn }) {
  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);
  const { changeRoute } = useContext(ElementContextRoute);
 const InputFacebook = useRef("");
  const InputInstagram = useRef("");
  const InputTiktok = useRef("");
  const InputX = useRef("");
  const InputYoutube = useRef("");

  const handleSkip = async () => {
    changeRoute("Main")
  };

  const handleContine = async () => {
    if (inputValidation()) {
      changeRoute("Main")
    }
  };

  const inputValidation = () => {
    const responseF = validateFacebook(InputFacebook.current.value);
    const responseI = validateUser(InputInstagram.current.value);
    const responseT = validateUser(InputTiktok.current.value);
    const responseX = validateUser(InputX.current.value);
    const responseY = validateUser(InputYoutube.current.value);

    SetErrorInputFacebook(responseF);
    SetErrorInputInstagram(responseI);
    SetErrorInputTiktok(responseT);
    SetErrorInputX(responseX);
    SetErrorInputYoutube(responseY);
    if (
      responseY &&
      responseX &&
      responseT &&
      responseI &&
      responseF
    ) {
      return true;
    } else {
      return false;
    }
  };


  const validateUser = (_userToTest) => {
    if (_userToTest.length === 0) {
      return false;
    }
    const userRegex = /^@.+$/;
    return userRegex.test(_userToTest);
  };

  const validateFacebook = (_userToTest) => {
    if (_userToTest.length === 0) {
      return false;
    }
    const regexFacebook = /^https:\/\/www\.facebook\.com\/.+$/;
    return regexFacebook.test(_userToTest);
  };

  return (
    <div className="subPageContainer">
      <div className="LoginContainer">
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
              <img src={tiktok} className="socialMediaIcon"></img>
              <input
                placeholder="@usuario"
                className="GeneralInput"
                ref={InputTiktok}
              ></input>
              <InfoTooltip text={"hola"}></InfoTooltip>
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
                ref={InputInstagram}
              ></input>
              <InfoTooltip text={"hola"}></InfoTooltip>
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
                placeholder="@usuario"
                className="GeneralInput"
                ref={InputFacebook}
              ></input>
              <InfoTooltip text={"hola"}></InfoTooltip>
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
                ref={InputYoutube}
              ></input>
              <InfoTooltip text={"hola"}></InfoTooltip>
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
                ref={InputX}
              ></input>
              <InfoTooltip text={"hola"}></InfoTooltip>
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
              style={{ paddingLeft: "5px" }}
              href="https://www.google.com"
            >
              Términos de uso y Políticas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;

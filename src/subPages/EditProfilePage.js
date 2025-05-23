import { useRef, useState } from "react";
import logo from "../assets/Brand_SamsLovers.svg";
import facebook from "../assets/Icon_Facebook.svg";
import instagram from "../assets/Icon_Instagram.svg";
import tiktok from "../assets/Icon_Tiktok.svg";
import X from "../assets/Icon_X.svg";
import youtube from "../assets/Icon_Youtube.svg";
import InfoTooltip from "../components/InfoTooltip";

function EditProfilePage({ onReturn }) {
  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);

  const InputFacebook = useRef("");
  const InputInstagram = useRef("");
  const InputTiktok = useRef("");
  const InputX = useRef("");
  const InputYoutube = useRef("");

  const handleReturn = async () => {
    onReturn();

  };

  const handleSave = async () => {
    if (inputValidation()) {
      onReturn();
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
    <div className="subPageContainer">
      <div className="EditProfileContainer">

        <div className="createUserContainer">
          <div className="headerSpacer"></div>
          <p onClick={handleReturn} className="EditProfielBack">Volver</p>
          <div style={{width: "90%"}} className="Divider"></div>
          <p style={{color: "black"}} className="loginBottomText">
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
                ref={InputTiktok}
              ></input>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
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
                ref={InputInstagram}
              ></input>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
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
              <InfoTooltip dark={true}
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
                ref={InputYoutube}
              ></input>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
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
                ref={InputX}
              ></input>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputX === false ? (
              <span className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <p style={{color: "black"}} className="loginBottomText">Recuerda que tu cuenta debe estar publica para que se pueda ver tu video</p>
          <button className="GeneralButton4" onClick={handleSave}>
            Guardar
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;

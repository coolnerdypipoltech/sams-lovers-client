import { useRef, useState, useContext, useEffect } from "react";
import { ElementContextData } from "../context/DataContext";
import facebook from "../assets/iconsBlue/Icon_Facebook.svg";
import instagram from "../assets/iconsBlue/Icon_Instagram.svg";
import tiktok from "../assets/iconsBlue/Icon_Tiktok.svg";
import X from "../assets/iconsBlue/Icon_X.svg";
import youtube from "../assets/iconsBlue/Icon_Youtube.svg";
import InfoTooltip from "../components/InfoTooltip";
import { UpdateUserInfo } from "../hooks/apicalls";
import cross from "../assets/Trazado 1017.svg";

function EditProfilePage({ onReturn }) {
  useEffect(() => {
    InputFacebook.current.value = (UserData.current.user.related.facebook === "" || UserData.current.user.related.facebook !== null) ? UserData.current.user.related.facebook : "";
    InputInstagram.current.value = (UserData.current.user.related.instagram === "" || UserData.current.user.related.instagram !== null) ? UserData.current.user.related.instagram : "";
    InputTiktok.current.value = (UserData.current.user.related.tiktok === "" || UserData.current.user.related.tiktok !== null) ? UserData.current.user.related.tiktok : "";;
    InputX.current.value = (UserData.current.user.related.x === "" || UserData.current.user.related.x !== null) ? UserData.current.user.related.x : "";
    InputYoutube.current.value = (UserData.current.user.related.youtube === "" || UserData.current.user.related.youtube !== null) ? UserData.current.user.related.youtube : "";
  });

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

  const handleReturn = async () => {
    onReturn();
  };

  const handleRewardPopUpClose = () => {
    setPopUpResponse(null);
  }

  const openGeneralErrorPopUp = () => {
    rewardErrorPopUpTitle.current = "Lo sentimos, ha ocurrido un error, favor de intentar más tarde.";
    rewardErrorPopUpContent.current = "Aún tenemos muchísimos premios para ti.";
    setPopUpResponse("Error");
  }

  const handleSave = async () => {
    if (inputValidation()) {
      const facebookVal = InputFacebook.current.value !== "" ? InputFacebook.current.value : null;
      const instagramVal = InputInstagram.current.value !== "" ? InputInstagram.current.value : null;
      const tiktokVal = InputTiktok.current.value !== "" ? InputTiktok.current.value : null;
      const xVal = InputX.current.value !== "" ? InputX.current.value : null;
      const youTubeVal = InputYoutube.current.value !== "" ? InputYoutube.current.value : null;

      console.log(facebookVal);
      console.log(instagramVal);
      console.log(tiktokVal);
      console.log(xVal);
      console.log(youTubeVal);
      console.log(`${UserData.current.token_type} ${UserData.current.access_token}`);

      const response = await UpdateUserInfo(`${UserData.current.token_type} ${UserData.current.access_token}`,
         UserData.current.user.name,
         facebookVal,
         instagramVal,
         tiktokVal,
         xVal,
         youTubeVal
      );
      const data = await response.json();
      if(response.ok){
        if(data.user !== null){
          let tempUserDataRelated = UserData.current.user.related;
          tempUserDataRelated = data.user.related;
          UserData.current.user.related = tempUserDataRelated;
          SetUserData(UserData.current);
          onReturn();
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
              <div style={{minWidth: "50%"}} className="passwordInput">
                              <input
                placeholder={"@usuario"}
                className="GeneralInput"
                ref={InputTiktok}
              ></input>
              <div
                onClick={() => {
                  InputTiktok.current.value = "";
                }}
              >
                <img
                  alt="eye"
                  className="eyePassword"
                  style={{paddingTop: "13px"}}
                  src={cross}
                ></img>
              </div>
              </div>

              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
              ></InfoTooltip>

              
            </div>
            {errorInputTiktok === false ? (
              <span  style={{color: "#0063FF"}}  className="errorText">Porfavor verifique su usuario</span>
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
              <div style={{minWidth: "50%"}} className="passwordInput">
                              <input
                placeholder={"@usuario"}
                className="GeneralInput"
                ref={InputInstagram}
              ></input>
              <div
                onClick={() => {
                  InputInstagram.current.value = "";
                }}
              >
                <img
                  alt="eye"
                  className="eyePassword"
                  style={{paddingTop: "13px"}}
                  src={cross}
                ></img>
              </div>
              </div>

              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
              ></InfoTooltip>
            </div>

            {errorInputInstagram === false ? (
              <span style={{color: "#0063FF"}} className="errorText">Porfavor verifique su usuario</span>
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
              <div style={{minWidth: "50%"}} className="passwordInput">
                              <input
                placeholder={"https://www.facebook.com/samslovers"}
                className="GeneralInput"
                ref={InputFacebook}
              ></input>
              <div
                onClick={() => {
                  InputFacebook.current.value = "";
                }}
              >
                <img
                  alt="eye"
                  className="eyePassword"
                  style={{paddingTop: "13px"}}
                  src={cross}
                ></img>
              </div>
              </div>

              <InfoTooltip dark={true}
                text={"Pon el link de tu \n perfil de facebook"}
              ></InfoTooltip>
            </div>
            {errorInputFacebook === false ? (
              <span style={{color: "#0063FF"}}  className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img src={youtube} alt="YTLogo" className="socialMediaIcon"></img>
              <div style={{minWidth: "50%"}} className="passwordInput">
                            <input
                placeholder={"@usuario"}
                className="GeneralInput"
                ref={InputYoutube}
              ></input>
              <div
                onClick={() => {
                  InputYoutube.current.value = "";
                }}
              >
                <img
                  alt="eye"
                  className="eyePassword"
                  style={{paddingTop: "13px"}}
                  src={cross}
                ></img>
              </div>

              </div>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputYoutube === false ? (
              <span style={{color: "#0063FF"}}  className="errorText">Porfavor verifique su usuario</span>
            ) : (
              <></>
            )}
          </div>
          <div className="GeneralInputContainer">
            <div className="GeneralInputSubContainer">
              <img src={X} alt="XLogo" className="socialMediaIcon"></img>
              <div style={{minWidth: "50%"}} className="passwordInput">              <input
                placeholder={"@usuario"}
                className="GeneralInput"
                ref={InputX}
              ></input>
              <div
                onClick={() => {
                  InputX.current.value = "";
                }}
              >
                <img
                  alt="eye"
                  className="eyePassword"
                  style={{paddingTop: "13px"}}
                  src={cross}
                ></img></div>

              </div>
              <InfoTooltip dark={true}
                text={`Escribe tu nombre de usuario, \n por ejemplo: \n “@cashi o @Walmart.245`}
              ></InfoTooltip>
            </div>
            {errorInputX === false ? (
              <span style={{color: "#0063FF"}}  className="errorText">Porfavor verifique su usuario</span>
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
    </>
  );
}

export default EditProfilePage;

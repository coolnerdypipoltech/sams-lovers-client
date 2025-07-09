import { useRef, useState, useContext, useEffect } from "react";
import { ElementContextData } from "../context/DataContext";
import facebook from "../assets/iconsBlue/Icon_Facebook.svg";
import instagram from "../assets/iconsBlue/Icon_Instagram.svg";
import tiktok from "../assets/iconsBlue/Icon_Tiktok.svg";
import X from "../assets/iconsBlue/Icon_X.svg";
import youtube from "../assets/iconsBlue/Icon_Youtube.svg";
import InfoTooltip from "../components/InfoTooltip";
import { UpdateUserInfo } from "../hooks/apicalls";
import cross from "../assets/clear_input.svg";
import { ElementContextPopUp } from "../context/PopUpContext";
import { ElementContextRoute } from "../context/RouteContext";

function EditProfilePage({ onReturn }) {
  const { getCurrentToken, deleteSavedItems, changeRoute } = useContext(ElementContextRoute);
  const { UserData, SetUserData } = useContext(ElementContextData);
  const { changePopUpLoading } = useContext(ElementContextPopUp);

  const [errorInputFacebook, SetErrorInputFacebook] = useState(true);
  const [errorInputInstagram, SetErrorInputInstagram] = useState(true);
  const [errorInputTiktok, SetErrorInputTiktok] = useState(true);
  const [errorInputX, SetErrorInputX] = useState(true);
  const [errorInputYoutube, SetErrorInputYoutube] = useState(true);
  const [popUpResponse, setPopUpResponse] = useState("");

  const [inputEditUserFacebook, setInputEditUserFacebook] = useState("");
  const [inputEditUserInstagram, setInputEditUserInstagram] = useState("");
  const [inputEditUserTiktok, setInputEditUserTiktok] = useState("");
  const [inputEditUserX, setInputEditUserX] = useState("");
  const [inputEditUserYoutube, setInputEditUserYoutube] = useState("");

  let rewardErrorPopUpTitle = useRef("");
  let rewardErrorPopUpContent = useRef("");
  let rewardPopUpContent = <></>;

  useEffect(() => {
    if(UserData.current.user.related.facebook !== null && UserData.current.user.related.facebook !== ""){ setInputEditUserFacebook(UserData.current.user.related.facebook);}
    if(UserData.current.user.related.instagram !== null && UserData.current.user.related.instagram !== ""){ setInputEditUserInstagram(UserData.current.user.related.instagram);}
    if(UserData.current.user.related.tiktok !== null && UserData.current.user.related.tiktok !== ""){ setInputEditUserTiktok(UserData.current.user.related.tiktok);}
    if(UserData.current.user.related.x !== null && UserData.current.user.related.x !== ""){ setInputEditUserX(UserData.current.user.related.x);}
    if(UserData.current.user.related.youtube !== null && UserData.current.user.related.youtube !== ""){ setInputEditUserYoutube(UserData.current.user.related.youtube);}
  }, [UserData]);

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

  const handleLogOut = async () => {
    SetUserData(null);
    await deleteSavedItems();
    changeRoute("Login");
  }

  const handleSave = async () => {
    if (inputValidation()) {

      const inputEditUser_F = inputEditUserFacebook === "" ? null : inputEditUserFacebook;
      const inputEditUser_I = inputEditUserInstagram === "" ? null : inputEditUserInstagram;
      const inputEditUser_T = inputEditUserTiktok === "" ? null : inputEditUserTiktok;
      const inputEditUser_X = inputEditUserX === "" ? null : inputEditUserX;
      const inputEditUser_Y = inputEditUserYoutube === "" ? null : inputEditUserYoutube;

      /*console.log(inputEditUser_F);
      console.log(inputEditUser_I);
      console.log(inputEditUser_T);
      console.log(inputEditUser_X);
      console.log(inputEditUser_Y);*/

      changePopUpLoading(true);

      const token = await getCurrentToken();

      if(token === null || token === "") {
        await handleLogOut();
        return;
      }

      const response = await UpdateUserInfo(`Bearer ${token}`,
         UserData.current.user.name,
         inputEditUser_F,
         inputEditUser_I,
         inputEditUser_T,
         inputEditUser_X,
         inputEditUser_Y
      );
      const data = await response.json();
      if(response.ok){
        if(data.user !== null){
          let tempUserDataRelated = UserData.current.user.related;
          tempUserDataRelated = data.user.related;
          UserData.current.user.related = tempUserDataRelated;
          SetUserData(UserData.current);
          changePopUpLoading(false);
          onReturn();
        }
      }else{
        changePopUpLoading(false);
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
    const responseF = validateFacebook(inputEditUserFacebook);
    const responseI = validateUser(inputEditUserInstagram);
    const responseT = validateUser(inputEditUserTiktok);
    const responseX = validateUser(inputEditUserX);
    const responseY = validateUser(inputEditUserYoutube);

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
      <div  className="EditProfileContainer">

         <div style={{overflowY: "scroll", height: "100dvh", width: "100%"}} className="createUserContainer">
          <div style={{width: "80%", gap: "15px", display: "flex", flexFlow: "column"}}>
          <div className="headerSpacer"></div>
          <p onClick={handleReturn} style={{color: "#3C74F3", marginBottom: "15px"}} className="EditProfielBack">Volver</p>
          <div style={{minHeight: "0.5px", width: "100%", backgroundColor: "grey"}}></div>
          <p style={{color: "grey", marginTop: "15px", marginBottom: "15px", textAlign: "left"}} className="loginBottomText">
            Compártenos tus redes sociales para obtener grandiosos premios,
            recuerda que tu cuenta debe estar publica para que podamos validar
            las dinámicas.
          </p>
          

          
          <div  className="GeneralInputContainer">
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
                value={inputEditUserTiktok}
                onChange={e => setInputEditUserTiktok(e.target.value)}
              ></input>
              <div
                onClick={() => {
                  setInputEditUserTiktok("");
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
                text={`Escribe tu nombre de usuario, \npor ejemplo: \n“@cashi o @Walmart.245"`}
              ></InfoTooltip>
            </div>
            {errorInputTiktok === false ? (
              <span  style={{color: "#0063FF"}}  className="errorText">El usuario debe comenzar con @</span>
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
                value={inputEditUserInstagram}
                onChange={e => setInputEditUserInstagram(e.target.value)}
              ></input>
              <div
                onClick={() => {
                  setInputEditUserInstagram("");
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
                text={`Escribe tu nombre de usuario, \npor ejemplo: \n“@cashi o @Walmart.245"`}
              ></InfoTooltip>
            </div>
            {errorInputInstagram === false ? (
              <span style={{color: "#0063FF"}} className="errorText">El usuario debe comenzar con @</span>
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
                value={inputEditUserFacebook}
                onChange={e => setInputEditUserFacebook(e.target.value)}
              ></input>
              <div
                onClick={() => {
                  setInputEditUserFacebook("");
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
                text={"Pon el link de tu \nperfil de facebook"}
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
                value={inputEditUserYoutube}
                onChange={e => setInputEditUserYoutube(e.target.value)}
              ></input>
              <div
                onClick={() => {
                  setInputEditUserYoutube("");
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
                text={`Escribe tu nombre de usuario, \npor ejemplo: \n“@cashi o @Walmart.245"`}
              ></InfoTooltip>
            </div>
            {errorInputYoutube === false ? (
              <span style={{color: "#0063FF"}}  className="errorText">El usuario debe comenzar con @</span>
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
                value={inputEditUserX}
                onChange={e => setInputEditUserX(e.target.value)}
              ></input>
              <div
                onClick={() => {
                  setInputEditUserX("");
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
                text={`Escribe tu nombre de usuario, \npor ejemplo: \n“@cashi o @Walmart.245"`}
              ></InfoTooltip>
            </div>
            {errorInputX === false ? (
              <span style={{color: "#0063FF"}}  className="errorText">El usuario debe comenzar con @</span>
            ) : (
              <></>
            )}
          </div>
          <p style={{color: "grey", marginBottom: "15px", marginTop: "15px", textAlign: "left"}} className="loginBottomText">Recuerda que tu cuenta debe estar publica para que se pueda ver tu video</p>
          <button className="GeneralButton4" onClick={handleSave}>
            Guardar
          </button>
          </div>
          <div style={{minHeight: "35px"}} className="headerSpacer"></div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditProfilePage;

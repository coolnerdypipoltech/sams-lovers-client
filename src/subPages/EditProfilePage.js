import { useRef, useState, useContext, useEffect } from "react";
import logo from "../assets/samsLogo.webp";
import ImagePicker from "../components/ImagePicker";
import { ElementContextData } from "../context/DataContext";
function EditProfilePage({ onReturn }) {
  const { UserData } = useContext(ElementContextData);
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

  useEffect(() => {
    console.log(UserData.current.user)
    if(UserData.current.user.related !== undefined){
      if (UserData.current.user.related.facebook_url !== null) InputFacebook.current.vaue = UserData.current.user.related.facebook_url;
      if (UserData.current.user.related.instagram_url !== null) InputInstagram.current.vaue = UserData.current.user.related.instagram_url;
      if (UserData.current.user.related.tiktok_url !== null) InputTiktok.current.vaue = UserData.current.user.related.tiktok_url;
      if (UserData.current.user.related.x_url !== null) InputX.current.vaue = UserData.current.user.related.x_url;
      if (UserData.current.user.related.youtube_url !== null) InputYoutube.current.vaue = UserData.current.user.related.youtube_url;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReturn = async () => {
    onReturn();
  };

  const handleSave = async () => {
    if (inputValidation()) {
      onReturn();
    }
  };

  const inputValidation = () => {
    const responseF = validateFacebook(InputFacebook.current.value)
    const responseI = validateUser(InputInstagram.current.value)
    const responseT = validateUser(InputTiktok.current.value)
    const responseX = validateUser(InputX.current.value)
    const responseY = validateUser(InputYoutube.current.value)

    SetErrorInputFacebook(responseF)
    SetErrorInputInstagram(responseI)
    SetErrorInputTiktok(responseT)
    SetErrorInputX(responseX)
    SetErrorInputYoutube(responseY)

    if(responseY && responseX && responseT && responseI && responseF){
      return true
    }else{
      return false
    }

  };

  const validateUser = (_userToTest) => {
    const userRegex = /^@.+$/;
    return userRegex.test(_userToTest)
  }

  const validateFacebook = (_userToTest) => {
    const regexFacebook = /^https:\/\/www\.facebook\.com\/.+$/;
    return regexFacebook.test(_userToTest)
  }
  return (
    <div className="subPageContainer">
      <div className="ProfileContainer">
        <p onClick={handleReturn} className="EditProfileBackButton">
          Volver
        </p>
        <p className="Title">Editar Perfil</p>

        <ImagePicker></ImagePicker>
        <div className="createUserContainer">
          <input
            placeholder="Facebook (opcional)"
            className="inputCreateUser"
            ref={InputFacebook}
          ></input>
          {errorInputFacebook === false ? (
            <span>Porfavor verique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Instagram (opcional)"
            className="inputCreateUser"
            ref={InputInstagram}
          ></input>
          {errorInputInstagram === false ? (
            <span>Porfavor verique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Tiktok (opcional)"
            className="inputCreateUser"
            ref={InputTiktok}
          ></input>
          {errorInputTiktok === false ? (
            <span>Porfavor verique su usuario</span>
          ) : (
            <></>
          )}
          <input placeholder="X (opcional)" ref={InputX} className="inputCreateUser"></input>
          {errorInputX === false ? (
            <span>Porfavor verique su usuario</span>
          ) : (
            <></>
          )}
          <input
            placeholder="Youtube (opcional)"
            className="inputCreateUser"
            ref={InputYoutube}
          ></input>
          {errorInputYoutube === false ? (
            <span>Porfavor verique su usuario</span>
          ) : (
            <></>
          )}
          <p onClick={handleSave}>Guardar</p>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;

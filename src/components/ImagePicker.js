import React, { useRef, useState } from "react";
import logo from "../assets/profilePic.jpg";
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
const ImagePicker = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const config2 = {
    borderRadius: '8px',
    language: 'es',
    width: '0px',
    height: '0px',
    objectFit: 'contain',
    compressInitial: null,
    hideEditBtn: true, 
    hideAddBtn: true,
    hideDeleteBtn: true,
    hideDownloadBtn: true,
    darkMode: false,
    rtl: false
  };
  const handleButtonClick = () => {

  };


  return (
    <>
      <div className="containerProfilePic">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Imagen seleccionada"
            className="imageProfilePic"
          />
        ) : <img
            src={logo}
            alt="Imagen por defecto"
            className="imageProfilePic"
          />
        }
        

        <p onClick={handleButtonClick} className="EditProfile">
          < ReactImagePickerEditor
          className="reactImagePicker"
            config={config2}
            imageSrcProp={imageSrc}
            imageChanged={(newDataUri) => { console.log(newDataUri); setImageSrc(newDataUri) }} />
          Editar
        </p>

      </div>

      
    </>
  );
};

export default ImagePicker;

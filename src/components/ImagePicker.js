import React, { useRef, useState } from "react";
import logo from "../assets/profilePic.jpg";
const ImagePicker = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
          Editar
        </p>
        
        
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        

      </div>

      
    </>
  );
};

export default ImagePicker;

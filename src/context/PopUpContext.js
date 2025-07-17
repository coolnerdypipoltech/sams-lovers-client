import React, { createContext, useState } from "react";

const ElementContextPopUp = createContext();

const ElementProviderPopUp= ({ children }) => {
  const [popUpText, setPopUpText] = useState("");
  const [popUpTitle, setPopUpTitle] = useState("")
  const [popUpLoading, setPopUpLoading] = useState(false)

  const changePopUpText = (newValue) => {
    setPopUpText(newValue);
  };
  const changePopUpTitle = (newValue) => {
    setPopUpTitle(newValue);
  };

  const changePopUpLoading = (newValue) => {
    if(newValue){
      document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
    }else{
      document.body.style.overflowY = "";
    document.body.style.overflowX = "";
    }
    setPopUpLoading(newValue);
  }

  const closePopUp = () => {
    setPopUpText("");
  };


  return (
    <ElementContextPopUp.Provider value={{ popUpText, changePopUpText, closePopUp, changePopUpTitle, popUpTitle, changePopUpLoading, popUpLoading}}>
      {children}
    </ElementContextPopUp.Provider>
  );
};

export { ElementContextPopUp, ElementProviderPopUp };

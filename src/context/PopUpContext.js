import React, { createContext, useState } from "react";

const ElementContextPopUp = createContext();

const ElementProviderPopUp= ({ children }) => {
  const [popUpText, setPopUpText] = useState("");
  const [popUpTitle, setPopUpTitle] = useState("")
  const [popUpLoading, setPopUpLoading] = useState(false)

  const changePopUpText = (newValue) => {
    console.log( newValue);
    setPopUpText(newValue);
  };
  const changePopUpTitle = (newValue) => {
    console.log( newValue);
    setPopUpTitle(newValue);
  };

  const changePopUpLoading = (newValue) => {
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

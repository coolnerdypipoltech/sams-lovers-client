import React, { createContext, useState } from "react";

const ElementContextPopUp = createContext();

const ElementProviderPopUp= ({ children }) => {
  const [popUpText, setPopUpText] = useState("asdf");
  const [popUpTitle, setPopUpTitle] = useState("")

  const changePopUpText = (newValue) => {
    console.log( newValue);
    setPopUpText(newValue);
  };
  const changePopUpTitle = (newValue) => {
    console.log( newValue);
    setPopUpTitle(newValue);
  };

  const closePopUp = () => {
    setPopUpText("");
  };


  return (
    <ElementContextPopUp.Provider value={{ popUpText, changePopUpText, closePopUp, changePopUpTitle, popUpTitle}}>
      {children}
    </ElementContextPopUp.Provider>
  );
};

export { ElementContextPopUp, ElementProviderPopUp };

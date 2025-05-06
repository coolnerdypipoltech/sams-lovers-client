import React, { createContext, useState } from "react";

const ElementContextPopUp = createContext();

const ElementProviderPopUp= ({ children }) => {
  const [popUpText, setPopUpText] = useState("Test 123");
  
  const changePopUpText = (newValue) => {
    console.log( newValue);
    setPopUpText(newValue);
  };

  const closePopUp = () => {
    setPopUpText("");
  };


  return (
    <ElementContextPopUp.Provider value={{ popUpText, changePopUpText, closePopUp}}>
      {children}
    </ElementContextPopUp.Provider>
  );
};

export { ElementContextPopUp, ElementProviderPopUp };

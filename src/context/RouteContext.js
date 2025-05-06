import React, { createContext, useState } from "react";

const ElementContextRoute = createContext();

const ElementProviderRoute= ({ children }) => {
  const [route, setRoute] = useState("Login");

  const changeRoute = (newValue) => {
    console.log( newValue);
    setRoute(newValue);
  };

  return (
    <ElementContextRoute.Provider value={{ route, changeRoute}}>
      {children}
    </ElementContextRoute.Provider>
  );
};

export { ElementContextRoute, ElementProviderRoute };

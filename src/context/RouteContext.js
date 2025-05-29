import React, { createContext, useEffect, useRef, useState } from "react";
import { LogInWithToken } from "../hooks/apicalls";
import useIndexedDB from "../hooks/useIndexedDB";
const ElementContextRoute = createContext();

const ElementProviderRoute= ({ children }) => {
  const [route, setRoute] = useState("");
  const loginToken = useRef("token");
  const { getItems, isInitialize, deleteItem, saveItem } = useIndexedDB();


  useEffect(() => {
    //persistLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialize])

  const changeRoute = (newValue) => {
    console.log( newValue);
    if(loginToken.current === null){
      setRoute("Login")
    }else{
      setRoute(newValue);
    }
    
  };

  const setLoginToken = async (newValue) => {
    loginToken.current = newValue;
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        for (let index = 0; index < savedItems.length; index++) {
          await deleteItem(savedItems[index].id);
        }
      }
    }
    loginToken.current = newValue;
    saveItem({loginToken: newValue})
    
  }

  const getLogInToken = () => {return loginToken.current;}
  
  const persistLogin = async () => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        loginToken.current = savedItems[0].loginToken;
          const response = await LogInWithToken(loginToken.current);
          if(response){
            changeRoute("Main")
          }
      }
    }
  }

  return (
    <ElementContextRoute.Provider value={{ route, changeRoute, setLoginToken, getLogInToken}}>
      {children}
    </ElementContextRoute.Provider>
  );
};

export { ElementContextRoute, ElementProviderRoute };

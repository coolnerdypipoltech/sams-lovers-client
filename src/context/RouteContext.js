import React, { createContext, useEffect, useRef, useState } from "react";
import { LogInWithToken } from "../hooks/apicalls";
import useIndexedDB from "../hooks/useIndexedDB";
const ElementContextRoute = createContext();

const ElementProviderRoute= ({ children }) => {
  const [route, setRoute] = useState("");
  const registerFlow = useRef(false);
  const { getItems, isInitialize, deleteItem, saveItem } = useIndexedDB();


  useEffect(() => {
    //persistLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialize])

  const changeRoute = async (newValue) => {
    const response = await getCurrentToken()
    if(response === null){
      setRoute("Login")
    }else{
      setRoute(newValue);
      setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000); 
    }
  };

  const getCurrentToken = async () => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length === 1){
        return savedItems[0].loginToken;
      }
    }
    return null
  }

  const setLoginToken = async (newValue) => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        for (let index = 0; index < savedItems.length; index++) {
          await deleteItem(savedItems[index].id);
        }
      }
    }
    await saveItem({loginToken: newValue})
    return 
  }

  const deleteSavedItems = async () => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        for (let index = 0; index < savedItems.length; index++) {
          await deleteItem(savedItems[index].id);
        }
      }
    }
  }

  const persistLogin = async () => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        const response = await LogInWithToken(`Bearer ${savedItems[0].loginToken}`);
        return response;
      }
    }
    return null;
  }

  const hasSavedData = async () => {
    const savedItems = await getItems()
    if(savedItems !== undefined){
      if(savedItems.length > 0){
        return true;
      }
    }
    return false;
  }

  return (
    <ElementContextRoute.Provider value={{ route, registerFlow, changeRoute, setLoginToken, deleteSavedItems, persistLogin, hasSavedData}}>
      {children}
    </ElementContextRoute.Provider>
  );
};

export { ElementContextRoute, ElementProviderRoute };

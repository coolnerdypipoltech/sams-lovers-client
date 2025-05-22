import { useState } from "react";

import "../styles/Codes.css";

function Codes() {
  const [openArticlePage, setOpenArticlePage] = useState(true);

  return (
    <>
      <div className="CodePageContainer">
        <div className="headerSpacer"></div>
        <p className="CodeTitle">Redime tu código</p>
        <p className="CodeText">
          Obten diamantes gratis con los códigos Sam's Lovers ¿Ya tienes un
          código? Redimelo aquí
        </p>
        <div className="Divider"></div>
        <div className="CodeInputContainer">

            <p className="CodeInputText"> Introduce tu código de 16 digitos</p>
          <input placeholder="Código" className="GeneralInput"></input>

          
        </div>
        <div className="CodeButtonContainer">
          <button className="GeneralButton4">Canjear código</button>
        </div>
        
      </div>
    </>
  );
}

export default Codes;

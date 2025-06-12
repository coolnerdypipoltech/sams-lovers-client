import { ExchangeCode } from "../hooks/apicalls";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import { useContext, useRef } from "react";
import "../styles/Codes.css";

function Codes() {
  const { changeRoute } = useContext(ElementContextRoute);
  const { UserData, setNewUserDiamonds } = useContext(ElementContextData);

  let code = useRef("");

  const handleOnChangeInput = (input) => {
    code.current = input;
  }

  const handleExchangeCode = async () => {

    if (code.current === "") return;

    const response = await ExchangeCode(`${UserData.current.token_type} ${UserData.current.access_token}`,code.current);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        setNewUserDiamonds(data.user.related.diamonds);
      } else {
              if (data.message) {
        switch(data.message) {
          case "api.error.unauthorized":
            changeRoute("Login");
            break;
          case " api.error.code_not_found":
            //changeRoute("Login");
            break;
          case "api.error.code_expired":
            //openMaxPurchasesReachedPopUp();
            break;
          case " api.error.max_redemptions_reached":
            //openNoDiamondsPopUp();
            break;
          case " api.error.no_stock":
            break;
          default:
            //openGeneralErrorPopUp();
            break;
        }
      }else{
        //openGeneralErrorPopUp();
      }
      return;
      }
  }

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

            <p className="CodeInputText"> Introduce tu código</p>
          <input placeholder="Código" className="GeneralInput" onChange={e => handleOnChangeInput(e.target.value)}></input>
        </div>
        <div className="CodeButtonContainer">
          <button className="GeneralButton4" onClick={handleExchangeCode}>Canjear código</button>
        </div>
      </div>
    </>
  );
}

export default Codes;

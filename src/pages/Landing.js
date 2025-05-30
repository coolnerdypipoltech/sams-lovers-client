
import "../styles/Landing.css";
import { useContext } from "react";
import { ElementContextRoute } from "../context/RouteContext";
function Landing() {
  const { setLoginToken, changeRoute } = useContext(ElementContextRoute);

  const onclickLogin = () => {
    changeRoute("Login");
  }

  return (
    <>
      <div>
        <h1>Landing page</h1>
        <button onClick={onclickLogin} className="GeneralButton3">Login</button>
      </div>
    </>
  );
}

export default Landing;
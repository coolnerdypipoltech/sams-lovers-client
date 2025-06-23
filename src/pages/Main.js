import { useEffect, useContext, useRef } from "react";
import "../styles/Main.css";
import { ElementContextData } from "../context/DataContext";
import { ElementContextRoute } from "../context/RouteContext";
import MonthlySamsLover from "../components/MonthlySamsLover";
import SamsLoversRanking from "../components/SamsLoversRanking";
import SamsFooter from "../components/SamsFooter";

function Main() {
  const { changeRoute } = useContext(ElementContextRoute);
  const { UserData, initMainPage, mainPageData } = useContext(ElementContextData);

    useEffect(() => {
      initMainPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const handleSeeChallengesAction = () => {
    changeRoute("Challenges");
  }

  const handleMonthlySamsLoverProfile = () => {
  }

  return (
    <>
      <div>
        <img></img>
        <div>
          <img></img>
          <p>Bienvenido a Sam's Lovers</p>
          <p>¡HOLA {UserData.current.user.name}!</p>
        </div>
        <div>
          <img></img>
          <button onClick={handleSeeChallengesAction}>Conoce los retos del mes</button>
        </div>
        <div>
          <p>Tú puedes ser nuestro próximo Sam's Lover del mes</p>
          <p>Súmate al reto, muestra lo mejor de ti y llévate premios únicos ¿Tienes lo necesario para ser el próximo Sam's Lover del mes?</p>
        </div>
        {/*
        <MonthlySamsLover SamsLover={mainPageData.current} handleMonthlySamsLoverProfile={handleMonthlySamsLoverProfile}></-MonthlySamsLover>
        <SamsLoversRanking></SamsLoversRanking>
        <SamsFooter></SamsFooter>
        */}
      </div>
    </>
  );
}

export default Main;

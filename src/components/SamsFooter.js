
import samsLogo from "../assets/Brand_SamsLovers.svg"
import facebook from "../assets/Icon_Facebook.svg"
import instagram from "../assets/Icon_Instagram.svg"
import tiktok from "../assets/Icon_Tiktok.svg"
import X from "../assets/Icon_X.svg"
import youtube from "../assets/Icon_Youtube.svg"
import whatsapp from "../assets/Icon_whatsapp.svg"
const SamsFooter = () => {

  return (
    <>
        <div className="footerBackground">
            <img className="" src={samsLogo} style={{height: "33px", paddingTop: "40px"}} alt="SamsLogo"></img>
            <div style={{paddingTop: "10px", gap: "12px"}} className="rowAlign">
                <img src={facebook} alt="FacebookLogo"></img>
                <img src={instagram} alt="InstagramLogo"></img>
                <img src={tiktok} alt="TiktokLogo"></img>
                <img src={X} alt="TwitterLogo"></img>
                <img src={youtube} alt="YTLogo"></img>
                <img src={whatsapp} alt="WhatsAppLogo"></img>
            </div>
            <div>
                <p className="footerText">Aviso de Privacidad</p>
                <p style={{marginTop: "15px"}} className="footerText">Términos y Condiciones</p>
            </div>
            <div style={{width: "90%", paddingBottom: "25px"}}>
                <p className="footerText">SAM'S CLUB es una marca licenciada a Nueva Wal-Mart de México S. de R.L. de C.V. Todos los derechos reservados.</p>
            </div>
            
        </div>
    </>
  );
};

export default SamsFooter;

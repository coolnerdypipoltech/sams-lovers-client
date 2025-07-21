import backgroundImage from "../assets/headerMenu/Gradient.png";
import samsLogo1 from "../assets/headerMenu/Sams_Brand@1x.png"
import samsLogo2 from "../assets/headerMenu/Simbolo_Sams.png"


function BackgroundSams() {



  return (
    <div className="backgroundContainer">
            <img
          className="background"
          alt="background"
          src={backgroundImage}
        ></img>


        <div className="backgroundSams1" >
        <img

          className="samsLogoHeader"
          alt="Sams1"
          src={samsLogo1}
        ></img>
        </div>

        <div className="backgroundLogo1">
                <img
          style={{width: "350px"}}
          alt="Sams2"
          src={samsLogo2}
        ></img>
        </div>

        <div className="backgroundLogo2">
                <img
          style={{width: "350px"}}
          alt="Sams2"
          src={samsLogo2}
        ></img>
        </div>
    </div>

  );
}

export default BackgroundSams;

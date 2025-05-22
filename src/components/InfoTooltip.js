import trazado767 from ".././assets/Trazado 767.svg";
import trazado767Dark from ".././assets/Trazado 767 dark.svg";
function InfoTooltip({text, dark}) {
  let imgHelper = trazado767

  if(dark){
    imgHelper = trazado767Dark
  }

    return (
      <>
        <div className="tooltip-container">
          <div className= "tooltipImage">
            <img className src={imgHelper} alt="tooltip"></img>
          </div>
            
        <div role="tooltip" id="help-tooltip" className="tooltip">
          <pre>{text} </pre>
        </div>
      </div>
      </>
    );
  }
  
  export default InfoTooltip;
  
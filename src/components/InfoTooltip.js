import trazado767 from ".././assets/Trazado_767.svg";
import trazado767Dark from ".././assets/Trazado_767_dark.svg";

function InfoTooltip({text, dark}) {
  let imgHelper = trazado767
  let classDark = "tooltipImage"
  if(dark){
    imgHelper = trazado767Dark
    classDark = "tooltipImageDark"
  }

  return (
    <>
      <div className="tooltip-container">
        <div className= {classDark}>
          <img className src={imgHelper} alt="tooltip"></img>
        </div>
      <div role="tooltip" id="help-tooltip" className="tooltip">
        <pre className="toolTipText">{text} </pre>
        <div className="tooltip-tip"></div>
      </div>
    </div>
    </>
  );
}

export default InfoTooltip;

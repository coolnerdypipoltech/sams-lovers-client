import trazado767 from ".././assets/Trazado 767.svg";
function InfoTooltip({text}) {
    return (
      <>
        <div className="tooltip-container">
          <div className= "tooltipImage">
            <img className src={trazado767} alt="tooltip"></img>
          </div>
            
        <div role="tooltip" id="help-tooltip" className="tooltip">
          <pre>{text} </pre>
        </div>
      </div>
      </>
    );
  }
  
  export default InfoTooltip;
  
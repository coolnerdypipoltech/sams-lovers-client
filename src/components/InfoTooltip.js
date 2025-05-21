import trazado767 from ".././assets/Trazado 767.svg";
function InfoTooltip({text}) {
    return (
      <>
        <div className="tooltip-container">
            <img src={trazado767} alt="tooltip"></img>
        <div role="tooltip" id="help-tooltip" className="tooltip">
          <p>{text} </p>
        </div>
      </div>
      </>
    );
  }
  
  export default InfoTooltip;
  
import InfoTooltip from "./InfoTooltip";
function RewardInfoBox({ text, ammount, toolTipText, icon }) {
  return (
    <>
    
      <div className="challenge-information-container">
        <div style={{
            width: "100%",
            height: "0px",
            display: "flex",
            justifyContent: "flex-end"
        }}>
          {toolTipText !== undefined && <div style={{paddingTop: "1px"}}>
                    <InfoTooltip  text={toolTipText} dark={true}></InfoTooltip>
            </div>}
            
            
        </div>
        <div
          
          className="rowAlign"
          style={{ paddingLeft: "20px"}}
        >
          <img src={icon} alt="diamonds"></img>
          <div style={{ paddingLeft: "10px"}}>
            <p style={{ width: "90%" }} className="infoText">
              {text}
            </p>
            <div className="diamondsContainer">
              <p className="challenge-text-information-diamonds">{ammount}</p>
            </div>
          </div>
        </div>
      </div>
              
    </>
  );
}

export default RewardInfoBox;

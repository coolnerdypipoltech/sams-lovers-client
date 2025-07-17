import Image from "../assets/test/MonthLover.png"
function SamsLoversMonth({ sams_lover, doClick }) {

  const handleMeetSamsLover = () => {
    if(sams_lover.url !== "") window.open(sams_lover.url);
  }

  return (
    <>
      <div style={{width: "80%", marginTop: "0px"}} className="AcademyItemContainer">
        <p style={{fontSize: "24px", color: "#025DAD", marginBottom: "0px", marginTop: "30px"}} className="LandingPageTitle">#Sam'sLovers #DesafíoSams</p>
        <p style={{marginTop: "9px", marginBottom: "15px"}}>{`@${sams_lover?.name}`}</p>
        {(sams_lover !== null && <img src={sams_lover?.image_url} className="SamsOfTheMonthContainer" alt="SamsLoversMonth"></img>)}
        <div style={{paddingBottom: "30px"}}>
          {(sams_lover?.url !== "" && <button style={{ width: "80%", fontSize: "14px"}} className="GeneralButton4" onClick={handleMeetSamsLover}>Conoce al Sam's Lover del mes</button>)}
        </div>
      </div>
    </>
  );
}

export default SamsLoversMonth;

import Image from "../assets/test/MonthLover.png"
function SamsLoversMonth({ sams_lover, doClick }) {

  const handleMeetSamsLover = () => {
    if(sams_lover.url !== "") window.open(sams_lover.url);
  }

  return (
    <>
      <div style={{width: "80%"}} className="AcademyItemContainer">
        <p style={{fontSize: "24px", color: "#025DAD"}} className="LandingPageTitle">#Sam'sLovers #DesafíoSams</p>
        <p>{`@${sams_lover?.name}`}</p>
        {(sams_lover !== null && <img src={sams_lover?.image_url} className="SamsOfTheMonthContainer" alt="SamsLoversMonth"></img>)}
        <div style={{paddingBottom: "30px"}}>
          {(sams_lover?.url !== "" && <button style={{ width: "80%"}} className="GeneralButton4" onClick={handleMeetSamsLover}>Conoce al Sam's Lover del mes</button>)}
        </div>
      </div>
    </>
  );
}

export default SamsLoversMonth;

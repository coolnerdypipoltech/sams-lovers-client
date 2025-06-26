import Image from "../assets/test/MonthLover.png"
function SamsLoversMonth({ article, doClick }) {


  return (
    <>
      <div style={{width: "80%"}} className="AcademyItemContainer">
        <p style={{fontSize: "24px", color: "#025DAD"}} className="LandingPageTitle">#Sam'sLovers #DesafíoSams</p>
        <p>@Susana</p>
        <img src={Image} className="SamsOfTheMonthContainer" alt="SamsLoversMonth"></img>
        <div style={{paddingBottom: "30px"}}>
          <button style={{ width: "80%"}} className="GeneralButton4">Conoce al Sam's Lover del mes</button>
        </div>
      </div>
    </>
  );
}

export default SamsLoversMonth;

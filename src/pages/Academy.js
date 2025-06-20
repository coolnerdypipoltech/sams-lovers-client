
import { useState } from "react";
import AcademyList from "../components/AcademyList";
import "../styles/Academy.css";
import AcademyPage from "../subPages/AcademyPage";

function Academy() {

  const [subPage, setSubPage] = useState("");
  let subPageContent = null;
  const handleSelectArticle =  () =>{
    console.log("select")
    setSubPage("AcademyPage")
  }

  const handleReturn =  () =>{
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "84vh";
    }
    setSubPage("")
  }

  if (subPage === "AcademyPage") {
    const div = document.querySelector(".listContainer");
    if (div) {
      div.style.height = "100px";
    }
    subPageContent = <AcademyPage  onReturn={handleReturn}></AcademyPage>;
  }

  return (
    <>
    <>{subPageContent}</>
      <div className="AcademyContainer">
      <div className="headerSpacer"></div>
      <div className="headerSpacer"></div>
      <p className="AcademyTitle">Sam's Lovers Academy</p>


        <AcademyList changeToSubPage={handleSelectArticle}></AcademyList>
      </div>
    </>
  );
}

export default Academy;
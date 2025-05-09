import { useState } from "react";
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";

function ChallengeListItem({ data }) {
  const [subPage, setSubPage] = useState("");
  let subPageContent = null;

  if (subPage === "Challenge") {
    subPageContent = (
      <>
        <div>
          <ChallengePage data={data} setSubPage={setSubPage}></ChallengePage>
        </div>
      </>
    );
  }

  if (subPage === "ChallengeParticipation") {
    subPageContent = (
      <>
        <div>
          <ChallengeParticipationPage
            data={data}
            setSubPage={setSubPage}
          ></ChallengeParticipationPage>
        </div>
      </>
    );
  }

  if (subPage === "") {
    subPageContent = null;
  }

  const challengeListItemOnClick = (e) => {
    setSubPage("Challenge");
  };

  return (
    <>
      <>{subPageContent}</>
      <div className="listItem" onClick={challengeListItemOnClick}>
        <img className="imageContainer" src={data.image_url} />
        <div>
          <p className="listItemTitle">Nombre: {data.name}</p>
          <p className="listItemDiamonds">Diamantes: {data.diamonds}</p>
          <p classNAme="listChallengeStatus">
            STATUS: {data.transaction?.status || "pending"}
          </p>
        </div>
      </div>
    </>
  );
}

export default ChallengeListItem;

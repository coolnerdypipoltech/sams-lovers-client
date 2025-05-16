import { useState, useContext } from "react";
import ChallengeList from "../components/ChallengeList";
import "../styles/Challenges.css";
import ChallengePage from "../subPages/ChallengePage";
import ChallengeParticipationPage from "../subPages/ChallengeParticipationPage";
import { ElementContextData } from "../context/DataContext";
import { Picker } from "@react-native-picker/picker";

function Challenges() {
  const [subPage, setSubPage] = useState("");
  const [selectedListType, setSelectedListType] = useState("none");

  const { initRequestChallenges, currentChallenge } = useContext(ElementContextData);

  let subPageContent = null;

  const handleSelectChallenge = () => {
    setSubPage("ChallengePage");
  };

  const handleReturn = () => {
    setSubPage("");
  };

  const handleSelectParticipation = () => {
    setSubPage("ChallengeParticipationPage");
  };

  const handleParticipation = () => {
    console.log("Participation");
  };

  const refreshList = (itemValue) => {
    console.log(itemValue);
    initRequestChallenges(selectedListType);
  };

  if (subPage === "ChallengePage") {
    subPageContent = (
      <ChallengePage
        returnPage={handleReturn}
        challengeParticipationPage={handleSelectParticipation}
        challenge={currentChallenge.current}
      ></ChallengePage>
    );
  }

  if (subPage === "ChallengeParticipationPage") {
    subPageContent = (
      <ChallengeParticipationPage
        returnPage={handleReturn}
        participation={handleParticipation}
        challenge={currentChallenge.current}
      ></ChallengeParticipationPage>
    );
  }

  return (
    <>
      <>{subPageContent}</>
      <div className="challenges-container">
        <div style={{ width: "100%", height: "50px" }}></div>
        <div className="challenge-header">
          <p className="Title">Desafíos</p>
          <Picker style={{ width: "50%", height: "25%", marginTop: "35px"}}
            selectedValue={selectedListType}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedListType(itemValue);
              refreshList(selectedListType);
            }}
          >
            <Picker.Item label="-" value="none" />
            <Picker.Item label="Recomendados" value="recommended" />
            <Picker.Item label="No completados" value="no_completed" />
            <Picker.Item label="Por vencer" value="soon_to_expire" />
          </Picker>
        </div>

        <ChallengeList changeToSubPage={handleSelectChallenge} selectedType={selectedListType}></ChallengeList>
      </div>
    </>
  );
}

export default Challenges;

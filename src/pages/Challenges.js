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

  const { currentChallenge } = useContext(ElementContextData);

  let subPageContent = null;

  const handleSelectChallenge = () => {
    console.log("I clicked");
    setSubPage("ChallengePage");
  };

  const handleReturn = () => {
    console.log("I clicked");
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
  };

  if (subPage === "ChallengePage") {
    console.log(currentChallenge.current);
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

      <div className="ChallengesContainer">
        <div style={{ width: "100%", height: "50px" }}></div>
        <div className="ChallengeHeader">
            <Picker
              selectedValue={selectedListType}
              onValueChange={(itemValue, itemIndex) =>{ 
                setSelectedListType(itemValue);
                refreshList(itemValue);
              }
            }>
              <Picker.Item label="-" value="none" />
              <Picker.Item label="Recomendados" value="recommended" />
              <Picker.Item label="No completados" value="no_completed" />
              <Picker.Item label="Por vencer" value="soon_to_expire" />
            </Picker>
          <p className="Title">Desafíos</p>
        </div>

        <ChallengeList changeToSubPage={handleSelectChallenge}></ChallengeList>
      </div>
    </>
  );
}

export default Challenges;

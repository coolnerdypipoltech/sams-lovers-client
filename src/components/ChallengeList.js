import ChallengeListItem from "./ChallengeListItem";
import test from "../test.json";

function Header() {
  return (
    <>
      <div className="listContainer">
        <div>
          {test.challenges.map((challenge) => (
            <ChallengeListItem
              key={challenge.id}
              data={challenge}
            ></ChallengeListItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;

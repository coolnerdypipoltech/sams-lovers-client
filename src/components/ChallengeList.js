import ChallengeListItem from "./ChallengeListItem";
import test from "../test.json";

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdown() {
    document.getElementById("challengesFilterDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function Header() {
  return (
    <>
        <button onclick="showDropdown()" class="dropbtn">-</button>
        <div id="challengesFilterDropdown" class="dropdown-content">
            <a href="https://www.google.com">-</a>
            <a href="https://www.google.com">Recomendados</a>
            <a href="https://www.google.com">No Completados</a>
            <a href="https://www.google.com">Por vencer</a>
        </div>
        <div className="listContainer">
        <div>
            {test.challenges.map(challenge => (
                <ChallengeListItem key={challenge.id} data={challenge}></ChallengeListItem>
            ))}
        </div>
        </div>
    </>
  );
}

export default Header;
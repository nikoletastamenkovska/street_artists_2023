import {
  setCurrentArtist,
  artistStorageKey,
  streetArtistHeaderSpan,
  logo,
  auctionIcon,
  hamburgerMenuBtn,
} from "../globals.js";

export function initLandingPage() {
  logo.style.display = "none";
  auctionIcon.style.display = "none";
  hamburgerMenuBtn.style.display = "none";
  curtainMenuInner.style.display = "none";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {

      const nameOptions = users.map((user) => user.name);

      const artists = document.querySelector("#artists-selection");
      const visitor = document.querySelector(".polygon-visitor");

      artists.innerHTML = "";
      artists.innerHTML += `<option value="">Choose</option>`;

      nameOptions.forEach((nameOption) => {
        artists.innerHTML += ` <option value="${nameOption}">${nameOption}</option>`;
      });

      artists.addEventListener("change", function (e) {
        location.hash = "#artists";

        localStorage.setItem(artistStorageKey, e.target.value);

        setCurrentArtist(e.target.value);
        streetArtistHeaderSpan.innerHTML = this.value;
        
      });

      visitor.addEventListener("click", function () {
        location.hash = "#visitor";
      });
    });
}

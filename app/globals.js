export const header = document.querySelector("header");
export const streetArtistHeaderSpan = document.querySelector(
  ".streetArtistHeaderSpan"
);
export const logo = document.querySelector(".logo");
export const auctionIcon = document.querySelector(".auction-icon");
export const hamburgerMenuBtn = document.querySelector(".hamburgerMenu-icon");
export const curtainMenuInner = document.querySelector("#curtainMenuInner");
export const artistStorageKey = "selectedArtistfromLS";

export function initVisible() {
  logo.style.display = "block";
  auctionIcon.style.display = "block";
  hamburgerMenuBtn.style.display = "none";
  curtainMenuInner.style.display = "none";

  const auctionBtn = document.querySelector(".auction-icon");
  auctionBtn.addEventListener("click", () => {
    location.hash = "#auction";
  });
}

export function initVisibleArtist() {
  getCurrentArtist();
  logo.style.display = "block";
  auctionIcon.style.display = "none";
  hamburgerMenuBtn.style.display = "block";
  curtainMenuInner.style.display = "none";

  let isOpen = false;

  hamburgerMenuBtn.addEventListener("click", () => {
    if (!isOpen) {
      curtainMenuInner.style.display = "flex";
      isOpen = true;
    } else {
      curtainMenuInner.style.display = "none";
      isOpen = false;
    }
  });

}

let currentArtist;


export function setCurrentArtist(artist) {
  currentArtist = artist;
  localStorage.setItem('currentArtist', currentArtist)
}

export function getCurrentArtist() {
  return localStorage.getItem('currentArtist') ?? currentArtist
}

let currentAuctioningItem;
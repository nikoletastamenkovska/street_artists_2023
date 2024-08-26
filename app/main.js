import { logo } from "./globals.js";
import { streetArtistHeaderSpan } from "./globals.js";
import { initArtistHomePage } from "./pages/artistHomepage.js";
import { initLandingPage } from "./pages/landingPage.js";
import { initVisitorHomePage } from "./pages/visitorHomePage.js";
import { initVisitorListingPage } from "./pages/visitorListingPage.js";
import { initAuctionPage } from "./pages/auctionPage.js";
import {
  initArtistCaptureImagePopUp,
  stopStream,
} from "./pages/artistCaptureImagePopUp.js";
import { initArtistItemsPage } from "./pages/artistItemsPage.js";
import { initArtistAddNewItemPage } from "./pages/artistAddNewItemPage.js"

logo.addEventListener("click", () => {
  location.hash = "#landing";
  streetArtistHeaderSpan.innerHTML = "Street ARTists";
});


function handleRoute() {
  const hash = location.hash === "" ? "#landing" : location.hash;

  const allPages = document.querySelectorAll(".page");

  allPages.forEach((page) => (page.style.display = "none"));

  document.querySelector(hash).style.display = "block";

  if (hash !== "#initArtistCaptureImagePopUp") {
    stopStream();
  }

  switch (hash) {
    case "#landing":
      initLandingPage();
      break;
    case "#artists":
      initArtistHomePage();
      break;
    case "#items":
      initArtistItemsPage();
      break;
    case "#addNewItem":
      initArtistAddNewItemPage();
      break;
    case "#artistCaptureImagePopUp":
      initArtistCaptureImagePopUp();
      break;
    case "#visitor":
      initVisitorHomePage();
      break;
    case "#visitorListing":
      initVisitorListingPage();
      break;
    case "#auction":
      initAuctionPage();
      break;
    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

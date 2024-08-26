import { initVisible } from "../globals.js";
import { items } from "../../data/data.js";

export function initVisitorHomePage() {
  initVisible();

  const callToActionBtn = document.querySelector("#call_to_action");

  callToActionBtn.addEventListener("click", function () {
    location.hash = "#visitorListing";
  });

  const imageSrcArray = [];

  items.forEach((item) => {
    let imagesContainer = document.querySelector("#images-wrapper-container");
    let imagesRow = document.querySelector("#images-row-to-left");
    let img = document.createElement("img");
    img.src = item.image;
    img.classList.add("images-on-left");

    imagesRow.append(img);
    imagesContainer.appendChild(imagesRow);

    imageSrcArray.push(item.image);
    img.addEventListener("click", function () {
      location.hash = "#visitorListing";
    });
  });
}

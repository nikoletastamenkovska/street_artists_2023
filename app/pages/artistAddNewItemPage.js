import { items } from "../../data/data.js";
import { getCurrentArtist, initVisibleArtist } from "../globals.js";
import { updateCurrentArtist } from "./artistHomepage.js";
import { renderArtistCards, storedItems, updateStoredItems } from "./artistItemsPage.js";

import { capturedImageImg } from "./artistCaptureImagePopUp.js";

const addButton = document.querySelector("#confirmAddNewItem");
const cancelBtn = document.getElementById("cancelBtn");

export const isPublishedFromSelect = document.getElementById("inputIsPublished");
export const imageURLFromInput = document.getElementById("inputForImageURL");
export const titleFromInput = document.getElementById("inputForTitle");
export const descriptionFromInput = document.getElementById("textareaForDescription");
export const typeFromInput = document.getElementById("inputForType");
export const priceFromInput = document.getElementById("inputForPrice");
export const artistFromInput = document.getElementById("inputForArtist");
export const dateCreatedFromInput = document.getElementById("inputForDateCreated");

export function initArtistAddNewItemPage() {
  initVisibleArtist();
  updateCurrentArtist();

  const takeASnapshotBtn = document.getElementById("takeASnapshotBtn");
  takeASnapshotBtn.addEventListener("click", () => {
    location.hash = "#artistCaptureImagePopUp";
  });

  const selectInputForType = document.getElementById("inputForType");
  selectInputForType.textContent = "";

  const defaultOptionForType = document.createElement("option");
  defaultOptionForType.value = "";
  defaultOptionForType.textContent = "";
  defaultOptionForType.selected = true;
  defaultOptionForType.disabled = true;

  selectInputForType.appendChild(defaultOptionForType);

  const addedType = new Set();

  items.forEach((item) => {
    const optionElementForType = document.createElement("option");
    if (!addedType.has(item.type)) {
      optionElementForType.classList.add("selected-options-for-input-type");
      optionElementForType.value = item.type;
      optionElementForType.textContent = item.type;

      selectInputForType.appendChild(optionElementForType);
      addedType.add(item.type);
    }
  });

  document.getElementById("inputForArtist").value = getCurrentArtist();

  const today = new Date().toISOString();
  dateCreatedFromInput.value = today;

  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      imageURLFromInput.value &&
      titleFromInput.value &&
      typeFromInput.value &&
      priceFromInput.value &&
      artistFromInput.value &&
      dateCreatedFromInput.value
    ) {
      const newItem = {
        id: new Date().valueOf().toString(),
        title: titleFromInput.value,
        description: descriptionFromInput.value,
        type: typeFromInput.value,
        image: imageURLFromInput.value,
        price: priceFromInput.value,
        artist: artistFromInput.value,
        dateCreated: dateCreatedFromInput.value,
        isPublished: isPublishedFromSelect.value,
        
      };
      storedItems.push(newItem);
      items.push(newItem);
      updateStoredItems(storedItems)
      renderArtistCards(newItem);

      location.hash = "#items";
      resetForm()
    } 
  });

  cancelBtn.addEventListener('click', resetForm)
}
function resetForm() {
  titleFromInput.value = "";
  descriptionFromInput.value = "";
  typeFromInput.value = "";
  imageURLFromInput.value = "";
  priceFromInput.value = "";
  dateCreatedFromInput.value = "";
  capturedImageImg.style.opacity = "0";
}

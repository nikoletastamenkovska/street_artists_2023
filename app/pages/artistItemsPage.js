import { initVisibleArtist, getCurrentArtist } from "../globals.js";
import { items } from "../../data/data.js";
import { updateCurrentArtist } from "./artistHomepage.js";
import {
  isPublishedFromSelect,
  imageURLFromInput,
  titleFromInput,
  descriptionFromInput,
  typeFromInput,
  priceFromInput,
  dateCreatedFromInput,
} from "./artistAddNewItemPage.js";

localStorage.setItem("itemsFromLS", JSON.stringify(items));

export let storedItems = JSON.parse(localStorage.getItem("itemsFromLS"));

export function initArtistItemsPage() {
  initVisibleArtist();
  updateCurrentArtist();

  const currentArtist = getCurrentArtist();
  const addNewItemBtn = document.getElementById("addNewItemBtn");
  addNewItemBtn.addEventListener("click", () => {
    location.hash = "#addNewItem";
  });

  const artistCards = storedItems.filter((card) => {
    return card.artist.includes(currentArtist);
  });

  renderArtistCards(artistCards);
}

export function renderArtistCards(array) {
  const artistItemsWrapper = document.getElementById("artistItemsWrapper");
  artistItemsWrapper.innerHTML = "";

  Array.from(array).forEach(
    ({ id, image, title, dateCreated, description, price, isPublished }) => {
      const artistCardWrapper = document.createElement("div");

      artistCardWrapper.classList.add("artist-card");


      const explanationCardColumn = document.createElement("div");

      const cardImage = document.createElement("img");
      cardImage.src = image;
      cardImage.classList.add("artist-card-image");

      const cardTitle = document.createElement("h6");
      cardTitle.textContent = title;

      const cardDateCreated = document.createElement("p");
      const beforeFormatDate = dateCreated.split("T")[0].split("-");
      const formatedDate = `${beforeFormatDate[2]}.${beforeFormatDate[1]}.${beforeFormatDate[0]}`;
      cardDateCreated.textContent = formatedDate;
      cardDateCreated.classList.add("card-date-created");

      const cardDescription = document.createElement("p");
      cardDescription.textContent = description;

      const cardPrice = document.createElement("span");
      cardPrice.textContent = `$${price}`;

      explanationCardColumn.append(
        cardTitle,
        cardDateCreated,
        cardDescription,
        cardPrice
      );
      explanationCardColumn.classList.add("explanation-card-container");

      const actionCardColumn = document.createElement("div");
      actionCardColumn.classList.add("action-card-column");

      const sendToAuctionBtn = document.createElement("button");
      sendToAuctionBtn.textContent = "Send To Auction";
      sendToAuctionBtn.classList.add("send-to-auction-btn");
      // sendToAuctionBtn.addEventListener("click", sendToAuction);

      const publishUnpublishBtn = document.createElement("button");
      if (isPublished) {
        publishUnpublishBtn.textContent = "Unpublish";
        publishUnpublishBtn.classList.add("unpublish-btn");
      } else {
        publishUnpublishBtn.textContent = "Publish";
        publishUnpublishBtn.classList.add("publish-btn");
      }

      publishUnpublishBtn.addEventListener("click", () => {
        isPublished = !isPublished;

        if (isPublished) {
          publishUnpublishBtn.textContent = "Unpublish";
          publishUnpublishBtn.classList.remove("publish-btn");
          publishUnpublishBtn.classList.add("unpublish-btn");
          updateStoredItems(storedItems);
        } else {
          publishUnpublishBtn.textContent = "Publish";
          publishUnpublishBtn.classList.remove("unpublish-btn");
          publishUnpublishBtn.classList.add("publish-btn");
          updateStoredItems(storedItems);
        }

        const card = items.find((item) => item.id === id);
        card.isPublished = isPublished;
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        storedItems = storedItems.filter((item) => item.id !== id);


        artistCardWrapper.remove();
        updateStoredItems(storedItems);
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const item = storedItems.find((item) => item.id === id);

        isPublishedFromSelect.value = item.isPublished;
        imageURLFromInput.value = item.image;
        titleFromInput.value = item.title;
        descriptionFromInput.value = item.description;
        typeFromInput.value = item.type;
        typeFromInput.innerHTML = item.type;
        priceFromInput.value = item.price;
        dateCreatedFromInput.value = item.dateCreated;
        

        location.hash = "#addNewItem";

        const addButton = document.querySelector("#confirmAddNewItem");
        addButton.textContent = "Update";

        addButton.addEventListener("click", function (event) {
          storedItems = storedItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                title: titleFromInput.value,
                description: descriptionFromInput.value,
                image: imageURLFromInput.value,
                price: priceFromInput.value,
              };
            }
            return item;
          });
          

        });
      });

      actionCardColumn.append(
        sendToAuctionBtn,
        publishUnpublishBtn,
        removeBtn,
        editBtn
      );

      artistCardWrapper.append(
        cardImage,
        explanationCardColumn,
        actionCardColumn
      );
      artistItemsWrapper.appendChild(artistCardWrapper);
      updateStoredItems();
    }
  );
}



export function updateStoredItems(array) {
  if (array === null || array === undefined) {
    array = items;
  } else {
    localStorage.setItem("itemsFromLS", JSON.stringify(array));
    storedItems = array;
  }
}

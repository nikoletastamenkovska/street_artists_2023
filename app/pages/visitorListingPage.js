import { initVisible } from "../globals.js";
import { items } from "../../data/data.js";
import { storedItems } from "./artistItemsPage.js";

const visitorCardContainerWrapper = document.querySelector(
  "#visitorCardContainerWrapper"
);
let continueLoadingCards = true;

const form = document.querySelector("form");

export function initVisitorListingPage() {
  initVisible();

  const publishedItems = storedItems.filter((item) => item.isPublished);

  let filteredPublishedCards = publishedItems;

  const CARDS_PER_SCROLL = 6;
  let startIndex = 0;
  let endIndex = CARDS_PER_SCROLL;

  loadCards(publishedItems, startIndex, endIndex);

  const scrollMessage = document.createElement("div");
  const scrollMessageHtml = document.querySelector("#scrollMessage");
  scrollMessage.innerHTML += `Scroll for more amazing art ...`;

  
  window.addEventListener("scroll", () => {
    if (
      window.pageYOffset ===
      document.body.scrollHeight - window.innerHeight
    ) {
      if (startIndex >= filteredPublishedCards.length) {
        continueLoadingCards = false;
        //needs to be fixed
        // scrollMessageHtml.innerHTML = ''
        // scrollMessageHtml.innerHTML += `Thank you for your interest`;
      } else {
        startIndex += CARDS_PER_SCROLL;
        endIndex += CARDS_PER_SCROLL;
        continueLoadingCards = true;

        setTimeout(() => {
          loadCards(filteredPublishedCards, startIndex, endIndex);
          if (continueLoadingCards) {
            scrollMessage.style.display = "none";
          }
        }, 3000);
      }
    } else {
      scrollMessage.style.display = "none";
    }
  });

  const scrollUp = document.querySelector("#scroll-up");
  scrollUp.addEventListener("click", () => {
    continueLoadingCards = false;
    window.scrollTo(0, 0);
  });

  const buttonFilterVisitorCards = document.querySelector(
    "#buttonFilterVisitorCards"
  );

  buttonFilterVisitorCards.addEventListener("click", openCurtain);

  const closeFiltersBtn = document.querySelector(".closeFiltersBtn");

  closeFiltersBtn.addEventListener("click", function () {
    location.reload();
    closeCurtain();
  });

  let title = "";
  let artist = "";
  let minPrice = 0;
  let maxPrice = 0;
  let type = "";

  confirmFiltersBtn.addEventListener("click", function (event) {
    event.preventDefault();

    title = filterByTitle.value.toLowerCase();
    artist = filterByArtist.value;
    minPrice = parseInt(filterByMinPrice.value);
    maxPrice = parseInt(filterByMaxPrice.value);
    type = filterByType.value;

    filteredPublishedCards = publishedItems.filter(
      (item) =>
        (title ? item.title.toLowerCase().includes(title) : true) &&
        (artist ? item.artist === artist : true) &&
        (minPrice ? item.price >= minPrice : true) &&
        (maxPrice ? item.price <= maxPrice : true) &&
        (type ? item.type === type : true)
    );

    startIndex = 0;
    endIndex = CARDS_PER_SCROLL;
    

    visitorCardContainerWrapper.innerHTML = "";

    loadCards(filteredPublishedCards, startIndex, endIndex);

    closeCurtain();

    form.reset();
  });
}

function loadCards(array, startIndex, endIndex) {
  array
    .slice(startIndex, endIndex)
    .forEach(({ image, artist, title, description, price }, idx) => {
      const evenOrOdd = idx % 2 ? "dark" : "light";
      if (continueLoadingCards) {
        visitorCardContainerWrapper.innerHTML += `
                <div class="card mb-4 ${evenOrOdd}">
                    <img class="card-img-top visitor-card-img" src="${image}" alt="${title}">
                    <div class="card-body">
                        <div class='artist-price-container'>
                            <h2 class='artist-name-visitor-card mb-0'>${artist}</h2>
                            <div><span class="visitor-img-price">$${price}</span></div>
                        </div>
                        <h6 class="card-title">${title}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                </div>`;
      }
    });
}

const confirmFiltersBtn = document.querySelector(".confirmFiltersBtn");

const filterByTitle = document.querySelector("#filterByTitle");

//for select artists
const filterByArtist = document.querySelector("#filterByArtist");
const addedArtist = new Set();

storedItems.forEach((item) => {
  if (!addedArtist.has(item.artist)) {
    const optionElement = document.createElement("option");
    optionElement.value = item.artist;
    optionElement.textContent = item.artist;
    filterByArtist.appendChild(optionElement);
    addedArtist.add(item.artist);
  }
});

const filterByMinPrice = document.querySelector("#filterByMin");
const filterByMaxPrice = document.querySelector("#filterByMax");

//select by type select

const filterByType = document.querySelector("#filterByType");
const addedType = new Set();

storedItems.forEach((item) => {
  if (!addedType.has(item.type)) {
    const optionElementForType = document.createElement("option");
    optionElementForType.value = item.type;
    optionElementForType.textContent = item.type;
    filterByType.appendChild(optionElementForType);
    addedType.add(item.type);
  }
});

function openCurtain() {
  window.scrollTo(0, 0);
  initVisible();
  document.getElementById("filterOpener").style.width = "100%";
}

function closeCurtain() {
  window.scrollTo(0, 0);
  document.getElementById("filterOpener").style.width = "0%";
}

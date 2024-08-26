import { initVisibleArtist } from "../globals.js";
import { storedItems } from "./artistItemsPage.js";
const biddingButton = document.getElementById("bidButton");
const highestBid = document.getElementById("highestBid");

export function initAuctionPage() {
  initVisibleArtist();

  

  const currentAuctioningItem = {
    id: 1,
    title: "Meet me where the wild things grow",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor...",
    type: "painting",
    image:
      "https://images.unsplash.com/photo-1544273677-c433136021d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=800",
    price: 1315,
    artist: "Leanne Graham",
    dateCreated: "2022-08-21T17:11:19.416Z",
    isPublished: false,
    isAuctioning: false,
    dateSold: "2023-04-23T15:21:41.926Z",
    priceSold: 2030,
  };
  const biddingContentImg = document.querySelector(".card-art-content img");
  const biddingContentTitle = document.querySelector(".card-art-content h6");

  biddingContentImg.src = currentAuctioningItem.image;
  biddingContentTitle.textContent = currentAuctioningItem.title;

  const biddingInput = document.getElementById("biddingInput");
  const biddingHistory = document.getElementById("biddingHistory");

  biddingInput.min = Number(Math.floor(currentAuctioningItem.price / 2));
  biddingInput.value = Number(Math.floor(currentAuctioningItem.price / 2));

  biddingButton.addEventListener("click", function () {
    highestBid.textContent = biddingInput.value;
    biddingHistory.innerHTML += `<li>${biddingInput.value}</li>`;

    const formData = new FormData();
    formData.set("amount", biddingInput.value);

    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.isBidding) {
          highestBid.textContent = data.bidAmount;
          biddingHistory.innerHTML += `<li class="dataIsBiding">${data.bidAmount}</li>`;
          biddingInput.min = data.bidAmount;
        } else {
          biddingHistory.innerHTML += `<li class="dataIsNotBidingAnymore">No more bidding from me</li>`;
        }
      });
  });
  initAuctionTimer();
}
function initAuctionTimer() {
const contentTimer = document.querySelector("#contentTimer");
biddingButton.addEventListener('click', function() {
  time = 5;
})
  let time = 5;

  contentTimer.textContent = `Time left : ${time}`;

  const intervalId = setInterval(function () {
    time -= 1;
    contentTimer.textContent = `Time left : ${time}`;
    if (time == 0) {
      clearInterval(intervalId);
      
    contentTimer.textContent = `Auction is finished!`;

    }
  }, 1000);
}

import {
  getCurrentArtist,
  initVisibleArtist,
  artistStorageKey,
  streetArtistHeaderSpan,
} from "../globals.js";
import { items } from "../../data/data.js";
import { formatDate, generateDateLabels } from "../utils/dates.js";
import { storedItems } from "./artistItemsPage.js"


let myChart;
export function initArtistHomePage() {
  initVisibleArtist();
  updateCurrentArtist();

  const artistItems = storedItems.filter(
    (item) => item.artist === getCurrentArtist()
  );
  const soldArtistItems = artistItems.filter((item) => Boolean(item.priceSold));
  const totalItemsSold = document.querySelector("#totalItemsSold");
  const totalIncome = document.querySelector("#totalIncome");
  const sumOfItemsSold = soldArtistItems.reduce(
    (acc, item) => acc + item.priceSold,
    0
  );

  totalItemsSold.textContent = `${soldArtistItems.length} / ${artistItems.length}`;
  totalIncome.textContent = `$${sumOfItemsSold}`;

  const liveAuctioningItem = document.querySelector("#liveAuctioningItem");

  liveAuctioningItem.addEventListener("click", () => {
    location.hash = "#auction";
  });

  const ctx = document.getElementById("myChart");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Amount",
          data: [],
          borderWidth: 0.1,
          borderColor: "#A16A5E",
          backgroundColor: "#A16A5E",
          hoverBackgroundColor: '#D44C2E'
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  const last_7 = document.querySelector("#lastSeven");
  const last_14 = document.querySelector("#lastFourtheen");
  const last_30 = document.querySelector("#lastThirty");

  function updateChart(number_of_days) {
    const labels = generateDateLabels(number_of_days);
    myChart.data.labels = labels;

    const chartData = labels.map((label) =>
      soldArtistItems.reduce((acc, item) => {
        if (label === formatDate(item.dateSold)) {
          return (acc += item.priceSold);
        }
        return acc;
      }, 0)
    );

    myChart.data.datasets[0].data = chartData;
    myChart.update();
  }

  let lastClickedButton = null;

  last_7.addEventListener("click", function () {
    updateChart(7);
    toggleButtonBackgroundColor(last_7);
  });

  last_14.addEventListener("click", function () {
    updateChart(14);
    toggleButtonBackgroundColor(last_14);
  });

  last_30.addEventListener("click", function () {
    updateChart(30);
    toggleButtonBackgroundColor(last_30);
  });

  function toggleButtonBackgroundColor(button) {
    if (button !== lastClickedButton) {
      button.style.backgroundColor = "#D44C2E";
      if (lastClickedButton !== null) {
        lastClickedButton.style.backgroundColor = "";
      }
      lastClickedButton = button;
    } else {
      button.style.backgroundColor = "";
      lastClickedButton = null;
    }
  }
}


export function updateCurrentArtist() {
  const selectedArtistfromLS = localStorage.getItem(artistStorageKey);
  if (selectedArtistfromLS) {
    streetArtistHeaderSpan.innerHTML = selectedArtistfromLS;
  } else {
    streetArtistHeaderSpan.innerHTML = getCurrentArtist();
  }
}
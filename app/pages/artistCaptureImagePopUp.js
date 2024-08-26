import { initVisibleArtist } from "../globals.js";
import { updateCurrentArtist } from "./artistHomepage.js";

const liveStreamVideo = document.getElementById("liveStream");
const captureStreamCanvas = document.getElementById("captureStream");
const captureImageBtn = document.getElementById("captureImage");
export const capturedImageImg = document.getElementById("capturedImage");

export function stopStream() {
  const stream = liveStreamVideo.srcObject;
  if(!stream)return;
  const allTracks = stream.getTracks();
  allTracks.forEach((track) => track.stop());
}

export function initArtistCaptureImagePopUp() {
  initVisibleArtist();
  updateCurrentArtist();
 
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    })
    .then((stream) => {
      console.log(stream);

      liveStreamVideo.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });

  liveStreamVideo.addEventListener("canplay", function () {
    captureStreamCanvas.width = liveStreamVideo.videoWidth;
    captureStreamCanvas.height = liveStreamVideo.videoHeight;
  });

  captureImageBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const ctx = captureStreamCanvas.getContext("2d");
    ctx.drawImage(liveStreamVideo, 0, 0);

    const imageUrl = captureStreamCanvas.toDataURL("image/png");
    const inputForImageURL = document.getElementById('inputForImageURL');
    inputForImageURL.value = imageUrl;

    capturedImageImg.src = imageUrl;
    capturedImageImg.style.opacity = '1';
    location.hash = '#addNewItem';
  });
}

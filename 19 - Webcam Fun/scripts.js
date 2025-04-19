const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.dir(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    // pixels = greenScreen(pixels)
    // pixels = flipCamera(pixels);
    // ctx.globalAlpha = 0.1
    ctx.putImageData(pixels, 0, 0);
  }, 64);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // get the image data and create a download link
  const data = canvas.toDataURL("image/jpeg");
  console.log(data);
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="photo taken!"></img>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.25; // BLUE
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 500] = pixels.data[i + 0]; // RED
    pixels.data[i + 200] = pixels.data[i + 1]; // GREEN
    pixels.data[i + 100] = pixels.data[i + 2]; // BLUE
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function flipCamera(pixels) {
  const pixelsFlipped = new Uint8ClampedArray(pixels.data.length);
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixelsFlipped[i + 0] = pixels.data[pixels.data.length - (i + 4)];
    pixelsFlipped[i + 1] = pixels.data[pixels.data.length - (i + 3)];
    pixelsFlipped[i + 2] = pixels.data[pixels.data.length - (i + 2)];
    pixelsFlipped[i + 3] = pixels.data[pixels.data.length - (i + 1)];
  }
  for(let i = 0; i < pixels.data.length; i++) {
    pixels.data[i] = pixelsFlipped[i]
  }
  return pixels;
}

getVideo();

const arr = [
  1, 1.1, 1.2, 1.3, 2, 2.1, 2.2, 2.3, 3, 3.1, 3.2, 3.2, 4, 4.1, 4.2, 4.3, 5,
  5.1, 5.2, 5.3,
];
const newArr = [];
for (let i = 0; i < arr.length; i += 4) {
  newArr[i + 0] = arr[arr.length - (i + 4)];
  newArr[i + 1] = arr[arr.length - (i + 3)];
  newArr[i + 2] = arr[arr.length - (i + 2)];
  newArr[i + 3] = arr[arr.length - (i + 1)];
}
console.log(newArr);

video.addEventListener("canplay", paintToCanvas);

const video = document.querySelector(".player__video");
const togglePlay = document.querySelector(".player__button");
const playerControls = document.querySelector(".player__controls");
const progressBar = document.querySelector(".progress");
const progress = document.querySelector(".progress__filled");
const volume = document.querySelector('.player__slider[name="volume"]');
const playbackSpeed = document.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = document.querySelectorAll(".player__button[data-skip");

function playPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  togglePlay.textContent = video.paused ? "►" : "||";
}

[togglePlay, video].forEach((control) => {
  control.addEventListener("click", playPause);
});

function durationPercent() {
  progress.style.flexBasis = `${
    (video.currentTime / video.duration) * (100).toFixed(1)
  }%`;
}

video.addEventListener("timeupdate", durationPercent);

function scrub(e) {
  if(scrubbing) {
    console.log()
    let progressBarWidth = parseInt(window.getComputedStyle(progressBar).width);
    let targetPercent = ((e.x / progressBarWidth) * 100).toFixed(1);
    progress.style.flexBasis = `${((e.x / progressBarWidth) * 100).toFixed(1)}%`;
    video.currentTime = ((video.duration / 100) * targetPercent);
  }
}

let scrubbing = false
progressBar.addEventListener("click", scrub)
progressBar.addEventListener("mousemove", (e) => { scrubbing && scrub(e) });
progressBar.addEventListener("mousedown", () => { scrubbing = true; })
progressBar.addEventListener("mouseup", () => { scrubbing = false })

volume.addEventListener("change", function () {
  video.volume = this.value;
});

playbackSpeed.addEventListener("change", function () {
  video.playbackRate = this.value;
});

skipButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    video.currentTime += parseInt(btn.dataset.skip);
  });
});
// element selectors
const video = document.querySelector(".player__video");
const playerControls = document.querySelector('.player__controls')
const togglePlay = document.querySelector(".player__button");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const volume = document.querySelector('.player__slider[name="volume"]');
const playbackSpeed = document.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = document.querySelectorAll("[data-skip]");
const fullscreen = document.querySelector(".fullscreen");

// functions
function playPause() {
  video.paused ? video.play() : video.pause();
}

function toggleIcon() {
  togglePlay.textContent = video.paused ? "►" : "||";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function volumeChange() {
  video.volume = this.value
}

function playbackRate() {
  video.playbackRate = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


// Listeners
video.addEventListener("click", playPause)
togglePlay.addEventListener("click", playPause)
video.addEventListener("play", toggleIcon)
video.addEventListener("pause", toggleIcon)
video.addEventListener("timeupdate", handleProgress);

playbackSpeed.addEventListener("change", playbackRate);
volume.addEventListener("change", volumeChange);
skipButtons.forEach((btn) => { btn.addEventListener("click", skip) });
fullscreen.addEventListener("click", function() {
  console.dir(video)
  video.requestFullscreen()
})

let mouseon = false
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mouseon && scrub(e) );
progress.addEventListener("mousedown", () => mouseon = true )
progress.addEventListener("mouseup", () => mouseon = false )
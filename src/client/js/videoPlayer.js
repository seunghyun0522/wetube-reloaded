const video = document.querySelector("video");
const screen = document.querySelector(".screen");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const volumeBtn = document.getElementById("volumeBtn");
const volumeBtnIcon = volumeBtn.querySelector("i");
const volumeBar = document.getElementById("volumeBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenBtnIcon = fullscreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const form = document.getElementById("commentForm");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
let videoPlayStatus = false;
let setVideoPlayStatus = false;

const setVolumeBtnIcon = (iconClassList) => {
  if (video.volume >= 0.5) {
    iconClassList = "fas fa-volume-up";
  } else if (video.volume >= 0.1) {
    iconClassList = "fas fa-volume-down";
  } else if (video.volume >= 0) {
    iconClassList = "fas fa-volume-off";
  }
  iconClassList = video.muted ? "fas fa-volume-mute" : iconClassList;
  volumeBtnIcon.classList = iconClassList;
  return iconClassList;
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const toggleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volumeBar.value = video.muted ? 0 : volumeValue;
  setVolumeBtnIcon();
};

const toggleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtnIcon.classList = "fas fa-compress";
  }
};

const handlePlayClick = () => {
  togglePlay();
};

const handleMute = (e) => {
  toggleMute();
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
  }
  volumeValue = value;
  video.volume = volumeValue;
  setVolumeBtnIcon();
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const videoEnd = () => {
  if (video.currentTime === video.duration) {
    video.pause();
    playBtnIcon.classList = "fas fa-play";
  }
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
  videoEnd();
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleFullScreen = () => {
  toggleFullscreen();
};

const handleFullscreenChange = () => {
  const fullscreen = document.fullscreenElement;
  if (!fullscreen) {
    fullscreenBtnIcon.classList = "fas fa-expand";
  }
};

const showControls = () => videoControls.classList.add("showing");
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  showControls();
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeydownPreventDefault = (event) => {
  const textarea = form.querySelector("textarea");
  const { key } = event;
  if (event.target === textarea) return;
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(key) > -1
  ) {
    event.preventDefault();
  }
};

const handleKeydown = (event) => {
  const textarea = form.querySelector("textarea");
  const { key } = event;
  showControls();
  controlsMovementTimeout = setTimeout(hideControls, 3000);
  if (event.target === textarea) return;
  if (key === " ") {
    togglePlay();
  } else if (key === "m" || key === "M") {
    toggleMute();
  } else if (key === "f" || key === "F") {
    toggleFullscreen();
  } else if (key === "ArrowUp") {
    video.volume = video.volume > 0.95 ? 1 : video.volume + 0.05;
    volumeBar.value = video.volume;
    if (video.muted) {
      video.muted = false;
    }
    setVolumeBtnIcon();
  } else if (key === "ArrowDown") {
    video.volume = video.volume < 0.05 ? 0 : video.volume - 0.05;
    volumeBar.value = video.volume;
    if (video.muted) {
      video.muted = false;
    }
    setVolumeBtnIcon();
  } else if (key === "ArrowLeft") {
    video.currentTime = video.currentTime < 5 ? 0 : video.currentTime - 5;
  } else if (key === "ArrowRight") {
    video.currentTime =
      video.currenTime > video.duration - 5 ? 0 : video.currentTime + 5;
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
screen.addEventListener("click", handlePlayClick);
volumeBtn.addEventListener("click", handleMute);
volumeBar.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);
fullscreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("fullscreenchange", handleFullscreenChange);
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keydown", handleKeydownPreventDefault);

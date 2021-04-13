const videoPlayer = document.getElementById("jsVideoPlayer");
const video = videoPlayer.querySelector("video");
const playIcon = document.getElementById("jsPlay");
const volumeIcon = document.getElementById("jsVolume");
const volumeRange = document.getElementById("jsVolumeRange");
const videoPlayerControllers = document.getElementById(
  "jsVideoPlayerControllers"
);
const screenIcon = document.getElementById("jsScreen");
const currentTime = document.getElementById("jsCurrentTime");
const totlaTime = document.getElementById("jsTotalTime");

let inputVolume;

const handleExitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  screenIcon.innerHTML = '<i class="fas fa-expand"></i>';
  screenIcon.addEventListener("click", handleFullScreen);
  screenIcon.removeEventListener("click", handleExitFullScreen);
};

const handleFullScreenKeyPress = (event) => {
  if (event.isComposing || event.keyCode === 70) {
    handleFullScreen();
  }
};

const handleFullScreen = () => {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  } else if (videoPlayer.mozRequestFullScreen) {
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitIsFullscreen) {
    videoPlayer.webkitIsFullscreen();
  } else if (videoPlayer.msRequestFullscreen) {
    videoPlayer.msRequestFullscreen();
  }
  screenIcon.innerHTML = '<i class="fas fa-compress"></i>';
  screenIcon.addEventListener("click", handleExitFullScreen);
  screenIcon.removeEventListener("click", handleFullScreen);
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(video.currentTime);
};

const setTotalTime = () => {
  const totalTime = formatDate(video.duration);
  totlaTime.innerHTML = totalTime;
  setInterval(getCurrentTime, 1000);
};

const formatDate = (time) => {
  const timeNumber = parseInt(time, 10);
  let hours = Math.floor(timeNumber / 3600);
  let minutes = Math.floor((timeNumber - hours * 3600) / 60);
  let seconds = timeNumber - hours * 3600 - minutes * 60;

  if (hours > 0 && hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    volumeIcon.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    video.muted = true;
    volumeIcon.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
};

const handleContollersOut = () => {
  volumeRange.removeChild(inputVolume);
  volumeIcon.addEventListener("mouseover", handleVolume);
  videoPlayerControllers.removeEventListener("mouseleave", handleContollersOut);
};

const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;
  if (video.volume === 0) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  } else if (video.volume > 0 && video.volume <= 0.6) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else if (video.volume > 0.6) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-up"></i>`;
  }
};

const handleVolume = () => {
  inputVolume = document.createElement("input");
  inputVolume.type = "range";
  inputVolume.step = 0.05;
  inputVolume.min = 0;
  inputVolume.max = 1;
  inputVolume.value = video.volume;
  volumeRange.appendChild(inputVolume);
  videoPlayerControllers.addEventListener("mouseleave", handleContollersOut);
  volumeIcon.removeEventListener("mouseover", handleVolume);
};

const handleEnded = () => {
  video.currentTime = 0;
  playIcon.innerHTML = `<i class="fas fa-play"></i>`;
};

const handlePlay = () => {
  if (video.paused) {
    playIcon.innerHTML = `<i class="fas fa-pause"></i>`;
    video.play();
  } else {
    playIcon.innerHTML = `<i class="fas fa-play"></i>`;
    video.pause();
  }
};

const init = () => {
  video.addEventListener("ended", handleEnded);
  playIcon.addEventListener("click", handlePlay);
  volumeIcon.addEventListener("mouseover", handleVolume);
  volumeIcon.addEventListener("click", handleMute);
  volumeRange.addEventListener("input", handleVolumeRange);
  video.addEventListener("loadedmetadata", setTotalTime);
  screenIcon.addEventListener("click", handleFullScreen);
  screenIcon.addEventListener("keydown", handleFullScreenKeyPress);
};

if (videoPlayer) {
  init();
}

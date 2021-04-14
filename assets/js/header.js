const body = document.getElementById("jsBody");
const headerWrapper = document.getElementById("jsHeaderWrapper");
const wetubeRenderer = document.getElementById("jsWetubeRenderer");
const dropDownContent = document.getElementById("jsDropDownContent");
const avatar = document.getElementById("jsAvatar");

let divWetubeHome;

const handleOrigin = (event) => {
  const { target } = event;

  if (target !== dropDownContent) {
    dropDownContent.style.display = "none";
    avatar.addEventListener("click", handleAvatar);
    body.removeEventListener("click", handleOrigin);
  }
};

const handleAvatar = (event) => {
  event.stopPropagation();
  dropDownContent.style.display = "flex";
  dropDownContent.focus();
  body.addEventListener("click", handleOrigin);
  avatar.removeEventListener("click", handleAvatar);
};

function wetubeHomeOut() {
  wetubeRenderer.removeChild(divWetubeHome);
  wetubeRenderer.addEventListener("mouseover", handleWetubeOver);
  wetubeRenderer.removeEventListener("mouseout", wetubeHomeOut);
}
function wetubeHome() {
  divWetubeHome = document.createElement("div");
  divWetubeHome.innerHTML = "WeTubeHome";
  divWetubeHome.id = "jsWetubeHome";
  wetubeRenderer.appendChild(divWetubeHome);
  wetubeRenderer.addEventListener("mouseout", wetubeHomeOut);
  wetubeRenderer.removeEventListener("mouseover", handleWetubeOver);
}
const handleWetubeOver = () => {
  setTimeout(wetubeHome, 1500);
};

const init = () => {
  wetubeRenderer.addEventListener("mouseover", handleWetubeOver);
  avatar.addEventListener("click", handleAvatar);
  dropDownContent.style.display = "none";
};

if (headerWrapper) {
  init();
}

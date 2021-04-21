const body = document.getElementById("jsBody");
const headerWrapper = document.getElementById("jsHeaderWrapper");
const wetubeRenderer = document.getElementById("jsWetubeRenderer");
const wetubeLogo = wetubeRenderer.querySelector(".wetube-logo");
const wetubePath = wetubeRenderer.querySelector(".wetube-logo");
const wetubeHome = document.getElementById("jsWetubeHome");
const dropDownContent = document.getElementById("jsDropDownContent");
const avatar = document.getElementById("jsAvatar");

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

function handleWetubeOut(event) {
  const { target } = event;
  if (
    target !== wetubeRenderer ||
    target !== wetubeLogo ||
    target !== wetubePath ||
    target !== wetubeHome
  ) {
    wetubeHome.style.display = "none";
    wetubeRenderer.addEventListener("mouseover", handleWetubeRendererOver);
    body.removeEventListener("mouseout", handleWetubeOut);
  }
}
const handleWetubeRendererOver = () => {
  setTimeout(() => {
    wetubeHome.style.display = "flex";
    wetubeHome.focus();
    body.addEventListener("mouseout", handleWetubeOut);
    wetubeRenderer.removeEventListener("mouseover", handleWetubeRendererOver);
  }, 1500);
};

const init = () => {
  wetubeHome.style.display = "none";
  wetubeRenderer.addEventListener("mouseover", handleWetubeRendererOver);

  if (avatar) {
    avatar.addEventListener("click", handleAvatar);
  }
  if (dropDownContent) {
    dropDownContent.style.display = "none";
  }
};

if (headerWrapper) {
  init();
}

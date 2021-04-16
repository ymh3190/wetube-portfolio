import axios from "axios";

const addCommentForm = document.getElementById("jsAddCommentForm");
const addCommentBtn = document.getElementById("jsAddCommentBtn");
const commentUL = document.getElementById("jsCommentUL");
const commentLength = document.getElementById("jsCommentLength");

function increaseCommentLength() {
  commentLength.innerHTML = parseInt(commentLength.innerHTML, 10) + 1;
}
function addComment(comment, creatorAvatar, creatorId) {
  const listComment = document.createElement("li");
  listComment.style.display = "flex";
  listComment.style.alignItems = "center";
  listComment.style.marginTop = "20px";
  const linkCreator = document.createElement("a");
  linkCreator.href = `/video/${creatorId}/your`;
  const imgAvatar = document.createElement("img");
  imgAvatar.src = creatorAvatar;
  imgAvatar.width = 48;
  imgAvatar.height = 48;
  imgAvatar.style.marginRight = "20px";
  linkCreator.appendChild(imgAvatar);
  listComment.appendChild(linkCreator);
  const divComment = document.createElement("div");
  const spanComment = document.createElement("span");
  spanComment.innerHTML = comment;
  divComment.appendChild(spanComment);
  listComment.appendChild(divComment);
  commentUL.appendChild(listComment);
  increaseCommentLength();
}
async function sendComment(comment) {
  const videoId = window.location.href.split("watch/")[1];
  const creatorAvatar = window.document.body
    .getElementsByClassName("avatar-img")[0]
    .getAttribute("src");
  const creatorId = window.document
    .getElementById("jsUserDetail")
    .querySelector("a")
    .href.split("user/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "post",
    data: {
      comment,
      creatorAvatar,
      creatorId,
    },
  });
  if (response.status === 200) {
    addComment(comment, creatorAvatar, creatorId);
  }
}
const handleButton = (event) => {
  event.preventDefault();
  const inputComment = addCommentForm.querySelector("input");
  const comment = inputComment.value;
  sendComment(comment);
  inputComment.value = "";
};

const init = () => {
  addCommentBtn.addEventListener("click", handleButton);
};

if (addCommentForm) {
  init();
}

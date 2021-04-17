import axios from "axios";

const addCommentForm = document.getElementById("jsAddCommentForm");
const addCommentBtn = document.getElementById("jsAddCommentBtn");
const commentUL = document.getElementById("jsCommentUL");
const commentLength = document.getElementById("jsCommentLength");

const commentS = document.getElementById("comment-s");

function increaseCommentLength() {
  commentLength.innerHTML = parseInt(commentLength.innerHTML, 10) + 1;
  commentS.style.marginLeft = "0.4%";
}
async function handleDeleteComment(event) {
  event.preventDefault();

  const commentId = window.document.getElementById("jsCommentId").innerHTML;

  const li = event.target.parentNode.parentNode;
  commentUL.removeChild(li);

  const response = await axios({
    url: `/api/${commentId}/delete`,
    method: "post",
    data: {},
  });
  if (response.status === 200) {
    commentLength.innerHTML = parseInt(commentLength.innerHTML, 10) - 1;
    if (commentLength.innerHTML === "1") {
      commentS.innerHTML = "comment";
    } else {
      commentS.innerHTML = "comments";
    }
  }
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

  const divComment = document.createElement("div");
  divComment.style.display = "flex";
  divComment.style.justifyContent = "space-between";
  divComment.style.width = "95%";
  const spanComment = document.createElement("span");
  spanComment.innerHTML = comment;
  const deleteCommentBtn = document.createElement("button");
  deleteCommentBtn.innerHTML = "X";

  linkCreator.appendChild(imgAvatar);
  listComment.appendChild(linkCreator);

  deleteCommentBtn.addEventListener("click", handleDeleteComment);

  divComment.appendChild(spanComment);
  divComment.appendChild(deleteCommentBtn);

  listComment.appendChild(divComment);
  commentUL.prepend(listComment);

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
  if (comment) {
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

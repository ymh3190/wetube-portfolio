import axios from "axios";

const commentUL = document.getElementById("jsCommentUL");
const commentLists = document.querySelectorAll("#jsCommentUL li");
const deleteCommentBtns = document.querySelectorAll(
  ".watchVideo-comment-info div button"
);
const commentS = document.getElementById("comment-s");
const commentLength = document.getElementById("jsCommentLength");

const handleButton = async (event) => {
  event.preventDefault();

  const commentId = window.document.getElementById("jsCommentId").innerHTML;
  const li = event.target.parentNode.parentNode;

  commentUL.removeChild(li);

  const response = await axios({
    url: `/api/${commentId}/delete`,
    method: "post",
  });

  if (response.status === 200) {
    commentLength.innerHTML = parseInt(commentLength.innerHTML, 10) - 1;
    if (commentLength.innerHTML === "1") {
      commentS.innerHTML = "comment";
    } else {
      commentS.innerHTML = "comments";
    }
    commentS.style.marginLeft = "0.4%";
  }
};

const init = () => {
  if (deleteCommentBtns) {
    deleteCommentBtns.forEach((deleteCommentBtn) => {
      deleteCommentBtn.addEventListener("click", handleButton);
    });
  }
};

if (commentUL) {
  init();
}

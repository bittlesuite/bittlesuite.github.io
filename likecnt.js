
// my code for like-counter

var likeContainer = document.querySelector(".like-counter")
var addLike = document.querySelector("#add-like");
var likeCount = localStorage.getItem("like-cnt");

likeCount = 1;
localStorage.setItem("like-cnt", 1);
likeContainer.innerHTML = likeCount;


// Adding onClick event listener
addLike.addEventListener("click", () => {
  likeCount = Number(likeCnt) + 1;
  localStorage.setItem("like-cnt", likeCount);
  likeContainer.innerHTML = likeCount;
});
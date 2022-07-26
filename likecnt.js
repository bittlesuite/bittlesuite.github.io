
// my code for like-counter



var clicks = 0;
function likeCounter() {
    clicks += 1;
    document.getElementById("demo").innerHTML = clicks;
}

// openFile=fopen(getFilePath(),0);

// readString = fread(openFile,flength(file)) ;

// var likeContainer = document.querySelector(".like-counter")
// var addLike = document.querySelector("#add-like");
// // var likeCount = localStorage.getItem("like-cnt");

// var likeCount = 1;
// likeCount = fread(openFile,flength(file)) ;
// localStorage.setItem("like-cnt", 1);
// likeContainer.innerHTML = likeCount;

// // Adding onClick event listener
// addLike.addEventListener("click", () => {
//   likeCount = Number(likeCnt) + 1;
//   editFile = fopen("likecnt.txt", 3);// opens the file for writing
//   fwrite(file, str);// str is the content that is to be written into the file.
//   localStorage.setItem("like-cnt", likeCount);
//   likeContainer.innerHTML = likeCount;
// });

//read/write instructions https://www.thecrazyprogrammer.com/2019/12/javascript-read-and-write-to-text-file.html
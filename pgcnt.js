var counterContainer = document.querySelector(".pg-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
    visitCount = Number(visitCount) + 1;
    localStorage.setItem("page_view", visitCount);
} else {
    visitCount = 1;
    localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

// Adding onClick event listener
resetButton.addEventListener("click", () => {
    visitCount = 1;
    localStorage.setItem("page_view", 1);
    counterContainer.innerHTML = visitCount;
});


//https://contactmentor.com/build-website-visitor-counter-javascript/


/// for like counter ---

openFile=fopen(getFilePath(),0);

var readString = fread(openFile,flength(file)) ;
document.getElementById("like").innerHTML = readString;
function myFunction() {
    var read = fread(openFile,flength(file)) ;
    read = int(read) + 1 ;

    editFile = fopen("likecnt.txt", 3);// opens the file for writing
    fwrite(file, read);// str is the content that is to be written into the file.

    document.getElementById("like").innerHTML = read;
}

// https://www.thecrazyprogrammer.com/2019/12/javascript-read-and-write-to-text-file.html


/// OLD


/*
var clicks = 0;
document.getElementById("like").innerHTML = clicks;
function myFunction() {
    clicks += 1;
    document.getElementById("like").innerHTML = clicks;
}
*/

// https://stackoverflow.com/questions/22402777/html-javascript-button-click-counter
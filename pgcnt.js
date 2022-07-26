import * as fs from 'fs';

var counterContainer = document.querySelector(".pg-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
    visitCount = Number(visitCount) + 1;
    localStorage.setItem("page_view", visitCount);

    // write to js file
    const fs = require("fs")
    const content = "bittle suite home page visited!"
    fs.writeFile("/cygwin/home/Aditi/bittlesuite.github.io/likecnt.txt", content, err => {
    if (err) {
        console.error(err)
        return
    }
    //file written successfully
})
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
    openFile=fopen(getFilePath(), 0);
    var read = fread(openFile,flength(file)) ;
    read = int(read) + 1 ;

    editFile = fopen("C:cygwin/home/aditi/bittlesuite.github.io/likecnt.txt", 3);// opens the file for writing
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
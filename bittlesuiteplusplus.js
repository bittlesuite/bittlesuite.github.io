var mode = $('#bittlesuite').attr('data');
var input_len = 1 ;
var no_guesses = 1 ;
if (mode == 1) {
    input_len = 1 ;
    no_guesses = 3 ;
} else if (mode == 4) {
    input_len = 4 ;
    no_guesses = 3 ;
} else if (mode == 8) {
    input_len = 8 ;
    no_guesses = 3 ;
} 

const INPUT_LEN = input_len
const NUMBER_OF_GUESSES = no_guesses ;

// toastr.info("val accepted from bytle html data: " + INPUT_LEN + " " + NUMBER_OF_GUESSES)

let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

const correctColor = 'darkseagreen'
const semiCorrectColor = 'lightcoral'
const incorrectColor = 'lightgrey'

// 8 characters
let rightGuessString = (Math.floor(Math.random() * 2)).toString();
for (let i = 0; i < INPUT_LEN-1; i++) {
    rightGuessString += (Math.floor(Math.random() * 2)).toString();
}

// falseBox gives 0, 1, 2, 3, 4, 5, 6, 7 pos of the falsely labeled box
let falseBox = (Math.floor(Math.random() * INPUT_LEN)).toString();
// falsePos gives which of the alternative 2 positions (correct, 
//    semi correct, incorrect) that the falseBox should be colored in
let falsePos = (Math.floor(Math.random() * 2)).toString();
// canFlagBeSet is false if guess is completly correct
let canFlagBeSet = true ;

console.log(rightGuessString)

//giving string of game play 
document.getElementById("game").innerHTML = "";
var game_play = "" ;
if (mode == 1) {
    game_play += "bittle! <br/>" ;
} else if (mode == 4) {
    game_play += "nibble! <br/>" ;
} else {//if (mode == 8) 
    game_play += "bytle! <br/>" ;
}

initBoard()

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey == "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey == "Enter") {
        checkGuess()
        return
    }

    if (pressedKey.toString() == 0 || pressedKey.toString() == 1) {
        insertLetter(pressedKey)
    } else {
        toastr.error("Not an accepted input. Please enter 0 or 1")
        return
    }
    //todo: consider  if (pressedKey.toString() == " ")

})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

//FUNCTIONS//

function initBoard() {

    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < INPUT_LEN; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function insertLetter (pressedKey) {
    if (nextLetter == INPUT_LEN) {
        toastr.error("already full with " + INPUT_LEN + " digits")
        return
    }
    pressedKey = pressedKey.toString() 

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != INPUT_LEN) {
        toastr.error("Not enough letters!")
        return
    }

    // for flag for false box
    if (guessString === rightGuessString) {
        canFlagBeSet = false ;
    }

    let box_clr_fill = [];
    for (let a = 0; a < INPUT_LEN; a++) {
        box_clr_fill[a] = ""
        if (currentGuess[a] == rightGuess[a]) {
            box_clr_fill[a] = "correctColor"
        }
    }

    toastr.error("falsebox = " + falseBox)

    for (let i = 0; i < INPUT_LEN; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        //MY V4
        if (currentGuess[i] == rightGuess[i]) { //CORRECT
            if (i == falseBox && canFlagBeSet) { // the falseBox case
                if (falsePos == 0) {
                    letterColor = semiCorrectColor
                } else { //falsePos == 1
                    letterColor = incorrectColor 
                }
                game_play += "☹️"; // sad
            } else { // the normal case
                letterColor = correctColor
                game_play += String.fromCodePoint(0x1F7E9); //green square    
            }
        } else {
            let flag1 = false ;
            for (let m = i+1; m < INPUT_LEN; m++) {
                if (currentGuess[i] == rightGuess[m] && box_clr_fill[m] == "") {
                    flag1 = true ;
                }
            }
            if(flag1) { //SEMICORRECT 
                if (i == falseBox && canFlagBeSet) { // the falseBox case
                    letterColor = correctColor
                    game_play += "☹️"; // sad
                } else { // the normal case
                    letterColor = semiCorrectColor
                    game_play += String.fromCodePoint(0x1F7E5); // red square
                }
            } else { //INCORRECT
                if (i == falseBox && canFlagBeSet) { // the falseBox case
                    letterColor = correctColor
                    game_play += "☹️"; // sad
                } else { // the normal case
                    letterColor = incorrectColor 
                    game_play += String.fromCodePoint(0x2B1C); // black or white square
                }
            }
        }

        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)

    }

    //setting a new false position
    falseBox = (Math.floor(Math.random() * INPUT_LEN)).toString();

    game_play += "<br/>";

    if (guessString === rightGuessString) {
        if (guessesRemaining == 4) {
            toastr.success("Insane!")
        } else if (guessesRemaining == 3) {
            toastr.success("Impressive!")
        } else if (guessesRemaining == 2) {
            toastr.success("Great Job!")
        } else if (guessesRemaining == 1) {
            toastr.success("Phew!")
        }
          
        // giving string of game play - IN PROGRESS
        document.getElementById("game").innerHTML = 
            "<div style=\"background-color:lightcoral\">"
            + "win 😊 @ " 
            + game_play
            + "<a style=\"color:rgb(194, 239, 239)\" href=\"https://bittlesuite.github.io\">https://bittlesuite.github.io</a> <br/>"
            + "</div>"
            + "share your game by copying the above text!";

        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.success(
                "You've run out of guesses!" + 
                `The correct byte was: "${rightGuessString}"`
            )

            // giving string of game play - IN PROGRESS
            document.getElementById("game").innerHTML = 
                "<div style=\"background-color:lightcoral\">"
                + "loss ☹️ @ " 
                + game_play
                + "<a style=\"color:rgb(194, 239, 239)\" href=\"https://bittlesuite.github.io\">https://bittlesuite.github.io</a> <br/>"
                + "</div>"
                + "share your game by copying the above text!";

        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === correctColor) {
                return
            } 

            if (oldColor === semiCorrectColor && color !== correctColor) {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

function copyGame() {
    alert('copy over game');
    navigator.clipboard.writeText(game_play);
}

//////////////////////////////////////old logic in "checkGuess()" for loop

        //MY V3 -- accurate feedback
        // if (currentGuess[i] == rightGuess[i]) {
        //     letterColor = correctColor
        //     toastr.info("correctcolor!")
        // } else {
        //     let flag1 = false ;
        //     for (let m = i+1; m < INPUT_LEN; m++) {
        //         if (currentGuess[i] == rightGuess[m] && box_clr_fill[m] == "") {
        //             flag1 = true ;
        //         }
        //     }
        //     if(flag1) {
        //         toastr.info("semicorrectcolor!")
        //         letterColor = semiCorrectColor
        //     } else {
        //         toastr.info("incorrectcolor!")
        //         letterColor = incorrectColor 
        //     }
        // }
        // let delay = 250 * i
        // setTimeout(()=> {
        //     //flip box
        //     animateCSS(box, 'flipInX')
        //     //shade box
        //     box.style.backgroundColor = letterColor
        //     shadeKeyBoard(letter, letterColor)
        // }, delay)

        //MY V2 - only grey and green
        // if (currentGuess[i] == rightGuess[i]) {
        //     letterColor = correctColor
        // } 
        // else {
        //     let flag = false
        //     for (let j = i; j < INPUT_LEN; j++) {
        //         if (currentGuess[i] == rightGuess[j]) {
        //             flag = true
        //         }
        //     }
        //     if(flag = true) {
        //         toastr.info("semicorrectcolor!")
        //         letterColor = semiCorrectColor
        //     } else {
        //         toastr.info("incorrectcolor!")
        //         letterColor = incorrectColor 
        //     }
        // }

        //MY V1 - inaccurate feedback; fun to play
        // // todo: edit my logic
        // if (currentGuess[i] == rightGuess[i]) {
        //     letterColor = correctColor
        //     rightGuess[letterPosition] = "#"
        // } else if (letterPosition == -1) {
        //     letterColor = incorrectColor
        // } else {
        //     letterColor = semiCorrectColor
        //     rightGuess[letterPosition] = "#"
        // }

        //GIVEN VERSION - ? like my v1
        // // is letter in the correct guess
        // if (letterPosition === -1) {
        //     letterColor = incorrectColor
        // } else {
        //     // now, letter is definitely in word
        //     // if letter index and right guess index are the same
        //     // letter is in the right position 
        //     if (currentGuess[i] == rightGuess[i]) {
        //         letterColor = correctColor
        //     } else {
        //         letterColor = semiCorrectColor
        //     }
        //     rightGuess[letterPosition] = "#"
        // }

var wordBank =
  [
    "sourdough", "brioche", "marbled rye", "cornbread", "ciabatta", "focaccia", "lavash", "pumpernickel", "baguette", "boule", "dampfnudel",
  ];


//letters tried
var lettersTried = [];
//index of chosen word form wordbank
var activeWordIndex;
//array of the active word
var activeWord;
// guesses left
var guessesLeft = 10;
var guessArray = [];
var gameStart = false;
var finish = false;
var wins = 0;


function gameRestart() {
  guessesLeft = 10;
  activeWordIndex = Math.floor(Math.random() * (wordBank.length));
  lettersTried = [];
  activeWord = wordBank[activeWordIndex].split("");
  document.addEventListener("keydown", getUserGuess);
  initGuessArray()
};

function initGuessArray() {
  for (var i = 0; i < activeWord.length; i++) {
    var letterObject = {
      letter: activeWord[i],
      isGuessed: false
    }

    guessArray.push(letterObject);
  }
}

function getUserGuess(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // repeat key press indication 
    if (lettersTried.includes(event.key)) {
      console.log("poopFace")
    } else {
      // letters tried push into previously guessed array
      lettersTried.push(event.key.toLowerCase())
      guessTest(event.key.toLowerCase());
    }
  }
};


function guessTest(letter) {
  // return an array of letters from the guess array 
  var arr = guessArray.map(item => item.letter)
  console.log(arr)
  if (arr.includes(letter)) {
    for (var i = 0; i < guessArray.length; i++) {
      console.log(guessArray[i])
      console.log(lettersTried)
      if (guessArray[i].letter === letter) {
        guessArray[i].isGuessed = true
        console.log(guessArray[i].isGuessed)
      }
    }
  } else {
    guessesLeft--
    console.log(guessesLeft)
  }

};

gameRestart();



// document.onkeydown = function (event) {
//   if (finish) {
//     gameRestart();
//     finish = false;
//   } else {
//    
//   }
// };

// function guessSelect(letter) {
//   if (guessesLeft > 0) {
//     if (!gameStarted) {
//       gameStarted = true;
//     }

//     if (lettersTried.indexOf(letter) === -1) {
//       lettersTried.push(letter);
//       guessTest(letter);
//     }
//   }

//   updateDisplay();
//   checkWin();
// };


// function guessTest(letter) {
//   var letterStorage = [];

//   for (var i = 0; i < wordBank[activeWordIndex].length; i++) {
//     if (wordBank[activeWordIndex][i] === letter) {
//       letterStorage.push(i);
//     }
//   }


//   if (letterStorage.length <= 0) {
//     guessesLeft--;

//   } else {

//     for (var i = 0; i < letterStorage.length; i++) {
//       activeWord[letterStorage[i]] = letter;
//     }
//   }
// };

// function checkWin() {
//   if (activeWord.indexOf("_") === -1) {
//     document.getElementById("winner-image").style.cssText = "display: block";
//     document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
//     wins++;
//     finish = true;
//   }
// };
var wordBank = ["sourdough", "brioche", "marbled rye", "cornbread", "ciabatta", "focaccia", "lavash", "pumpernickel", "baguette", "boule", "dampfnudel", "yeast", "flour", "sugar", "gluten", "water", "salt"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",]
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var lettersTried = [];
var userGuesses = null;
var activeWord = wordBank[Math.floor(Math.random() * wordBank.length)];
var guessArray = [];
var html = "<p><h1>";

// make array word and array
// loop array and add true false tags
function splitUpWord() {
  for (var i = 0, g = 0; i < activeWord.length; i++) {
    guessArray[g] = activeWord.charAt(i);
    g++
    if (activeWord.charAt(i) != " ") {
      guessArray[g] = false;
    } else {
      guessArray[g] = true;
    }
    g++
  }
}

function consoleLogger() {
  console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
  console.log("guessesLeft: " + guessesLeft + "\n");
  console.log("lettersTried: " + lettersTried + "\n");
  console.log("activeWord: " + activeWord + "\n");
  console.log("guessArray: " + guessArray + "\n");
  console.log("--------------------------------");
}

function resetGame() {
  guessesLeft = 10;
  lettersTried = [];
  activeWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  guessArray = [];
  splitUpWord();
  var instructions = "<p><h3>Press any key to start the game</p></h3>";
  document.querySelector("#instructions").innerHTML = instructions;
  var initGame = "<p><h1>";
  for (var i = 0; i < activeWord.length; i++) {
    if (activeWord.charAt(i) == " ") {
      initGame += "&nbsp;&nbsp;";
    } else {
      initGame += "_&nbsp;";
    }
  }
  initGame += "</h1></p>"
  document.querySelector("#game").innerHTML = initGame;
  var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
  document.querySelector("#stats").innerHTML = htmlStats;
}

//update screen:(game, stats, and guessed letters)
function howYouDoin() {
  for (i = 0, g = 0; i < (guessArray.length / 2); i++) {
    if (guessArray[g + 1] == true) {
      html += guessArray[g];
    } else {
      html += "_";
    }
    html += "&nbsp;";
    g = g + 2;
  }
  html += "</h1></p>"
  document.querySelector("#game").innerHTML = html;
  htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
  document.querySelector("#stats").innerHTML = htmlStats;
  htmlGuesses = "<p><h3>"
  for (var i = 0; i < lettersTried.length; i++) {
    htmlGuesses += lettersTried[i] + "&nbsp;";
  }
  htmlGuesses += "</h3></p>";
  document.querySelector("#guesses").innerHTML = htmlGuesses;
}

//check if guess is valid
//if false change to true
function checkGuess() {
  if (guessArray.indexOf(userGuess) < 0 && lettersTried.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
    guessesLeft--;
  }
  if (lettersTried.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
    lettersTried[lettersTried.length] = userGuess;
  }
  for (var i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === userGuess) {
      guessArray[i + 1] = true;
    }
  }
}


function winCheck() {
  if (guessArray.indexOf(false) < 0) {
    alert("MMMMM Yummy! Nom Nom!");
    wins++;
    resetGame();
  }
}


function lossesCheck() {
  if (guessesLeft == 0) {
    alert("NO BREAD FOR YOU!");
    losses++;
    resetGame();
  }
}


function htmlVar() {
  html = "<p><h1>";
}

// set up game
splitUpWord();
resetGame();
consoleLogger();
// run events
document.onkeyup = function (event) {
  userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  checkGuess();
  howYouDoin();
  htmlVar();
  winCheck();
  lossesCheck();
  consoleLogger();
}





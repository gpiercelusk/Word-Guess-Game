var wordBank =
  [
    "sourdough", "brioche", "marbled rye", "cornbread", "ciabatta", "focaccia", "lavash", "pumpernickel", "baguette", "boule", "dampfnudel",
  ];

const maxTries = 10;
var lettersTried = [];
var activeWordIndex;
var activeWord = [];
var guessesLeft = 0;
var gameStart = false;
var finish = false;
var wins = 0;

function gameRestart() {
  guessesLeft = maxTries;
  gameStarted = false;
  activeWordIndex = Math.floor(Math.random() * (wordBank.length));
  lettersTried = [];
  activeWord = [];



  document.onkeydown = function (event) {
    if (finish) {
      gameRestart();
      finish = false;
    } else {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        guessSelect(event.key.toLowerCase());
      }
    }
  };

  function guessSelect(letter) {
    if (guessesLeft > 0) {
      if (!gameStarted) {
        gameStarted = true;
      }

      if (lettersTried.indexOf(letter) === -1) {
        lettersTried.push(letter);
        guessTest(letter);
      }
    }

    updateDisplay();
    checkWin();
  };


  function guessTest(letter) {
    var letterStorage = [];

    for (var i = 0; i < wordBank[activeWordIndex].length; i++) {
      if (wordBank[activeWordIndex][i] === letter) {
        letterStorage.push(i);
      }
    }


    if (letterStorage.length <= 0) {
      guessesLeft--;

    } else {

      for (var i = 0; i < letterStorage.length; i++) {
        activeWord[letterStorage[i]] = letter;
      }
    }
  };

  function checkWin() {
    if (activeWord.indexOf("_") === -1) {
      document.getElementById("winner-image").style.cssText = "display: block";
      document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
      wins++;
      finish = true;
    }
  }

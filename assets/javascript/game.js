// Variables

// Answers Array
let hangmanAnswers =
["apocalyptica","atreyu","audioslave","avatar","beartooth","bobaflex","buckethead","bush","chevelle","chimaira","chiodos","cirice","dethklok","disturbed","evanescence","flyleaf","ghost","godsmack","him","halestorm","korn","megadeath","metallica","nickelback","nirvana","pantera","pulley","red","rush","saosin","seether","shinedown","silverstein","skillet","staind","starset","thrice","tool","trapt","trivium","turbowolf","underoath","uriah","volbeat"];

//Generates Random Word From Array Above
let wordChoice = hangmanAnswers[Math.floor(Math.random() * hangmanAnswers.length)];

// Troubleshoot: Log Random Word To Console
console.log(wordChoice, wordChoice.length);

// Variables for Guessed Letters
var guessedLettersArray = [];
var answerArray = [];

// Defining Variables From HTML
var wins = document.getElementById('win');
var currentWord = document.getElementById("current-word");
var count = document.getElementById('count');
var lettersGuessed = document.getElementById('empty-div');

// Winning and Losing
var countDown = 15;
var isWinning = 0;
count.textContent = countDown;
wins.textContent = isWinning;


// Functions


// Underscore Function: Generates Underscore For Each Letter In Word
function underscoreBuilder(currentWord) {
  for (var answerIndex = 0; answerIndex < currentWord.length; answerIndex++) {
    answerArray.push("_");
  }
return answerArray;
}
const currentUnderscore = underscoreBuilder(wordChoice);

// Joins Characters In answerArray
currentWord.textContent = currentUnderscore.join(' ');

// Troubleshoot underscoreBuilder
console.log(currentUnderscore);


// Keyup Event Initiates Game Function
document.onkeyup = function(event) {
  let keyPress = event.key;
  // Troubleshoots keyPress to Console
  console.log(keyPress); 

    // Determines Incorrect Letter Guess and Pushes to Array
    if (wordChoice.indexOf(keyPress) < 0 && keyPress.match(/^[a-z]+$/)) {
      guessedLettersArray.push(keyPress);
      lettersGuessed.textContent = guessedLettersArray.join(' ');
      // Decreases Guesses Remaining
      countDown--;
      count.textContent = countDown; 

      // Defines Game Over Conditions
      if (countDown===0) {
        answerArray = [];
        guessedLettersArray = [];
        count.textContent = 0;
        alert('GAME OVER');
          // Determines End of Game or Restart
          if (confirm ('Play again?') === true) {
            lettersGuessed.textContent = '';
            countDown = 15;
            count.textContent = countDown;
            wordChoice = hangmanAnswers[Math.floor(Math.random() * hangmanAnswers.length)];
            console.log(wordChoice);
            underscoreBuilder(wordChoice);
            currentWord.textContent = answerArray.join(' ');
          } else {
            alert('Rock on.');
            currentWord.textContent = 'GAME OVER';
            lettersGuessed.textContent = 'GAME OVER';
            wins.textContent = 'GAME OVER';
            count.textContent = 'GAME OVER';
          }
      }
    };

  // Determines Correct Guess and Updates Array
  for (var guessIndex = 0; guessIndex < wordChoice.length; guessIndex++) {
    if (wordChoice.charAt(guessIndex) == keyPress) {
      answerArray[guessIndex] = keyPress;
      currentWord.textContent = answerArray.join(' ');
    }
  }

  // Restarts Game When User Has Won
  if (answerArray.join('') === wordChoice) {
    // Clears Previous Guesses
    guessedLettersArray = [];
    lettersGuessed.textContent = '';
    // Increments Win Score
    isWinning++;
    wins.textContent = isWinning;
    // Restarts Guesses Remaining
    countDown = 15;
    count.textContent = countDown;
    // New Word Is Chosen At Random And Game Starts Over
    currentWord.textContent = '';
    wordChoice = hangmanAnswers[Math.floor(Math.random() * hangmanAnswers.length)];
    answerArray = [];
    underscoreBuilder(wordChoice);
    currentWord.textContent = answerArray.join(' ');
    // Troubeshoot Restart
    console.log(wordChoice, answerArray);
  }
}
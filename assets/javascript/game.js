
// const randomNumber = Math.floor(Math.random * characterArray.length);
let userGuess; //will hold the users guess
let currentCharacter; //will hold the current character
let win = 0; //holds the wins
let loss = 0; //holds the losses
let allLetters = []; //empty array that holds all the letters guessed
let incorrect = []; //empty array that holds all the incorrect letters
let guesses = 5;
let splitLetters;
let characterCount;
let underscoreToLetterArray = [];
let characterGuessed = false;
let failedToGuessCharacter = false;
let randomIndex;

//all the variables to manipulate the DOM
const word = document.getElementById("word"); //this is where the character/underscores will go
const wins = document.getElementById("wins"); //this is where the wins will go
const losses =  document.getElementById("losses"); //this is where the losses will go
const allLettersGuessed = document.getElementById("all-letters-guessed"); //this is where all letters - incorrect and correct - will go
const incorrectLetters = document.getElementById("incorrect-letters"); // this is where only the incorrect guesses will go. 
const guessesLeft = document.getElementById("guesses-left"); //this is where the user will see how many guesses they have left. 
const underscoreArray = document.getElementsByClassName("underscore");

const characterArray = [
    {
        name: "minerva",
        image: "assets/images/minerva-mirabal.jpg"
    },
    {
        name: "melba",
        image: "assets/images/melba.jpeg"
    },
    {
        name: "scout",
        image: "assets/images/scout-fing.jpeg"
    },
    {
        name: "lisbeth",
        image: "assets/images/lisbeth-salander.png"
    },
    {
        name: "rachel",
        image: "assets/images/rachel-chu.png"
    }
];

let roundsPlayed = characterArray.length;

function startGame(){

    assignCharacter();
    splitCharacter();

};

function assignCharacter(){
    randomIndex= Math.floor(Math.random() * characterArray.length);
    guessesLeft.innerText = guesses;
    wins.innerText = win;
    losses.innerText = loss;

    currentCharacter = characterArray[randomIndex].name;
    characterCount= currentCharacter.length;
    removeCharacter();
};


function removeCharacter(){
    characterArray.splice(randomIndex,1);
    for(let i = 0; i < characterArray.length; i ++){
        console.log(characterArray[i] + ". " + characterArray[i].name);
    };
};

function updatePage(letter){

    if(characterGuessed){
        win++;
        wins.innerText = win;
        roundsPlayed--;
        nextRound();
        splitCharacter();
        console.log(characterCount + currentCharacter);
    } else if(failedToGuessCharacter){
        loss++;
        losses.innerText = loss;
        roundsPlayed--;
        nextRound();
        splitCharacter();
    } else if(roundsPlayed === 0){
        gameOver();
    } else {
        guessLetter(letter);
    }

};


function splitCharacter(){
        splitLetters = currentCharacter.split("");

        for(let i = 0; i < splitLetters.length; i++){
            let underscore = document.createElement("div");
            underscore.innerHTML = "_ ";
            underscore.classList.add("underscore");
            underscore.setAttribute("id",[i]);
            underscore.style.display = "inline";
            underscore.setAttribute("data-letter", splitLetters[i]);
            word.append(underscore);
        };
};

function guessLetter(letter){

        for(let i = 0; i < underscoreArray.length;i++){
            underscoreLetter = underscoreArray[i].getAttribute("data-letter",[i]);
            underscoreToLetterArray.push(underscoreLetter);
        };

        checkIfCorrectLetter(letter);

};

function checkIfCorrectLetter(letter){
    let newGuessLetter;

    if(underscoreToLetterArray.includes(letter) && allLetters.includes(letter) === false){
        for(let i = 0; i < underscoreArray.length; i++){
            if(letter === underscoreArray[i].getAttribute("data-letter",[i])){
                document.getElementById([i]).innerHTML = letter;
            };
        };

        allLettersGuessed.innerText = "";
        allLetters.push(letter)
        characterCount--;
        if(characterCount === 0){
            characterGuessed = true;
        }

        for(let i = 0; i < allLetters.length; i++){
            newGuessLetter = document.createElement("span");
            newGuessLetter.innerText = allLetters[i] + " ";
            allLettersGuessed.appendChild(newGuessLetter);
        };

    }else{

        checkIfIncorrectLetter(letter);
    }
};

function checkIfIncorrectLetter(letter){
    let newWrongLetter;
    guesses--;
    guessesLeft.innerText = guesses;

    allLettersGuessed.innerText = "";
    incorrectLetters.innerText = "";
    allLetters.push(letter);
    incorrect.push(letter);

    for(let i = 0; i < allLetters.length; i++){
        newGuessLetter = document.createElement("span");
        newGuessLetter.innerText = allLetters[i] + " ";
        allLettersGuessed.appendChild(newGuessLetter);
    };

    for(let i = 0; i < incorrect.length; i++){
        newWrongLetter = document.createElement("span");
        newWrongLetter.innerText = incorrect[i]+ " ";
        newWrongLetter.style.color = "red";
        incorrectLetters.appendChild(newWrongLetter);
    };

    if(guesses === 0){
        failedToGuessCharacter = true;
    }
};

function nextRound(){
    resetGame();
    assignCharacter();
}

function resetGame(){
    word.innerText = "";
    allLettersGuessed.innerText = "";
    incorrectLetters.innerText = "";
    guessesLeft.innerText = 5;
    guesses = 5;
    splitLetters = "";
    characterCount = 0;
    allLetters = [];
    incorrect =[];
    currentCharacter = "";
    characterGuessed = false;
    failedToGuessCharacter = false;

};

function gameOver(){
    if(confirm("Game over! Your score was: " + win + ". Do you want to play again?")){
            startGame();
        };
};

document.onkeyup = function (event){

    if(event.keyCode >= 49 && event.keyCode<= 90){
        userGuess = event.key.toLowerCase();
        updatePage(userGuess);
    }else{
        alert("hey you need to press a letter!");
    };

};


startGame();



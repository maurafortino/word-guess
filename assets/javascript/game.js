
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

//all the variables to manipulate the DOM
const word = document.getElementById("word"); //this is where the character/underscores will go
const wins = document.getElementById("wins"); //this is where the wins will go
const losses =  document.getElementById("losses"); //this is where the losses will go
const allLettersGuessed = document.getElementById("all-letters-guessed"); //this is where all letters - incorrect and correct - will go
const incorrectLetters = document.getElementById("incorrect-letters"); // this is where only the incorrect guesses will go. 
const guessesLeft = document.getElementById("guesses-left"); //this is where the user will see how many guesses they have left. 
const underscoreArray = document.getElementsByClassName("underscore");
let randomIndex;

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

function startGame(){

    randomIndex= Math.floor(Math.random() * characterArray.length);
    guessesLeft.innerText = guesses;
    wins.innerText = win;
    losses.innerText = loss;

    currentCharacter = characterArray[randomIndex].name;
    characterCount= currentCharacter.length;
    console.log(characterCount);

    splitCharacter();
    //come back to this - this allows for the current character to be removed from the array
    console.log(currentCharacter);
    characterArray.splice(randomIndex,1);
    console.log(characterArray);


};

function splitCharacter(){
        //split the character into separate letters
        splitLetters = currentCharacter.split("");
        console.log(splitLetters);
        //loop over the letters from the character split:
        for(let i = 0; i < splitLetters.length; i++){
            //creates a new div for each letter 
            let underscore = document.createElement("div");
            //inside each div is an underscore and a space - one underscore for each letter in the character split
            underscore.innerHTML = "_ ";
            //give the underscore a class name
            underscore.classList.add("underscore");
            underscore.setAttribute("id",[i]);
            //set the display to inline so tht the underscores display side by side
            underscore.style.display = "inline";
            //set the attribute to data-letter and the data letter should correspond with the letter currently going through the loop
            //this will be used later one to determine if the letter guessed is equal to a letter in the word
            underscore.setAttribute("data-letter", splitLetters[i]);
            //appends the newly created underscore to the current word paragraph
            word.append(underscore);
        };
};

function guessLetter(letter){

    if(guessesLeft > 0 && characterCount === 0){
        win++;
        wins.innerText = wins;
        nextRound();
    } else {

        for(let i = 0; i < underscoreArray.length;i++){
            underscoreLetter = underscoreArray[i].getAttribute("data-letter",[i]);
            underscoreToLetterArray.push(underscoreLetter);
        };

        checkIfCorrectLetter(letter);
    }
    //as long as user has 
    if(guesses === 0 && characterCount > 0){
        loss++;
        losses.innerText = loss;
        nextRound();
    };
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
  
};

function nextRound(){
    clearGame();

    randomIndex= Math.floor(Math.random() * characterArray.length);
    currentCharacter = characterArray[randomIndex].name;
    characterArray.splice(randomIndex,1);

    splitCharacter();
}

function clearGame(){
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
};

document.onkeyup = function keyPressed(event){

    if(event.keyCode >= 65 && event.keyCode<= 90){
        userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        guessLetter(userGuess);
    }else{
        alert("hey you need to press a letter!");
    };

};


startGame();



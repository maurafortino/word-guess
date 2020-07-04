
// const randomNumber = Math.floor(Math.random * characterArray.length);
let userGuess; //will hold the users guess
let currentCharacter; //will hold the current character
const win = 0; //holds the wins
let loss = 0; //holds the losses
const allLetters = []; //empty array that holds all the letters guessed
const incorrect = []; //empty array that holds all the incorrect letters
let guesses = 5;
let splitLetters;

//all the variables to manipulate the DOM
const word = document.getElementById("word"); //this is where the character/underscores will go
const wins = document.getElementById("wins"); //this is where the wins will go
const losses =  document.getElementById("losses"); //this is where the losses will go
const allLettersGuessed = document.getElementById("all-letters-guessed"); //this is where all letters - incorrect and correct - will go
const incorrectLetters = document.getElementById("incorrect-letters"); // this is where only the incorrect guesses will go. 
const guessesLeft = document.getElementById("guesses-left"); //this is where the user will see how many guesses they have left. 
let randomIndex;

var characterArray = [
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
    //get a random index from the character array
    randomIndex= Math.floor(Math.random() * characterArray.length);
    guessesLeft.innerText = guesses;
    wins.innerText = win;
    losses.innerText = loss;

    //get the current character by using the random index
    currentCharacter = characterArray[randomIndex].name;

    //come back to this - this allows for the current character to be removed from the array
    // console.log(currentCharacter);
    // characterArray.splice(randomIndex,1);
    // console.log(characterArray);


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
        //set the display to inline so tht the underscores display side by side
        underscore.style.display = "inline";
        //set the attribute to data-letter and the data letter should correspond with the letter currently going through the loop
        //this will be used later one to determine if the letter guessed is equal to a letter in the word
        underscore.setAttribute("data-letter", splitLetters[i]);
        //appends the newly created underscore to the current word paragraph
        word.append(underscore);
    };

};
function sendAlert(){
    alert("you've already guessed that letter!");
};


function guessLetter(letter){
    let underscoreArray = document.getElementsByClassName("underscore");
    let underscoreToLetterArray = [];
    let newGuessLetter;
    let newWrongLetter;
    
    for(let i = 0; i < underscoreArray.length;i++){
        underscoreLetter = underscoreArray[i].getAttribute("data-letter",[i]);
        underscoreToLetterArray.push(underscoreLetter);
    };
    if(guesses !== 1){
        if(underscoreToLetterArray.includes(letter)){
            if(allLetters.includes(letter) === false){
                allLettersGuessed.innerText = "";
                allLetters.push(letter)
                for(let i = 0; i < allLetters.length; i++){
                    newGuessLetter = document.createElement("span");
                    newGuessLetter.innerText = allLetters[i] + " ";
                    allLettersGuessed.appendChild(newGuessLetter);
                }
            }else{
                sendAlert();
            };
        }else{
            guesses--;
            guessesLeft.innerText = guesses;
            if(allLetters.includes(letter) === false && allLetters.includes(letter) === false){
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
                }
            }else{
                sendAlert();
            };
            
        };
    }else{
        alert("No more guesses left!");
        loss++;
        losses.innerText = loss;
    };
};

document.onkeyup = function keyPressed(event){

    if(event.keyCode >= 65 && event.keyCode<= 90){
        userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        guessLetter(userGuess);
    }else{
        alert("hey you need to press a letter!");
    };

};
    



// function displayAllLetters(){
//     allLettersGuessed.innerText("");
//     for(let i =0; i < allLetters.length; i++){
//         let addedLetter = document.createElement("div");
//         addedLetter.innerHTML = allLetters[i];
//         addedLetter.style.display = "inline";
//     };
// };


startGame();



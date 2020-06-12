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

const randomNumber = Math.floor(Math.random * characterArray.length);
const userGuess;
const currentCharacter;
const word = document.getElementById("word");
const wins = 0;
const losses = 0;
const allLettersGuessed;
const incorrectGuesses; 
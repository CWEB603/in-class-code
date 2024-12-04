let secretWord;
let currentGuess = 0;
let guessRow;
let playerWord = "";

const letterKeys = document.querySelectorAll("#keyboard td");
const btnBack = document.getElementById("back");
const btnEnter = document.getElementById("enter");
const gameBoard = document.getElementById("gameBoard");
const wordList = ["GAMES", "NERDY", "FINCH", "WHITE"];


/**
 * chooseSecretWord
 * Summary - Sets secretWord to a random word from the wordList
 */
function chooseSecretWord (){
	secretWord = wordList[Math.floor(Math.random()*wordList.length)];
}


/**
 * endGame
 * Summary - creates an h2 and adds to to the HTML body with the endgame message
 * @param {string} message - The endgame message to display to the player
 */
function endGame ( message) {
	const h2Element = document.createElement("h2");
	const textNode = document.createTextNode(message);
	h2Element.appendChild(textNode);
	document.getElementsByTagName("body")[0].appendChild(h2Element);
	document.querySelector("#keyboard").style.display = "none";
}


/**
 * setGuessRow
 * Summary - changes the row that guessRow points to as the game progresses. If there is no more rows, displays a end game message
 */
function setGuessRow(){
	switch (currentGuess) {
		case 0:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 1:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 2:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 3:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 4:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 5:
			guessRow = gameBoard.children[currentGuess];
			break;
		case 6:
			const endGameMessage = `Game over. The correct word is ${secretWord}`
			endGame(endGameMessage);
			break;
		default:
			alert("There is an error in the game!!!!");
			break;
	}
}


/**
 * trackPlayerGuess
 * Summary - Adds new letter to playerWord and adds the letter to the gameboard
 */
function trackPlayerGuess(){
	if(playerWord.length < 5)
	{
		guessRow.children[playerWord.length].innerText = this.innerText;
		playerWord += this.innerText;
	}
}




/**
 * removeLetter
 * Summary - Removes last letter from playerWord and removes the letter from the gameboard
 */
function removeLetter(){
	playerWord = playerWord.slice(0, -1);
	guessRow.children[playerWord.length].innerText = "";
}

/**
 * enterGuess
 * Summary - checks the playerWord against the secretWord, gives player feedback about the location of the letters, and sets up the next turn
 */
function enterGuess(){
	let correctLetters = 0;
	if( playerWord.length < 5 ){
		alert("You must choose a five letter word.");
	}else{
		for(let i = 0; i < 5; i++){
			if(secretWord[i] === playerWord[i]){
				correctLetters++;
				guessRow.children[i].style.backgroundColor = "lightGreen";
			}else{
				if(secretWord.includes(playerWord[i])){
					guessRow.children[i].style.backgroundColor = "lightYellow";
				}
			}
		}
		if(correctLetters === 5){
			endGame("You Win!");
		}else{
				currentGuess++;
				setGuessRow();
				playerWord = "";
				console.log(correctLetters);
			}
	}
	
}


chooseSecretWord ();
setGuessRow();


for (key of letterKeys){
	if(key.id !== "back" && key.id !== "enter"){
		key.addEventListener("click", trackPlayerGuess);
	}
	if(key.id === "back"){
		key.addEventListener("click", removeLetter);
	}
	if(key.id === "enter"){
		key.addEventListener("click", enterGuess);
	}
};

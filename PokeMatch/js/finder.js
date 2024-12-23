/* Global variables */
"use strict";
const pokeImgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let counter = 0;
const guesses = [];
const startTime = localStorage.getItem("bestTime");
const startSecond = new Date();
let isWin = 0;

if(startTime != null){
	const displayBestTime = document.querySelector("p");
	displayBestTime.innerText = `Best time is: ${startTime} seconds`;
	displayBestTime.style.textAlign = "center";
}

/**
 * Name.		randomizeArray
 * Summary.		This function randomizes the order of items in an arry that is passed to it.
 * @param		{Array}		arr 		They arr that needs to be randomized
 * @returns		{Array}		randArr		A copy of the array in a random order
 */
function randomizeArray(arr){
	return arr.sort(function(){
		return Math.random() - 0.5;
	});
}

/**
 * Name.		getRandPokemon
 * Summary.		This function creates HTML image string information for random Pokemon. The random 
 * 				images are created by sending a random number to a pokemon image repository that 
 * 				references Pokemon by their pokedex number.
 * @returns 	{string}	imageElement 	A string with the text necessary to create an HTML image 
 * 												element.
 */
function getRandPokemon(){
	const ranPoke = Math.ceil(Math.random()*300 + 1);
	const divImg = document.createElement("div");
	const pokeImg = document.createElement("img");
	pokeImg.className = "index"+ranPoke;
	pokeImg.src = `${pokeImgSrc}${ranPoke}.png`;
	divImg.appendChild(pokeImg);
	return divImg
}

/**
 * Name.		createCards
 * Summary.		This function will create HTML for 16 cards that have 8 pairs of prokemon and randomize the order of the cards.
 * @returns		{Array}		randPokemon		An array of HTML script to create 16 pokemon cards.
 */
function createCards(){
	const arrPokeImgs = [];
	for(let i=0; i< 8;i++){
		const tmpImg = getRandPokemon();
		arrPokeImgs.push(tmpImg);
		arrPokeImgs.push(tmpImg);
	}
	randomizeArray(arrPokeImgs);
	return arrPokeImgs;
}




/**
 * Name.		buildBoard
 * Summary.		This function will take an array of cards and build a game board.
 * @param		{Array}		cards		An array of HTML script for cards
 */
function buildBoard(arrImgs){
	const htmlMain = document.querySelector("main");
	for(let i=0; i< arrImgs.length;i++){
		const tmpDIV = document.createElement("div");
		htmlMain.appendChild(tmpDIV);
	}
	for(let i=0; i < arrImgs.length; i++){
		htmlMain.children[i].innerHTML = arrImgs[i].innerHTML;
	}
}

const buildCards = createCards();
buildBoard(buildCards);
const images = document.querySelectorAll("img");

/**
 * Name.		hideImages
 * Summary.		Changes the opacity of images in an array to zero.
 * @param 		{Array} 	arrOfImgesToHide 	An array of HTML image references
 */
function hideImages(arrCards){
	//console.log("hide images",arrCards.length);
	for(let i = 0; i< arrCards.length; i++){
		arrCards[i].style.opacity = 0;
	}
}


/**
 * Name.		showImage
 * Summary.		Changes the opacity of an image.
 * @param		{image element}	img		Image element of a pokemon card we want to show.
 */
function showImage(paraImage){
	paraImage.style.opacity = 1.0;
}


/**
 * Name.		checkMatch
 * Summary.		Checks if the two selected cards stored in the guesses array match and resets the 
 * 				number of images counter to 0.
 */
function checkMatch(){
	if(guesses[0].className === guesses[1].className){
		counter = 0;
		guesses[0].removeEventListener("click",revealCard);
		guesses[1].removeEventListener("click",revealCard);
		// console.log("removed listener: ", guesses);
		// showImage(guesses[1]);
		isWin++;
		if(isWin == 8)
		{
			const totalTime = (new Date() - startSecond) / 1000;
			if(startTime == null){
				localStorage.setItem("bestTime", totalTime);
			}else if( totalTime < startTime){
				localStorage.setItem("bestTime", totalTime);
				document.querySelector("p").innerText = `Best time is: ${totalTime} seconds`;
			}
		}
	}else{
		
		// counter = 0;
		// console.log("reset counter", counter);
		setTimeout(function(){
			counter = 0;
			hideImages(guesses);
		},1000);
	}
}




/**
 * Name.		revealCard
 * Summary. 	Shows the card player selected for two guesses
 * @param 		{event} 	e 		An event sent via an event listener
 */
function revealCard(e){
	counter++;
	// console.log(counter);
	
	if(counter < 2){
		guesses[0] = this;
		showImage(this);
		// console.log(guesses, counter);
	}else if (counter === 2 && this === guesses[0] ){
		counter--;
		// console.log(guesses);
		// console.log("inside duplicate click", counter);
	} else if(counter === 2 && this != guesses[0]){
		guesses[1] = this;
		showImage(this);
		checkMatch();
		// console.log(guesses);
	}
}



setTimeout(function(){
	hideImages(images);
	for(let i=0; i< images.length; i++){
		images[i].addEventListener("click",revealCard);
	}
},5000);

document.querySelector("#resetGame").addEventListener("click", function(){location.reload();});
/* CODE TO RUN ON PAGE LOAD */

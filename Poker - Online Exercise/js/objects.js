"use strict";


const cardImages = document.querySelectorAll(".cardImg");
const dealButton = document.getElementById("dealB");
const drawButton = document.getElementById("drawB");
const standButton = document.getElementById("standB");
const betButton = document.getElementById("bet");


class pokerClass {

	constructor(){
		this.currentBank = null;
		this.currentBet = null;
	}

	setCurrentBank(currentBank){
		this.currentBank = currentBank;
	}

	setCurrentBet(cBet){
		this.currentBet = cBet;
	}

	getCurrentBet(){
		return this.currentBet;
	}

	getCurrentBank(){
		return this.currentBank;
	}

	placeBet(){
		this.currentBank -= this.currentBet;
		return this.currentBank;
	}

}

const pokerGame = new pokerClass();

pokerGame.setCurrentBank(500);
pokerGame.setCurrentBet(0);
let userBet = pokerGame.getCurrentBet();
pokerGame.setCurrentBet(25);

let bankText = document.getElementById("bank");
bankText.value = pokerGame.getCurrentBank();

let tmpBank = pokerGame.currentBank;
let countBet = 0;

function doBet(){
	
	pokerGame.setCurrentBet(parseInt(betButton.value));
	
	if(tmpBank >= pokerGame.getCurrentBet() ){
		pokerGame.setCurrentBank(countBet > 0 ? tmpBank : pokerGame.currentBank);
		bankText.value = pokerGame.placeBet();
		countBet++;
	}else{
		document.getElementById("status").innerText = "Insufficient Funds";
		// stop showing after 2 seconds
		setTimeout(function(){
			document.getElementById("status").innerText = "";
		}, 2000);
	}
};

betButton.addEventListener("change",doBet);

class PokerCard {
	constructor(cardSuit, cardRank){
		this.suit = cardSuit;
		this.rank = cardRank;
	}

	showCard()
	{
		return (this.suit + " "+ this.rank);
	}

	cardImage(){
		// return this.rank + "_" + this.suit + ".png";
		return `./img/${this.rank}_${this.suit}.png`;
	}
}

class Deck {
	suits = ["spades", "hearts", "clubs", "diamonds"];
	ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
	cards = [];

	createDeck(){
		for (let i = 0; i < this.suits.length; i++)
		{
			for( let j = 0; j < this.ranks.length; j++)
			{
				this.cards.push(new PokerCard(this.suits[i], this.ranks[j]));
			}
		}
	}

	shuffle(){
		this.cards.sort(function () {
			return 0.5 - Math.random();
		});
	}

	dealHand( objPlayerHand){
		let numOfCards = objPlayerHand.NUM_OF_CARDS_IN_HAND;
		if(this.cards.length > 10){
			objPlayerHand.cards = this.cards.splice(0,numOfCards);
		}else{
			const nDeck = new Deck();
			nDeck.createDeck();
			nDeck.shuffle();
			// this.cards = nDeck.cards;
			// add new Deck card to current Deck 
			this.cards = this.cards.concat(nDeck.cards);
			objPlayerHand.cards = this.cards.splice(0,numOfCards);
		}
	}

}

class PlayerHand{
	NUM_OF_CARDS_IN_HAND = 5;
	draw = 0;
	cards = [];

	replaceCard(index, pokerDeck){
		this.cards[index] = pokerDeck.cards.shift();
	}
}

// Deck.prototype.dealHand = function( objPlayerHand){
// 	let numOfCards = objPlayerHand.NUM_OF_CARDS_IN_HAND;
// 	if(this.cards.length > 10){
// 		objPlayerHand.cards = this.cards.splice(0,numOfCards);
// 	}else{
// 		const nDeck = new Deck();
// 		nDeck.createDeck();
// 		nDeck.shuffle();
// 		// this.cards = nDeck.cards;
// 		// add new Deck card to current Deck 
// 		this.cards = this.cards.concat(nDeck.cards);
// 		objPlayerHand.cards = this.cards.splice(0,numOfCards);
// 	}
// }

// PokerCard.prototype.cardImage = function(){
// 	return this.rank + "_" + this.suit + ".png";
// }

const cardDeck = new Deck();
cardDeck.createDeck();
cardDeck.shuffle();
const deal = new PlayerHand();
cardDeck.dealHand(deal);

function newDeal(){
	cardDeck.shuffle();
	cardDeck.dealHand(deal);
}

dealButton.addEventListener("click", function(){
	newDeal();
	for (let i = 0; i< cardImages.length; i++)
	{
		cardImages[i].src = deal.cards[i].cardImage();		
	}
	document.getElementById("bet").disabled = true;	
	dealButton.disabled = true;
	drawButton.disabled = false;
	standButton.disabled = false;
	if(countBet === 0){
		doBet();
	}
	countBet = 0;
});

// PlayerHand.prototype.replaceCard = function(index, pokerDeck){
// 	this.cards[index] = pokerDeck.cards.shift();	
// }

for (let i = 0; i < cardImages.length; i++)
{
	cardImages[i].addEventListener("click", function(event){
		if(event.target.src.includes("cardback.png")){
			cardImages[i].src = deal.cards[i].cardImage();
		}else{
			cardImages[i].src = "./img/cardback.png"
		}
		
	});
}

drawButton.addEventListener("click", function(){
	if(deal.draw <= 1)
	{
		deal.draw++;
		for(let i = 0; i < cardImages.length; i++)
		{
			if(cardImages[i].src.includes("cardback.png")){
				deal.replaceCard(i, cardDeck);
				cardImages[i].src = deal.cards[i].cardImage();	
			}
		}

	}
	if(deal.draw > 1){
		drawButton.disabled = true;
	}
});

function payBet(result) {
	let pay = 0;
	switch (result) {
		case "Royal Flush":
			pay = pokerGame.currentBet * 250;
			break;
		case "Straight Flush":
			pay = pokerGame.currentBet * 50;
			break;
		case "Four of a Kind":
			pay = pokerGame.currentBet * 25;
			break;
		case "Full House":
			pay = pokerGame.currentBet * 9;
			break;
		case "Flush":
			pay = pokerGame.currentBet * 6;
			break;
		case "Straight":
			pay = pokerGame.currentBet * 4;
			break;
		case "Three of a Kind":
			pay = pokerGame.currentBet * 3;
			break;
		case "Two Pair":
			pay = pokerGame.currentBet * 2;
			break;
		case "Jacks or Better":
			pay = pokerGame.currentBet * 1;
			break;
	}
	pokerGame.currentBank += pay;
	bankText.value = pokerGame.currentBank;
}

// check hand when click on stand
standButton.addEventListener("click", function(){
   // reaset the draws
   deal.draw = 0;
   // get the outcome
   const outcome = handType(deal);
   payBet(outcome);
   tmpBank = pokerGame.getCurrentBank();
   // console.log(outcome);
   //display the outcome
   document.getElementById("status").innerText = outcome;
   // stop showing after 2 seconds
   setTimeout(function(){
      document.getElementById("status").innerText = "";
   }, 2000);
   // allow them to play again
   dealButton.disabled = false;
   drawButton.disabled = true;
   standButton.disabled = true;
   document.getElementById("bet").disabled = false;
});



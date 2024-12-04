"use strict";

// classes
class PokerCard {
	constructor(cardSuit, cardRank) {
		this.suit = cardSuit;
		this.rank = cardRank;
	}
	showCard = function () {
		return `Your card is a ${this.rank} of ${this.suit}`;
	};
}

class Deck {
	suits = ["spades", "hearts", "clubs", "diamonds"];
	// note: card names have to be lowercase. We will use them to point to image files.
	ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
	cards = [];
	createDeck() {
		for (const suit of this.suits) {
			for (const rank of this.ranks) {
				const newCard = new PokerCard(suit, rank);
				this.cards.push(newCard);
			}
		}
	}
	shuffle() {
		this.cards.sort(function () {
			return 0.5 - Math.random();
		});
	}
	dealHand(player) {
		const numOfCards = player.NUM_OF_CARDS_IN_HAND;
		if (this.cards.length > 10) {
			player.cards = this.cards.splice(0, numOfCards);
		} else {
			const newDeck = new Deck();
			newDeck.createDeck();
			newDeck.shuffle();
			this.cards = this.cards.concat(newDeck.cards);
			player.cards = this.cards.splice(0, numOfCards);
		}
	}
}

class PlayerHand {
	NUM_OF_CARDS_IN_HAND = 5;
	draw = 0;
	cards = [];
	
	replaceCard(index, pokerDeck) {
		this.cards[index] = pokerDeck.cards.shift();
	};
}


// elements
const bankText = document.getElementById("bank");
const cardImages = document.getElementsByClassName("cardImg");
const dealButton = document.getElementById("dealB");
const drawButton = document.getElementById("drawB");
const standButton = document.getElementById("standB");

// game variables
const pokerGame = {
	currentBank: null,
	currentBet: null,
	placeBet: function () {
		this.currentBank -= this.currentBet;
		return this.currentBank;
	}
};
const gameDeck = new Deck();
const deal = new PlayerHand();


pokerGame.currentBank = 500;
pokerGame["currentBet"] = 0;


const exampleKey = "currentBet";
pokerGame[exampleKey] = 25;

bankText.value = pokerGame.currentBank;


document.getElementById("bet").addEventListener("change", function () {
	pokerGame.currentBet = parseInt(this.value);
	if (pokerGame.currentBank >= pokerGame.currentBet) {
		bankText.value = pokerGame.placeBet();
	} else {
		document.getElementById("status").innerText = "Insufficient Funds";
		setTimeout(function () {
			document.getElementById("status").innerText = "";
		}, 2000);
	}
});

PokerCard.prototype.cardImage = function () {
	return `./img/${this.rank}_${this.suit}.png`;
};

gameDeck.createDeck();
gameDeck.shuffle();


dealButton.addEventListener("click", function(){
   gameDeck.dealHand(deal);
   for(let i = 0; i < cardImages.length; i++){
      cardImages[i].src = deal.cards[i].cardImage();
   }

   dealButton.disabled = true;
   drawButton.disabled = false;
   standButton.disabled = false;
   document.getElementById("bet").disabled = true;
});


for(let i = 0; i < cardImages.length; i++){
   cardImages[i].addEventListener("click", function(){
      if(this.src.includes("cardback.png")){
         this.src = deal.cards[i].cardImage();
      }else{
         this.src = "./img/cardback.png";
      }
   });
}

drawButton.addEventListener("click", function(){
   deal.draw++;
   if(deal.draw >= 2){
      drawButton.disabled = true;
   }
   for(let i = 0; i < cardImages.length; i++){
      if(cardImages[i].src.includes("cardback.png")){
         deal.replaceCard(i, gameDeck);
         cardImages[i].src = deal.cards[i].cardImage();
      }
   }
});

standButton.addEventListener("click", function(){
   deal.draw = 0;
   const outcome = handType(deal);
   payBet(outcome);
   document.getElementById("status").innerText = outcome;
   setTimeout(function(){
      document.getElementById("status").innerText = "";
   }, 2000);
   // allow them to play again
   dealButton.disabled = false;
   drawButton.disabled = true;
   standButton.disabled = true;
   document.getElementById("bet").disabled = false;
});

function payBet(result){
   let pay = 0;
   switch(result){
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
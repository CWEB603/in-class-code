"use strict";


const cardImages = document.querySelectorAll(".cardImg");
const dealButton = document.getElementById("dealB");
const drawButton = document.getElementById("drawB");
const standButton = document.getElementById("standB");
const betButton = document.getElementById("bet");

/*
   We will be creating the poker game that is created in the textbook. But we will be using a slightly different process to create it than the text. 

   Some aspect have been simplified, but the primary difference is that this lesson will go through the lesson using a more modern approach to objects.

   In general, OOP approaches are not appropriate for JS because it is a functional programming paradigm, but in general, games are best suited to OOP.

   To begin the game, our player needs some starting money and the ability to make bets. We will be storing the player information about this in a pokerGame object literal.

   A object literal is essentially the same as an associative array that can also store functions. What does this mean? It means that to access the values in our object literal we will use a key word instead of an index number like with a typical array. Object literals uses a system of key value pairs.
   
   The benefit is that it give us more power to organize our data, the draw back is that, unlike with an array, we can't guarentee the order the data will be stored in.
      NOTE: browsers typically show object properties and methods in the same order because it is displayed alphabetically, but that is not a reflection of how the data is processed by the browser. 
	
	Below, follow the instructions to complete the game.
*/

// 1. Create a object literal called "pokerGame" to store the current value of the player's bank, and the current bet. Give the propertie the keys "currentBank" and "currentBet". Initially, set the values to null.

// NOTE: In this case, creating an object literal is the best practice for our pokerGame object. However, we could have also create a new object then added the properties to the new object as demonstrated below:
/*
ALTERNATIVE WAY TO CREATE AN OBJECT
*/
// const pokerGame = new Object(); // create a new generic object
// pokerGame.currentBank = null;
// pokerGame.currentBet = null;

// First way best practice. 

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

/* 
2. We can access the properies we just created using dot notation (e.g. pokerGame.currentBank) or bracket notation (e.g. pokerGame["currentBank"]). Dot notation is the most common way to access variables.

Bracket notation is especially useful if the value of the key is stored in a variable. You can access the key via the variable value. (e.g. pokerGame[varWithKeyName])

a) set the value of currentBank to 500 using dot notation.
b) set the vale of currentBet to 0 using bracket notation.
c) Create a variable with the string value "currentBet", then use bracket notation and the variable to set the value of currentBet to 25.
*/
pokerGame.setCurrentBank(500);
pokerGame.setCurrentBet(0);
let userBet = pokerGame.getCurrentBet();
pokerGame.setCurrentBet(25);

/*
3. We now need to update the game so the player can see these values.

Select the element with the id "bank" save the element reference in a variable called "bankText". Then set the value of the element to the currentBank.
*/

let bankText = document.getElementById("bank");
bankText.value = pokerGame.getCurrentBank();

/*
4. As players make bets, we will have to subtract the bet value from their bank. Let's create a method in our object to handle this.

Modify the pokerGame object:
a) Add a property called "placeBet" and set it equal to an anonymous function.
	- to reference the object properties with in the object, we need to use the keyword "this". "this" points to the current context. In this case, the current context is inside the object. So "this" is a reference to the object. Then we can use dot notatation or bracket notation to access the object properties (e.g. this.currentBet).
	- NOTE: the keyword "this" will not work if you use fat arrow notation to create the function.
b) Inside the function, subtract the currentBet from the CurrentBank. Then return the new value of the currentBank.

*/
// pokerGame.placeBet = function(){
// 	this.currentBank -= this.currentBet;
// }

/*
5. We have set the currentBet to 25, which is the same value that the game shows by default. But the user can change that with the drop down menu.
a) Find the element with the id "bet". Then add an on change event listener.
b) Create an anonymous function for the call back function. Do not use fat arrow notation.
c) Set the value of the currentBet to the value that the user chose. Use the keyword "this" to find the value.
- NOTE: the value of the drop down will be a string and we need an integer. Make sure to convert the value to an integer.

Now we need to update the player's bank by removing the value they bet. But we should only allow them to make the bet if the player has enough money. Add the following code to the call back function.
d) Check if the pokerGame currentBank is greater than the pokerGame currentBet.
e) if true: set the value of bankText to the pokerGame currentBank.
f) if not: select the element with the id "status" and set the inner text to "Insufficient Funds". Then add a timeout that waits 2 seconds before setting the inner text of the element with the id "status" back to an empty string.
*/

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

/*
6. At this point of the game, we need to show the player the cards. We will create an object to handle this.

In JavaScript, there are two ways to create classes. Since JavaScript is a functional programming languages, originally, classes were created with constructor functions.

This is an example of a constructor function for our PokerCard Class:

function PokerCard(cardSuit, cardRank){
   // this required to bind the variables and methods to the function acting as a class
   this.suit = cardSuit;
   this.rank = cardRank;
   this.showCard = function(){
      return `Your card is a ${this.rank} of ${this.suit}`;
   };
}

The traditational way was used because JavaScript had no class keyword and functions are already techincally objects because almost everything is an object in JavaScript.

Nowadays, the ability to create classes with the keyword "class" has been added to JavaScript. It is now considered best practice to use the keyword class to make classes opposed to the traditional constructor function.

Classes are very similar to object literals, but  are a bit more robust. Classes can create multiple instances of the same object. Gives you more control over what is private to the object and what is shared. Also gives access to a constructor.

a) Create a PokerCard class using the keyword class.
NOTE: it is convention to use Pascal case for class names.

b) give it a constructor function that requires two parameters: cardSuit and cardRank.
c) create a method called showCard. The method should return text that says what the rank and suit of the card is.


You can test your new class with the following code:
const testCard = new PokerCard("heart", "queen");
let message = testCard.showCard();
console.log(message);

Be sure to remove the code after testing.
*/
class PokerCard {
	constructor(cardSuit, cardRank){
		this.suit = cardSuit;
		this.rank = cardRank;
	}

	showCard()
	{
		return (this.suit + " "+ this.rank);
	}
}


/*
7. The above class allows us to make single cards. But we need a whole deck of cards.

a) Create a new Deck class using the keyword class.
b) This class does not require a construtor function.
c) The class requires the following properties:
	i) an array called "suits" with the values: "spades", "hearts", "clubs", and "diamonds".
	ii) an array called "ranks" with the values: "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", and "ace".
	iii) an empty array called cards.
d) Create a method called createDeck. It should do the following:
	i) Create nested for of loops. The outer loop should loop through the suits array and the inner loop should loop through the ranks array.
	ii) Each loop in the inner loop will point to a card suit and rank. Use these to create a new PokerCard object.
	iii) Now we need to add the PokerCard objects we create to the empty array cards. To do this, we will use an array method push. Push takes a value and adds the value onto the end of an array.

The last method we need is a way to shuffle the deck. We will use another array method to do this.

The array method "sort" sorts the array in place and returns reference to the sorted array. It is important to note that the method does not create a new array
	- by default, treats all items like strings and sorts alphabectically ascending.
	- can pass a callback function that defines the sort order. function is to compare two items in the array and return negative if the first item (a) is less than the second item (b). Positive if the opposite. Based on the results of comparisons, the array will be sorted.
	- we want the order to be random.
	- so we don't care which two variables we are looking at, we just want to randomly return positive or negative.

e) To create this method, create a method called shuffle. Below is the code for this method:

shuffle(){
	this.cards.sort(function () {
		return 0.5 - Math.random();
	});
}

Make sure you test this new class. Below is some code to help you test the class. Ensure that the values match your expectations:

const testDeck = new Deck();
console.log(testDeck.cards);
testDeck.createDeck();
console.log(testDeck.cards[0]);

testDeck.shuffle();
console.log(testDeck.cards[0]);

Don't forget to remove the testing code once you have finished testing.
*/

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

}

/*
8. We will need a way for our deck to deal new cards to our player. But before we do that, we need a class for our player's cards.

a) Create a class called PlayerHand using the keyword class.
NOTE: in cards, a hand refers to the player's current cards that they are playing with. In other words, the cards in their hand.

b) The class will track the maximun cards a player can have. We will need a property for this. But, we do not want this value to change while our game runs. Unfortunately, we cannot make constant properties in JavaScript. It is convention to indacate that a value should not change by using all caps (with underscores to separate word) in the variable name. Create a propert in this class called NUM_OF_CARDS_IN_HAND and set it equal to 5.

c) Create two more properties, draw (set to 0) and cards (an empty array). 

Players can take new cards twice. This is called a draw. The draw property will track how many time the player took new cards.

The cards array will track the players cards, or hand.
*/
class PlayerHand{
	NUM_OF_CARDS_IN_HAND = 5;
	draw = 0;
	cards = [];
}

/*
9. Now that we have a PlayerHand class, we can modify our Deck class to deal a hand to the player.

a) add a method to the Deck class called dealHand. The method will require a PlayerHand object. The function should do the following:
	i) create a variable numOfCards. It will hold how many cards should be delt to the player. Set it equal to the max number of cards, which is stored in the NUM_OF_CARDS_IN_HAND property of the PlayerHand object that was passed to the function.

Before we can deal cards to the user, we have to make sure there are enough cards in the deck. If there are less than 10 cards, we will want to add a new deck.
	ii) check if the length of the cards array propery is greater than 10.
		- if true: we can add cards to the player's hand. To do this, we will use another array method called splice.
			- Arrays have a method called slice and once spice, which sound similar but are different. Splice adds/removes items in an array in the position selected. Slice returns and an array of copies of the values of an array starting at the position selected (If you forget which is which, go to the documentation).
			- Set the value of the cards array of the PlayerHand passed to the method to a splice of the cards array in the Deck object. We will want to start at the beginning of the array and splice for five cards, or the value of numOfCards.
		- if false: 
			- create a new deck object
			- call the createDeck method.
			- shuffle the deck
			- Add the new deck to the cards array property of the current Deck object.
			- finally, deal five cards to the player using the splice array method like above.

testing code:

const myDeck = new Deck();
myDeck.createDeck();
myDeck.shuffle();

const deal1 = new PlayerHand();
myDeck.dealHand(deal1);
console.log(deal1.cards);

// test adding new deck
const deals = [];
for(let i = 0; i < 11; i++){
   const temp = new PlayerHand();
   myDeck.dealHand(temp);
   deals.push(temp);
}
// should all have 5 cards
console.log(deals);
//should have created a new deck
console.log(myDeck.cards);
*/

Deck.prototype.dealHand = function( objPlayerHand){
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


/*
10. All classes have a prototype that defines the object. And we can alter the prototype.

This can be porweful because almost everything in JS is an object, so we can alter most things (but not good practice because it make hard to understand code).

example: altering the prototype of an arrays (which is an objects in JavaScript)

Array.prototype.newMethod = function(){
   console.log("I added this!");
}
// now arrays have this method (can see in the console as well):
const testArr = [1,2,3];
testArr.newMethod();
console.log(testArr);

We will use this prototype ability to add pictures to our cards.

Reminder, this is NOT good practice... This is just for learning purposes. It would be best to make a method in the class to do this.

a) Select the PokerCard prototype property and add a method called cardImage.
b) set cardImage to an anonymous function that returns a string for the file path of the image. The image is in the img folder and it is names by combinding the rank then an underscore then the suit of the card. The file type is png.

*/
PokerCard.prototype.cardImage = function(){
	return this.rank + "_" + this.suit + ".png";
}


/*
11. We are now ready to start building the game play code.

We will need reference to some elements:
- all the elements with the class name cardImg. Call the variable cardImages
- the deal button that has the id dealB
- the draw button that has the id drawB
- the stand button that has the id standB

Then we need to set up some game elements:
- create a new Deck
- call the createDeck method
- shuffle the cards
- create a PlayerHand object

Add an event listener to the deal button. When clicked you need to:
- deal a hand to the player
- Then loop through each element with the classin cardImages and set the src attribute to the string returned from the cardImage method (which we added to the object prototype).
- At this point, the player can only make certain actions in the game. Disable the deal button and the bet element. Then enable the the draw and stand button.

*/



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
		cardImages[i].src = `./img/${deal.cards[i].cardImage()}`;		
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



/* 
12. Once the hand is delt, players can replace some of their cards to get a better hand. We need a way to select a card from the top of the deck.

Array methods can help us again! .shift() removes the first item from an array and returns the value.

a) Add a new method to the PlayerHand class called replaceCard. It will require the index of the card in the player's hand that needs to be changed, and the deck that it should draw the card from.
b) Replace the card with a new card by setting the card at the index passed to the method to the first card of the deck pass to the method. Use shift to get the card from the deck.

*/

PlayerHand.prototype.replaceCard = function(index, pokerDeck){
	this.cards[index] = pokerDeck.cards.shift();
}

/* 
13. The player will indicate which cards they don't want by clicking on them. But we do not want to change the cards until the player confirms that they have chosen the cards they want. To show the players which cards will be discarded, we will turn the cards over when the player selects them. But we will also give the player the option to turn the card back over to unselect it.

a) Add and event listener to each elements in the cardImages array. On a click event do the following:
	i) check if the card is already turned over by checking if the src attribute includes "cardback.png". The string method includes will return true if the value is in the string.
	ii) if true: turn the card to the face value by setting the src to the string returned from the cardImage method of the PlayerHand card in the same position of the one clicked on.
	*NOTE* using a counted for loop will allow you to use the postion of the card image to find the position of the card in the players hand object.
	iii) if false: show the back of the card by changing the CardImage element src to "./img/cardback.png".

*/
for (let i = 0; i < cardImages.length; i++)
{
	cardImages[i].addEventListener("click", function(event){
		if(event.target.src.includes("cardback.png")){
			cardImages[i].src = `./img/${deal.cards[i].cardImage()}`;
		}else{
			cardImages[i].src = "./img/cardback.png"
		}
		
	});
}

/*
14. The player will confirm their selection by clicking on the draw button. Remember, players only get two draws.

This means we we will have to add an event listener to the draw button. The call back function will need to do the following:
a) increase the draw counter in our PlayerHand object.
b) check if the number of draws are 2 or greater. 
	i) if so, disable the draw button
c) loop through all of the cardImage elements (use a counted for loop so you can track their index).
	i) if the elements src is set to the card back image, then we know that card needs to be replaced. Call the replaceCard method. Then update the image by calling the cardImage method.
*/
drawButton.addEventListener("click", function(){
	if(deal.draw <= 1)
	{
		deal.draw++;
		for(let i = 0; i < cardImages.length; i++)
		{
			if(cardImages[i].src.includes("cardback.png")){
				deal.replaceCard(i, cardDeck);
				cardImages[i].src = `./img/${deal.cards[i].cardImage()}`;	
			}
		}

	}
	if(deal.draw > 1){
		drawButton.disabled = true;
	}
});
/*
The final code is to check if the player won anything. This is tiggered by them clicking on the stand button. The can choose to stand after they have used all of their draws or before. This code has been provided for you below. It uses the handType function in the file handType.js. This code has been imported and we have access to it here.

I encourage you to read the code and see if you can understand what is happening.
*/

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



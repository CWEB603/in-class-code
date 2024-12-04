// JavaScript for Goat on the go 

// set pricing 

// define constant variable for price 
const COST_PER_GOAT = 25;
const COST_PER_ACRE = 50;
const COST_PER_KM = 2;
const DOG_COST = 100;

// elements we need
const quoteEstimateText = document.getElementById("estimate");
const numGoatsInput = document.getElementById("goatNum");
const acreInput = document.getElementById("acre");
const dogCheck = document.getElementById("dog");
const kmsInput = document.getElementById("distance");


function calculateQuote(){
    let estimate = 0;

    const numGoats = numGoatsInput.value;
    const numArce = acreInput.value;
    const numKms = kmsInput.value;

    estimate = (numGoats * COST_PER_GOAT) + (numArce * COST_PER_ACRE) +
    (numKms * COST_PER_KM);

    estimate += (dogCheck.checked) ? DOG_COST: 0;

    quoteEstimateText.innerText = `$${estimate}`;
}


// create event listners 
numGoatsInput.addEventListener("change", function(){
    numGoatsInput.value = (parseInt(numGoatsInput.value) < 6)? 6: (parseInt(numGoatsInput.value) > 20)? 20: numGoatsInput.value;
    // numGoatsInput.value = (numGoatsInput.value > 20)? 20: numGoatsInput.value;
    calculateQuote();
});

acreInput.addEventListener("change",calculateQuote);
dogCheck.addEventListener("change", calculateQuote);
kmsInput.addEventListener("change",calculateQuote);



/**
 * Global variables
 */
let SquirtleHP = 48;
let SquirtleDefense = 0;
let PikachuHP = 35;
let PikachuDefense = 0;
const thunderShock = 12;
const whirlPool = 15;

const gameResult = document.getElementById("gameText");
// const btnThunderShock = document.getElementById("shock");
// const btnDefense = document.getElementById("defense");
// const btnRetry = document.getElementById("retry");
const buttons = document.querySelectorAll(".btn");

/**
 * checkIfGameOver 
 * Summary - Checks to see if either pokemon has Fainted. If so, it ends the game.
 * @return	{boolean} Value indicates if the game is over 
 */
function checkIfGameOver(){
    let gameOver = false;
    if(PikachuHP <= 0)
    {
        gameOver = true;
        gameResult.innerText = "Pikachu has painted!";
    }else if (SquirtleHP <= 0) {
        gameOver = true;
        gameResult.innerText = "Squirtle has painted!";
    } 
    return gameOver;    
}

/**
 * disableBtns
 * Summary - Disables the player's buttons so that they cannot select any actions.
 */
function disableBtns(){
    // btnDefense.disabled = "true";
    // btnThunderShock.disabled = "true";
    // buttons.forEach((item) => {
    //     item.disabled = true;
    // });
    for( button of buttons)
    {
        button.disabled = true;
    }
}


/**
 * enableBtns
 * Summary - Enables the player's buttons. This starts the player's turn.
 */
function enableBtns(){
    // btnDefense.removeAttribute("disabled");
    // btnThunderShock.removeAttribute("disabled");
    // buttons.forEach((item) => {
    //     item.disabled = false;
    // });
    for( button of buttons)
        {
            button.disabled = false;
        }
}




/**
 * isMiss
 * Summary - Checks if an attack is successful or if the player missed.
 * @param {Int} successRate The percentage a player is expected to sucessfully complete their attack.
 * @return {boolean} Value inidcates if the player missed their attack.
 */
function isMiss(successRate){
    return (successRate > Math.ceil((Math.random()*100)) ? true : false);
}


/**
 * didOpponentAttack
 * Summary - Determines if the opponent will attack or defend
 * @return {boolean} True inidcates the opponent will attack
 */
function didOpponentAttack(){
    return (Math.ceil((Math.random()* 100)) < 70 ? true : false);
}



/**
 * opponentTurn 
 * Summary - completes the opponents turn and starts the player's next turn if the game is not over
 */
function opponentTurn(){
    if(didOpponentAttack())
    {
        const successRate = 80;
        if(isMiss(successRate))
        {
            gameResult.innerText = "Squirtle missed!";            
        }else{
            gameResult.innerText = "Squirtle attacks with Whirlpool";
            let deduceHP = PikachuHP - whirlPool + PikachuDefense;
            PikachuHP = deduceHP < 0 ? 0 : deduceHP;
            document.getElementById("pikachuHPbar").style.width = `${(PikachuHP / 35)*100}%`;
            document.getElementById("pikachuHP").innerText = PikachuHP;
            
            const PikaAnimation = document.getElementById("playerImg");
            PikaAnimation.classList.add("hit");
            PikaAnimation.style.backgroundColor = "rgb(163,215,213)";
            PikaAnimation.addEventListener("animationend",()=>{
                PikaAnimation.classList.remove("hit");
                PikaAnimation.style.backgroundColor = "transparent";
            });
        }
    }else{
        gameResult.innerText = "Squirtle increases his defense";
        SquirtleDefense++;
    }

    setTimeout(()=>{
        if(!checkIfGameOver()){
            enableBtns();
            gameResult.innerText = "What will Pikachu do?"
        }else{
            buttons[0].style.display = "inline";
            enableBtns();
        }
    },1000);
}



/**
 * playerAttacks
 * Summary - Completes the player's attack and starts the opponents turn if the game is not over
 */
function playerAttacks(){
    disableBtns();
    gameResult.innerText = "Pikachu attacks with thunder shock!";
    const deduceHP = SquirtleHP - thunderShock + SquirtleDefense;
    SquirtleHP = (deduceHP < 0 ? 0 : deduceHP);
    document.getElementById("squirtleHPbar").style.width = `${(SquirtleHP / 48) * 100}%`;
    document.getElementById("squirtleHP").innerText = SquirtleHP;

    const squirtleAnimation = document.getElementById("oppImg");
    squirtleAnimation.classList.add("hit");
    squirtleAnimation.style.backgroundColor = "rgb(247,222,38)";
    squirtleAnimation.addEventListener("animationend",()=>{
        squirtleAnimation.classList.remove("hit");
        squirtleAnimation.style.backgroundColor = "transparent";
    });
    const isGameOver = checkIfGameOver();
    setTimeout(()=>{
        if(!isGameOver){
            opponentTurn();
        }else{
            buttons[0].style.display = "inline";
            enableBtns();
        }
    },1000);
    
}

/**
 * playerDefends
 * Summary - Raises the players defence and starts the opponents turn if the game is not over
 */
function playerDefends(){
    disableBtns();
    gameResult.innerText = "Pikachu increases his defense.";
    PikachuDefense += 2;

    const isGameOver = checkIfGameOver();
    setTimeout(()=>{
        if(!isGameOver){
            opponentTurn();
        }
    },1000);
}

buttons[1].addEventListener("click",playerAttacks);
buttons[2].addEventListener("click",playerDefends);

const tryAgain = document.getElementById("retry");
tryAgain.addEventListener("click",()=>{
    location.reload();
});
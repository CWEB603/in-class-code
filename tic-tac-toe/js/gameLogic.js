/* reference: https://www.cs4fn.org/teachers/activities/intelligentpaper/intelligentpaper.pdf */

// grab all of td elements
const tdElements = document.getElementsByTagName('td');
let turnCounter = 0;

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// add a hover event -- onmouseover && onmouseout
function highlight(e){
    e.target.style.backgroundColor = "rgba(255,255,0,0.4)";
}
function removeHighlight(e){
    e.target.style.backgroundColor = "transparent";
}

function xMove(cell){
    tdElements[cell].innerText = "X";
    tdElements[cell].removeEventListener('mouseover', highlight);
    tdElements[cell].removeEventListener('mouseout', removeHighlight);
    tdElements[cell].removeEventListener('click', oMove);
}

// need to be able to add a O where clicked
    // add another eventlistener to add the text O
    // remove hover effect from that location.
function oMove(e){
    e.target.innerText = "O";
    e.target.removeEventListener('mouseover', highlight);
    e.target.removeEventListener('mouseout', removeEventListener);
    e.target.removeEventListener('click', oMove);
    turnCounter++;
    npcTurn();
}

// NPC turn
/* 
	IF the other player did not go there
	THEN go in the opposite corner to move 1.
	ELSE go in a free corner.
*/
function npcSecondMove(){
    // prefer to go in 8
    // else go in 2
    if(tdElements[8].innerText === "O"){
        xMove(2);
    }else{
        xMove(8);
    }
}

function canWin(){
    for(combo of winningCombos){
        let o = 0;
        let x = 0;
        let full = 0;

        for(cell of combo){
            if(tdElements[cell].innerText === "X"){
                x++;
                full++;
            } else if (tdElements[cell].innerText === "O"){
                o++;
                full++;
            }
        }
        if((o === 2 || x === 2) && (full !== 3)){
            return [true, combo];
        }
    }
    return [false, []];
}

function block(row){
    // console.log(row);
    for(cell of row){
        if(tdElements[cell].innerText === ""){
            xMove(cell);
        }
    }
}

function endGame(){
    for(cell of tdElements){
        cell.removeEventListener("mouseover", highlight);
        cell.removeEventListener("mouseoot", removeHighlight);
        cell.removeEventListener("click", oMove);
    }
}

function didWin(){
    for(combo of winningCombos){
        let x = 0;
        for(cell of combo){
            if(tdElements[cell].innerText === "X"){
                x++;
            }
        }
        if(x === 3){
            // end game
            endGame();
            // return true;
        }
    }
    // return false;
}

/* 
    IF there are 2 Xs and a space in a line
    THEN go in that space.
    ELSE IF there are 2 Os and a space in a line
    THEN go in that space.
    ELSE go in a free corner.
*/
function npcThirdTurn(){
    // console.log(canWin());
    const nextMoveDecided = canWin();
    if(nextMoveDecided[0]){
        block(nextMoveDecided[1]);
    } else if(tdElements[2].innerText === ""){
        xMove(2);
    } else{
        xMove(6);
    }
    didWin();
}

function npcForthTurn(){
    const nextMoveDecided = canWin();
    if(nextMoveDecided[0]){
        block(nextMoveDecided[1]);
    } else{
        xMove(6);
    }
    didWin();
}

function lastMove(){
    for(cell of tdElements){
        if(cell.innerText === ""){
            xMove(cell);
        }
    }
}

function npcTurn(){
    switch(turnCounter){
        case 1:
            npcSecondMove();
            break;
        case 2:
            npcThirdTurn();
            break;
        case 3:
            npcForthTurn();
            break;
        case 4:
            lastMove();
            break;
        default:
            alert("An error has occured!");
            break;
    }
}


for(cell of tdElements){
    cell.addEventListener("mouseover", highlight);
    cell.addEventListener("mouseout", removeHighlight);
    cell.addEventListener("click", oMove);
}

// remove effect from the selected square to show it is taken
xMove(0);

// the button retry, reload the page like F5 pressed 
document.querySelector(".btn").addEventListener("click",()=> location.reload());

/*
reference: https://www.cs4fn.org/teachers/activities/intelligentpaper/intelligentpaper.pdf
*/

// "use strict";

// grab all of td elements
const tdElements = document.getElementsByTagName('td');
let turnCounter = 0;
// console.log(tdElements);


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

//add a hover event -- onmouseover && onmouseout
function highlight(e){
    e.target.style.backgroundColor = "rgba(255,255,0,0.4)";
}

function removeHighLight(e){
    // e.target.style.backgroundColor = "rgba(255,255,0,0)";
    e.target.style.backgroundColor = "transparent";
}

function xMove(cell){
    tdElements[cell].innerText = "X"
    tdElements[cell].removeEventListener('mouseover', highlight);
    tdElements[cell].removeEventListener('mouseout', removeHighLight);
    tdElements[cell].removeEventListener('click', oMove);
}

// need to be able to add a O where clicked
//  add another eventlistener to add the text O
//  remove hover effect from that location
function oMove(e){
    e.target.innerText = "O";
    e.target.removeEventListener('mouseover', highlight);
    e.target.removeEventListener('mouseout', removeEventListener);
    e.target.removeEventListener('click',oMove);
    turnCounter++;
// console.log(e);

    npcturn();
    // console.log(document.getElementsByTagName('td'));
}

//NPC turn
/*
    IF the other player did not go there
    THEN go in the opposite corner to move 1
    ELSE go in a free corner
*/

function npcSecondMove(){
    //prefer to go in 8
    //else go in 2
    if(tdElements[8].innerText === "O"){
        xMove(2);
    }else{
        xMove(8);
    }
}

/*
    logic to find a possible combo has either X or O
*/

function canWin(){
    for(combo of winningCombos){
        let o = 0;
        let x = 0;
        let full = 0;

        for(cell of combo){
            if(tdElements[cell].innerText === "X")
            {
                x++;
                full++;
            }else if(tdElements[cell].innerText === "O")
            {
                o++;
                full++;
            }
        }
        if((o === 2 || x === 2) && full !== 3){
            return[true, combo];
        }
    }
    return [false, []];
}

function block(row){
    // console.log(row);
    for(cell in row){
        if(tdElements[cell].innerText === ""){
            xMove(cell);
            // console.log(cell);
        }
    }
}

function endGame(){
    for(cell of tdElements){
        cell.removeEventListener("mouseover", highlight);
        cell.removeEventListener("mouseout", removeHighLight);
        cell.removeEventListener("click", oMove);

    }
}

function didwin(){
    for(combo of winningCombos){
        let x = 0;

        for(cell of combo){
            if(tdElements[cell].innerText === "X"){
                x++;
            }            
        }

        if (x === 3){
            // return true;
            endGame();
        }
    }
    // return false;
}

/*
    IF there are 2 Xs and a space in a line
    THEN go in that space
    ELSE IF there are 2 Os and a space in a line
    THEN go in that space
    ELSE go in a free corner
*/
function npcThirdMove(){
    const nextMoveDecided = canWin();
    if(nextMoveDecided[0]){
        block(nextMoveDecided[1]);
    }else if(tdElements[2].innerText === ""){
        xMove(2);
    }else{
        xMove(6);
    }
    didwin();
}

function npcForthMove(){
    const nextMoveDecided = canWin();
    if(nextMoveDecided[0]){
        block(nextMoveDecided[1]);
    }else{
        xMove(6);
    }
    didwin();
}

function lastMove(){
    // for(let i = 0; i < 9; i++){
    //     if(tdElements[i].innerText === ""){
    //         xMove(i);
    //     }
    // }
    for(cell of tdElements){
        if(cell.innerText === ""){
            xMove(cell);
        }
    }
}

function npcturn(){
    // console.log(turnCounter);
    switch(turnCounter){
        case 1:
            npcSecondMove();
            break;
        case 2:
            npcThirdMove();
            break;
        case 3:
            npcForthMove();
            break;
        case 4:
            lastMove();
            break;
        default:
            alert("An error has occured!");
            break;
    }
}


for (cell of tdElements){
    // console.log(cell);
    cell.addEventListener("mouseover",highlight);
    cell.addEventListener("mouseout",removeHighLight);
    cell.addEventListener("click",oMove);
}



//remove effect from the selected square to show it is taken
// tdElements[0].removeEventListener('mouseover', highlight);
// tdElements[0].removeEventListener('mouseout', removeHighLight);
// tdElements[0].removeEventListener('click', oMove);
xMove(0);

// button retry to refresh the page from begin
document.querySelector(".btn").addEventListener("click",()=> location.reload());

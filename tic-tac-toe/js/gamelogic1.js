/*
reference: https://www.cs4fn.org/teachers/activities/intelligentpaper/intelligentpaper.pdf
*/

"use strict";

// grab all of td elements
const tdElements = document.getElementsByTagName('td');
let isWin = false;

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

//function remove highlight
function removeHighLight(e){
    e.target.style.backgroundColor = "transparent";
}

//function of machine move
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
    didwin();

    if(!isWin){
        npcMove();
    }
}

/*
    logic to find a possible combo has either X or O
*/

function canWin(){
    let comboX, comboY;
    for(let combo of winningCombos){
        let o = 0;
        let x = 0;
        let full = 0;

        for(let cell of combo){
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
        if(x === 2 && full !== 3){
            comboX = combo;
        }else if(o===2 && full !==3){
            comboY = combo;
        }
    }
    if(comboX != null){
        return [true,comboX];
    }else if(comboY != null){
        return [true,comboY];
    }

    return [false, []];
}

function block(row){
    for(let cell of row){
        if(tdElements[cell].innerText === ""){
            xMove(cell);
        }
    }
}

function endGame(msg){
    for(let cell of tdElements){
        cell.removeEventListener("mouseover", highlight);
        cell.removeEventListener("mouseout", removeHighLight);
        cell.removeEventListener("click", oMove);
    }
    document.getElementById("message").innerText = msg + " Win!"
}

function didwin(){
    for(let combo of winningCombos){
        let x = 0;
        let o = 0;
        for(let cell of combo){
            if(tdElements[cell].innerText === "X"){
                x++;
            }            
            if(tdElements[cell].innerText === "O"){
                o++;
            }            
        }

        if (x === 3){
            endGame("X");
            isWin = true;
        }
        if (o === 3){
            endGame("O");
            isWin = true;
        }

    }
    // return false;
}
//NPC turn

function npcMove(){
    const nextMoveDecided = canWin();
    if(nextMoveDecided[0]){
        block(nextMoveDecided[1]);
    }else{
        if(tdElements[0].innerText === ""){
            xMove(0);
        }else if (tdElements[2].innerText === "") {
            xMove(2);
        }else if (tdElements[6].innerText === ""){
            xMove(6);
        }else if (tdElements[8].innerText === ""){
            xMove(8);
        } else if(tdElements[0].innerText !=="" || tdElements[2].innerText !=="" || 
            tdElements[6].innerText !=="" || tdElements[8].innerText !=="" )
        {
            for(let i = 0; i < tdElements.length; i++){
                if(tdElements[i].innerText === ""){
                    xMove(i);
                    break;
                    }
            }
        }
    }
    didwin();
}

for (let cell of tdElements){
    cell.addEventListener("mouseover",highlight);
    cell.addEventListener("mouseout",removeHighLight);
    cell.addEventListener("click",oMove);
}

// button retry to refresh the page from begin
document.querySelector(".btn").addEventListener("click",()=> location.reload());

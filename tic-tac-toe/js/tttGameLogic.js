// "use strict";

// grab all of td elements
const tdElements = document.getElementsByTagName('td');
let turnCounter = 0;
// console.log(tdElements);

//combination of winning cases
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

function highlight(e){
    e.target.style.backgroundColor = "rgba(255,255,0,0.4)";
}

function removeHighLight(e){
    e.target.style.backgroundColor = "transparent";
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

function Move(cell, char){
    tdElements[cell].innerText = char;
    tdElements[cell].removeEventListener('mouseover', highlight);
    tdElements[cell].removeEventListener('mouseout', removeHighLight);
    tdElements[cell].removeEventListener('click', Move);
}


for (cell of tdElements){
    // console.log(cell);
    cell.addEventListener("mouseover",highlight);
    cell.addEventListener("mouseout",removeHighLight);
    cell.addEventListener("click",Move(cell, 'O'));

}

// button retry to refresh the page from begin
document.querySelector(".btn").addEventListener("click",()=> location.reload());

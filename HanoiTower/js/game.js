//game logic of Hanoi Tower

const sections = document.querySelectorAll("section");

function selectSection(){
    this.style.border = "4px solid green";
}

for(item of sections)
{
    item.addEventListener("click",selectSection);
}

/*
- add and remove a selected class on click
once click on class, pop the div
    - error handling, div to pop?
then they can select div to place
    - different border color?
check if div can go there based on width you decide it
    - if yes, add it
    - if no, error message

check if win?
    - has to be in the last section
        - loop through each div and check parent
            is there a more efficent way to check ?
        can we get all div of last section then check length of array?
    
*/
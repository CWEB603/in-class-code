//game logic of Hanoi Tower

const sections = document.querySelectorAll("section");

function selectSection(){
    this.removeEventListener("click", selectSection);
    if(this.classList.contains("selected")){
        this.classList.remove("selected");
        addSelect();
    }else{
        this.classList.add("selected");
        const selectableSections = document.getElementsByClassName("selectable");
        for (const sec of selectableSections){
            sec.classList.remove("selectable");
        }
    }
}



function addSelect(){
    //add hover color to sections that have children.length > 0
    for (const sec of sections){
        if(sec.children.length > 0){
            sec.classList.add("selectable");
            sec.addEventListener("click",selectSection);
        }else{
            sec.classList.remove("selectable");
        }
    }
}

addSelect();



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


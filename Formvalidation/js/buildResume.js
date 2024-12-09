
/**
 * Global variables
 */
// get basic user information, name, email, and phone
const nameInput = document.editorContact.name;
const emailInput = document.editorContact.email;
const phoneInput = document.editorContact.phone;
const contactNextButton = document.editorContact.contactNextBtn;

// list of elements of the display div
const userNameResume = document.getElementById("userName");
const userEmailResume = document.getElementById("userEmail");
const userPhoneResume = document.getElementById("userPhone");

// list of elements of second form
const titleInput = document.editorEmployer.title;
const descriptionInput = document.editorEmployer.description;
const startDateInput = document.editorEmployer.start;
const endDateInput = document.editorEmployer.end;
const currentEmployerCheck = document.editorEmployer.current;
const endDateDiv = document.getElementById("endDate");
const addEmploymentButton = document.editorEmployer.employAddBtn;
const resetFormButton = document.editorEmployer.reset;


function nextMenu(event){
    //remove default behaviour of the event
    // event.preventDefault();
    document.editorContact.style.display = "none";
    // document.editorEmployer.style.display = "flex";
    document.getElementById("employmentHistory").style.display = "flex";
    // document.querySelector("#employmentHistory").style.display = "flex";
}

function checkcurrentEmployer(){
    if(currentEmployerCheck.checked){
        endDateDiv.style.display = "none";
    }else{
        endDateDiv.style.display = "block";
    }
}

function addEmployment(event){

    event.preventDefault();

    const newEmploymentDiv = document.createElement("div");
    const newTitle = document.createElement("p");
    const newDescription = document.createElement("p");
    const newStart = document.createElement("p");
    const newEnd = document.createElement("p");

    newEmploymentDiv.className = "emplyDiv";
    newTitle.className = "title";
    newDescription.className = "description";
    newStart.className = "start";
    newEnd.className = "end";

    newTitle.innerText = titleInput.value;
    newDescription.innerText = descriptionInput.value;
    
    let startDateText = startDateInput.value;
    startDateText = new Date(startDateText);
    const formattedDate = startDateText.toLocaleDateString("en-us",{year: "numeric", month: "short", day: "numeric"});
    // console.log(newTitle);
    // console.log(newDescription);
    // console.log(startDateInput.value);
    // console.log(startDateText);
    // console.log(startDateText.toLocaleDateString("en-us",{year: "numeric", month: "short", day: "numeric"}));
    // console.log(
    //     new Intl.DateTimeFormat("en-Us",{
    //         dateStyle: "short",            
    //     }).format(startDateText)
    // );
    newStart.innerText = formattedDate + " ";

    if(currentEmployerCheck.checked){
        newEnd.innerText = "Current";
    }else{
        // let endDateText = Date.parse(endDateInput.value);
        let endDateText = new Date(endDateInput.value);
        console.log(endDateText);
        const formattedEndDate = endDateText.toLocaleString("en-us", {year: "numeric", month: "short", day: "numeric"});
        console.log(formattedEndDate);
        newEnd.innerText = formattedEndDate;
    }

    newEmploymentDiv.appendChild(newTitle);
    newEmploymentDiv.appendChild(newStart);
    newEmploymentDiv.appendChild(newEnd);
    newEmploymentDiv.appendChild(newDescription);

    document.getElementById("resume").appendChild(newEmploymentDiv);
}


/**
 * This part will be run when the script file is loaded
 */

nameInput.addEventListener("input", function(){
    userNameResume.innerText = this.value;
    // console.log(this.value);
    // need to validate text input 
});

emailInput.addEventListener("input", function(){
    userEmailResume.innerHTML = `&#9993; ${this.value} `;
});

phoneInput.addEventListener("input", function(){
    userPhoneResume.innerHTML = `&#9742; ${this.value}`
});
// another way to do with event listener 
// phoneInput.addEventListener("input", (event)=>{
//     userPhoneResume.innerHTML = `&#9742; ${event.target.value}`
// });
// contactNextButton.addEventListener("click", nextMenu);

currentEmployerCheck.addEventListener("change", checkcurrentEmployer);

addEmploymentButton.addEventListener("click", addEmployment);

nameInput.focus();


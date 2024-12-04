// validate the variable from the buildResume.js file 
// console.log(nameInput);

function contactValidation(event){
    event.preventDefault();
    const contactInputs = document.querySelectorAll('#contact input');
    // console.log(contactInputs);
    for (const input of contactInputs){
        // console.log(input);
        if(input.value === ""){
            input.classList.add("invalid");
        }else{
            input.classList.remove("invalid");
        }
    }

    if (emailInput.checkValidity()){
        emailInput.classList.remove("invalid");
    }else{
        emailInput.classList.add("invalid");
    }

    // format of phone number to validate input number 
    const phoneNum = /^\(\d{3}\)\d{3}\-\d{4}$/;
    
}

// contactNextButton.addEventListener("click", nextMenu);
contactNextButton.addEventListener("click", contactValidation);


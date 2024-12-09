// validate the variable from the buildResume.js file 
// console.log(nameInput);

function contactValidation(event){
    // event.preventDefault();
    const contactInputs = document.querySelectorAll('#contact > input');
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
    const phoneFormat = /^\(\d{3}\)\d{3}\-\d{4}$/;
    const phoneFormatValid = phoneFormat.test(phoneInput.value);
    if(phoneFormatValid){
        phoneInput.classList.remove("invalid");
        phoneInput.setCustomValidity("");
    }else{
        phoneInput.classList.add("invalid");
        phoneInput.setCustomValidity("Please use this format: (###)###-####");
    }
}


function NextMenuVerify(event){
    event.preventDefault();
    contactValidation();
    if(document.editorContact.checkValidity()){
        console.log("form valid");
        nextMenu();
    }
}
// contactNextButton.addEventListener("click", nextMenu);
// contactNextButton.addEventListener("click", contactValidation);
contactNextButton.addEventListener("click", NextMenuVerify);





/* variables here */

const firstNameInput = document.getElementById("firstName");
const inputFieldset = firstNameInput.parentElement;
const lastNameErrorLabel = inputFieldset.children[4];
const lastNameInput = lastNameErrorLabel.previousElementSibling;
const lockerNumberInput = document.querySelector("#lockerNumber");
const comboInput = document.getElementById("combination");
const addButton = document.getElementById("addButton");

lockerNumberInput.addEventListener("change", (e) => {
  let lockerNumber = parseInt(e.target.value);
  e.target.value = lockerNumber < 1 ? 1 : (lockerNumber > 1999 ? 1999 : lockerNumber);
});

/**
 * Name.		validateForm
 * Summary.		checks if all the fields of the form contain valid data
 * @returns 	{boolean}  valid	true indicates the form is valid, false is invalid.
 */
function validateForm() {
  let valid = true;

  if (firstNameInput.value.length < 1) {
    valid = false;
    const validityText = document.createTextNode("This field is required");
    const validityLabel = document.createElement("label");

    validityLabel.append(validityText);
    validityLabel.className = "error";
    validityLabel.setAttribute("for", "firstName");
    const labelLastName = document.querySelector("label[for='lastName']");
    labelLastName.parentNode.insertBefore(validityLabel,labelLastName);
    setTimeout(function(){
      validityLabel.classList.add("hide")
    },1000);   
  }

  if(!lastNameInput.checkValidity()){
      valid = false;
      lastNameErrorLabel.style.display = "inline";
      setTimeout(function(){
        lastNameErrorLabel.style.display = "none";
      },1000);
  }
    
  const lockerCombineRegex = /^([1-9]|[1-9][0-9])-([1-9]|[1-9][0-9])-([1-9]|[1-9][0-9])$/;

  if(!lockerCombineRegex.test(comboInput.value)){
    valid = false;
    const combinError = document.getElementById("combinationError");
    combinError.innerHTML = "Please use a #-#-# format";
    combinError.className = "error";
    combinError.setAttribute("for","combination");
    setTimeout(function(){
      combinError.innerHTML = "";
    },1000);
  }

  return valid;
}

// setTimeout(validateForm,3000);
/**
 * Name.		createSummaryNode
 * Summary.		creates and returns a HTML element node that summarizes the information inputed in the form
 * @returns 	{HTML element}	p	A paragraph element that summarizes the information collected.
 */

/* code to run on load below */
function createSummaryNode(){
  const summaryNode = document.createElement("p");
  const sumTextNode = document.createTextNode(`
    ${firstNameInput.value} , ${lastNameInput.value}, locker: ${lockerNumberInput.value}, combination: ${comboInput.value}`);
  summaryNode.appendChild(sumTextNode);
  summaryNode.setAttribute("id","lockersAdded");
  
  return summaryNode;
}

document.querySelector("input#addButton").addEventListener("click",function(event){
  event.preventDefault();
  const formValidation = validateForm();
  if(formValidation){
    document.querySelector("p.hide").classList.remove("hide");
    const newEle = createSummaryNode();
    const result = document.getElementById("lockersAdded");
    const pResult = result.parentElement;
    pResult.replaceChild(newEle,result);
  }
});


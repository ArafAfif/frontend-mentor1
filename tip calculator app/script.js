// Select elements
const tipAmount = document.querySelector("#tip_amount");
const totalAmount = document.querySelector("#total");
const reset = document.querySelector("#reset");
const billError = document.querySelector('#bill_error');
const peopleError = document.querySelector('#people_error');
const tipParcentLists = document.querySelector('.tip');
// Select input elements 
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#custom");
const peopleNumberInput = document.querySelector("#people_number");

// Calculate tip per person
function calculateTip(tip, tipParcent, peopleNumber){
    return tip / 100 * tipParcent / peopleNumber;
}

// Check if any input value is 0
function checkInputValue(input, errMessege){
    setTimeout(function(){
        // add display block.Becuase, errMessege may already have display block
        errMessege.style.display = 'none';
        if(input.value == 0){
            errMessege.style.display = 'inline';
            console.log(input.value.firstChild);
        }
    }, 0);
}

// This varrible for store tip parcent.
let tipParcent;

// Check if tipParcent is custom or not.
function getTipParcent(){
    if(tipParcent){
        return tipParcent;
    }else if(tipInput.value){
        return tipInput.value;
    }else{
        return 0;
    }
}

// Display all result
function displayResult(){
    // Select input elements value
    const tipValue = Number(billInput.value);
    const tipParcent = parseFloat(getTipParcent());
    const peopleNumber = Number(peopleNumberInput.value);

    setTimeout(function(){
        // Check if peopleNumberInput is 0
        checkInputValue(peopleNumberInput, peopleError);

        const tip = calculateTip(tipValue, tipParcent, peopleNumber);
        // Calculate total bill
        const totalTipPerPerson = tip + tipValue / peopleNumber;

        // Update per person tip and bill
        tipAmount.innerText = tip.toFixed(2);
        totalAmount.innerText = totalTipPerPerson.toFixed(2);
    }, 0);
}

// Check if billInput is 0
billInput.addEventListener('input', function(){
    checkInputValue(billInput, billError);
    if(peopleNumberInput.value){
        displayResult();
    }
});

// Get tipParcentLists value.For this function I used event delegation.
tipParcentLists.addEventListener('click', function(e){
    if(e.target.matches('li')){
        tipParcent = e.target.innerText;
        if(peopleNumberInput.value){
            displayResult();
        }
    }
    if(e.target.id == 'custom' && peopleNumberInput.value){
        e.target.addEventListener('input', displayResult);
    }
    
});

// Display all result
peopleNumberInput.addEventListener('input', displayResult);

// Reload browser whwn reset button will clickes
reset.addEventListener("click", () => location.reload());
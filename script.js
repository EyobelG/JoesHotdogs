const HOTDOG_PRICE = 4.99;
const FRIES_PRICE = 3.99;
const DRINKS_PRICE = 1.79;
const MA_MEALS_TAX = 0.0625;
const SPECIAL_DISCOUNT = 0.10;

function showMoney(number) {	
    let num = number;
    let rounded = Math.round(num * 100) / 100; 
    let newString = rounded.toString();
    return newString;
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const person = document.getElementById("person").value;
    const numDogs = parseInt(document.getElementById("numDogs").value) || 0;
    const numFries = parseInt(document.getElementById("numFries").value) || 0;
    const numSoda = parseInt(document.getElementById("numSoda").value) || 0;

    let SUBTOTAL = (HOTDOG_PRICE * numDogs) + (FRIES_PRICE * numFries) + (DRINKS_PRICE * numSoda);
    let SUBTOTAL_BEFORE = SUBTOTAL; 
    
    let discountApplied = false;
    if (SUBTOTAL >= 30) {
       SUBTOTAL *= (1 - SPECIAL_DISCOUNT);
       discountApplied = true;
    }

    let TAXED = SUBTOTAL * (1 + MA_MEALS_TAX);
    let TAX_AMOUNT = SUBTOTAL * MA_MEALS_TAX;

    // Build the output string step by step
    let outputHTML = `
      <h3>Hello, ${person}!</h3>
      <p>You have ordered ${numDogs} hot dog${numDogs > 1 ?"s":""}, costing: $${showMoney(HOTDOG_PRICE * numDogs)},
       ${numFries} fr${numFries > 1 ?"ies":"y"}, costing $${showMoney(FRIES_PRICE * numFries)}, and ${numSoda}
      drink${numSoda > 1 ?"s":""}, which cost you $${showMoney(DRINKS_PRICE * numSoda)}! <br>`;
    // Add discount info conditionally
    if (discountApplied) {
        outputHTML += `Before any discount, your subtotal is $${showMoney(SUBTOTAL_BEFORE)}
      <br>`;
        outputHTML += `After discount, your total became $${showMoney(SUBTOTAL)} <br>`;
    } else {
        outputHTML += `No discount applied (subtotal must be $30 or more to earn one). <br>`;
    }
    
    // Add the rest
    outputHTML += `You were taxed $${showMoney(TAX_AMOUNT)}.
    </p>
    <p><strong>Total with Tax:</strong> $${showMoney(TAXED)}</p>`;

    // Set it once at the end


    const output = document.getElementById("output")
    output.innerHTML = outputHTML;
    const img = document.createElement("img");
    img.src = "hotdog.gif"; 
    img.alt = "Hotdog";
    img.style.marginTop = "10px";
    img.style.width = "200px";
    output.appendChild(img);
});
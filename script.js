const HOTDOG_PRICE = 4.99;
const FRIES_PRICE = 3.99;
const DRINKS_PRICE = 1.79;
const MA_MEALS_TAX = 0.0625;
const SPECIAL_DISCOUNT = 0.10;

function showMoney(value) {
  // Round to 2 decimal places
  let roundedValue = Math.round(parseFloat(value) * 100) / 100;
  let priceText = roundedValue.toString();
  // If it already has a decimal part
  if (priceText.includes(".")) {
      let afterDecimal = priceText.split(".")[1];
      //Add a zero if there's only one digit after the decimal
      if (afterDecimal.length === 1) {
          priceText = priceText + "0";
      }
  } else {
       // If no decimal point, add ".00"!
      priceText = priceText + ".00";
  } 

  return priceText;
}


const yourName = prompt("What is your name?") || "Guest";
const dogsWanted = parseInt(prompt("How many hotdogs do you want?")) || 0;
const friesWanted = parseInt(prompt("How many fries do you want?")) || 0;
const sodaWanted = parseInt(prompt("How many sodas do you want?")) || 0;

document.getElementById("person").value = yourName;
document.getElementById("numDogs").value = dogsWanted;
document.getElementById("numFries").value = friesWanted;
document.getElementById("numSoda").value = sodaWanted;

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const person = document.getElementById("person").value;
    const numDogs = parseInt(document.getElementById("numDogs").value) || 0;
    const numFries = parseInt(document.getElementById("numFries").value) || 0;
    const numSoda = parseInt(document.getElementById("numSoda").value) || 0;

    let SUBTOTAL = (HOTDOG_PRICE * numDogs) + (FRIES_PRICE * numFries) + (DRINKS_PRICE * numSoda);
    let SUBTOTAL_BEFORE = SUBTOTAL; 
    
    let discountApplied = false;
    let DISCOUNT = SUBTOTAL * SPECIAL_DISCOUNT;
    if (SUBTOTAL >= 30) {
       SUBTOTAL -= DISCOUNT;
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
        outputHTML += `Your Joe's special discount is $${showMoney(DISCOUNT)} <br>` ;
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

document.getElementById("orderForm").dispatchEvent(new Event('submit'));
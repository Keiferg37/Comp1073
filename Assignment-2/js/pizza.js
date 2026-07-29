/* ============================================================
   THE PIZZA MAKER
   Author: Keifer Grainger  (Student ID: 200488755)
   Course: COMP1073 - Client-Side JavaScript
   ============================================================ */

// STEP 1: Dynamically add the student id and name to the page
const student = document.querySelector("#student-info");
student.textContent = "Keifer Grainger | Student ID: 200488755";

// STEP 2: Show a random chef tip (small creative touch)
const chefTips = [
    "Tip: Stuffed crust is Chef Tony's favourite!",
    "Tip: Pineapple on pizza? We don't judge. 🍍",
    "Tip: Extra cheese makes everything better.",
    "Tip: Order two — future you will say thanks."
];
// Math.floor + Math.random picks a random index from the array
const tipIndex = Math.floor(Math.random() * chefTips.length);
document.querySelector("#chefTip").textContent = chefTips[tipIndex];

// STEP 3: The Pizza class (Object Oriented Programming)
class Pizza {
    // The constructor stores the values captured from the form
    constructor(customer, size, crust, toppings, quantity, notes) {
        this.customer = customer;
        this.size = size;
        this.crust = crust;
        this.toppings = toppings; // an array of topping strings
        this.quantity = quantity;
        this.notes = notes;
    }

    // METHOD 1: work out the total price of the order
    calculatePrice() {
        // Base price depends on the size
        const sizePrices = { "Small": 8, "Medium": 12, "Large": 16 };
        let price = sizePrices[this.size];

        // Some crusts cost extra
        if (this.crust === "Stuffed" || this.crust === "Gluten-Free") {
            price += 2;
        }

        // Each topping is $1
        price += this.toppings.length * 1;

        // Multiply by how many pizzas were ordered
        price = price * this.quantity;

        return price;
    }

    // METHOD 2: build and return the order description as a string
    describe() {
        // If no toppings were chosen, say "plain cheese"
        let toppingText = this.toppings.length > 0
            ? this.toppings.join(", ")
            : "plain cheese";

        // Build the description string piece by piece
        let description = `Thanks ${this.customer}! Your order: `;
        description += `${this.quantity} x ${this.size} ${this.crust}-crust pizza `;
        description += `with ${toppingText}.`;

        // Add special instructions only if the customer typed some
        if (this.notes !== "") {
            description += ` Note: ${this.notes}`;
        }

        return description;
    }
}

// STEP 4: Grab the elements we will reuse
const form = document.querySelector("#pizza-form");
const errorBox = document.querySelector("#error");
const output = document.querySelector("#output");
const liveTotal = document.querySelector("#liveTotal");

// Helper: read the current form values and return them
function readForm() {
    const customer = document.querySelector("#customer").value.trim();
    const sizeInput = document.querySelector("input[name='size']:checked");
    const crust = document.querySelector("#crust").value;
    const quantity = Number(document.querySelector("#quantity").value);
    const notes = document.querySelector("#notes").value.trim();

    // Collect every checked topping into an array
    const toppingInputs = document.querySelectorAll("input[name='topping']:checked");
    let toppings = [];
    for (let i = 0; i < toppingInputs.length; i++) {
        toppings.push(toppingInputs[i].value);
    }

    // Return everything as one object
    return {
        customer: customer,
        size: sizeInput ? sizeInput.value : "",
        crust: crust,
        toppings: toppings,
        quantity: quantity,
        notes: notes
    };
}

// STEP 5: Live running total (TECHNICAL extra)
// Recalculates whenever the user changes anything on the form.
function updateLiveTotal() {
    const data = readForm();
    // We need a size and quantity to show a meaningful total
    if (data.size === "" || data.quantity < 1) {
        liveTotal.textContent = "$0.00";
        return;
    }
    const preview = new Pizza(
        data.customer, data.size, data.crust,
        data.toppings, data.quantity, data.notes
    );
    liveTotal.textContent = "$" + preview.calculatePrice().toFixed(2);
}
// "input" and "change" fire as the user edits the form
form.addEventListener("input", updateLiveTotal);
form.addEventListener("change", updateLiveTotal);

// STEP 6: Handle the form submit (the 'Order' button)
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    // Clear any previous messages
    errorBox.textContent = "";
    output.classList.remove("show");
    output.innerHTML = "";

    // Read the current values
    const data = readForm();

    // VALIDATION — the object is only created if ALL checks pass
    if (data.customer === "") {
        errorBox.textContent = "Please enter your name.";
        return;
    }
    if (data.size === "") {
        errorBox.textContent = "Please choose a pizza size.";
        return;
    }
    if (data.crust === "") {
        errorBox.textContent = "Please choose a crust.";
        return;
    }
    if (data.quantity < 1 || data.quantity > 20) {
        errorBox.textContent = "Quantity must be between 1 and 20.";
        return;
    }

    // All validation passed — create a Pizza object
    const myPizza = new Pizza(
        data.customer, data.size, data.crust,
        data.toppings, data.quantity, data.notes
    );

    // Output comes from the object's METHODS, not the raw form values
    output.innerHTML = "<h2>Your Order</h2>";

    const descPara = document.createElement("p");
    descPara.textContent = myPizza.describe();

    const pricePara = document.createElement("p");
    pricePara.className = "price";
    pricePara.textContent = "Total: $" + myPizza.calculatePrice().toFixed(2);

    output.appendChild(descPara);
    output.appendChild(pricePara);
    output.classList.add("show");
});

// STEP 7: "Surprise Me" button (CREATIVE + TECHNICAL extra)
// Randomly fills the form so the user can order in one click.
document.querySelector("#surprise").addEventListener("click", function () {
    // Random name from a small list
    const names = ["Alex", "Sam", "Jordan", "Casey", "Riley"];
    document.querySelector("#customer").value =
        names[Math.floor(Math.random() * names.length)];

    // Random size
    const sizes = document.querySelectorAll("input[name='size']");
    sizes[Math.floor(Math.random() * sizes.length)].checked = true;

    // Random crust (skip index 0, which is the empty placeholder)
    const crust = document.querySelector("#crust");
    crust.selectedIndex = 1 + Math.floor(Math.random() * (crust.options.length - 1));

    // Randomly tick each topping about half the time
    const toppings = document.querySelectorAll("input[name='topping']");
    toppings.forEach(function (box) {
        box.checked = Math.random() < 0.5;
    });

    // Random quantity from 1 to 3
    document.querySelector("#quantity").value = 1 + Math.floor(Math.random() * 3);

    // Refresh the live total after filling the form
    updateLiveTotal();
});
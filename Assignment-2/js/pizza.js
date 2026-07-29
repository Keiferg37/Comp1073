/* ============================================================
   THE PIZZA MAKER
   Author: Keifer Grainger  (Student ID: 200488755)
   Course: COMP1073 - Client-Side JavaScript
   ============================================================ */

// STEP 1: Dynamically add the student id and name to the page
const student = document.querySelector("#student");
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
        const sizePrices = { "Small": 8, "Medium": 11, "Large": 14 };
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
const form = document.querySelector("#pizzaForm");
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
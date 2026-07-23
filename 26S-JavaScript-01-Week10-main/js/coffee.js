const output = document.querySelector("#output");

/* STEP 1: Instead of a constructor function, let's try a JavaScript class called 'Coffee' */
class Coffee {
    // variables/fields
    size;
    isDecaf;

    // constructor
    constructor(size, isDecaf) {
        this.size = size;
        this.isDecaf = isDecaf;
    }

    // functions/methods
    // add a serveIt method
    serveIt() {
        // Generate an IMG of the coffee ordered
        let cup = document.createElement("img"); // <img>

        // Set the src path for the IMG element
        cup.setAttribute("src", "images/coffee-cup.svg"); // <img src="images/coffee-cup.svg">

        // Determine caffeine status of the coffee
        if (this.isDecaf) {
            cup.setAttribute("src", "images/coffee-cup-green.svg"); // <img src="images/coffee-cup-green.svg">
        } else {
            cup.setAttribute("src", "images/coffee-cup-purple.svg"); // <img src="images/coffe-cup-purple.svg">
        }

        // Set the size of the cup SVG image based on this.size
        switch (this.size) {
            // Size the IMG in terms of its height based on above number from the switch
            case "small":
                cup.setAttribute("height", 100); // <img src="images/coffee-cup.svg" height=100>
                break;
            case "medium":
                cup.setAttribute("height", 150);
                break;
            case "large":
                cup.setAttribute("height", 200);
                break;
            default:
                cup.setAttribute("height", 150);
        }

        // Generate a description of the coffee and put it into the IMG title attribute
        // A small caffinated coffee
        cup.setAttribute(
            "title",
            `A ${this.size} ${this.isDecaf ? "decaffinated" : "caffinated"} Coffee`,
        );

        // Insert the new IMG element into the paragraph
        output.appendChild(cup);
    }
}

/* STEP 2: Instatiate a coffee based on the above constructor function */
let priyanshCoffee = new Coffee("medium", false);
let robertCoffee = new Coffee("large", true);
let meganCoffee = new Coffee("small", false);

/* STEP 3: Add a method to the Coffee class called serveIt() */

/* STEP 4: Call up the serveIt() method */
priyanshCoffee.serveIt();
robertCoffee.serveIt();
meganCoffee.serveIt();

/* STEP 5: Define a subclass of the Coffee class */
class Latte extends Coffee {
    milkType;
    constructor(size, isDecaf, milkType) {
        super(size, isDecaf);
        this.milkType = milkType;
    }
    latteDesc() {
        return `A ${this.size} sized Latte with ${this.milkType} milk.`;
    }
}

/* STEP 6: Create a new instance of the Latte object */
let priyanshLatte = new Latte("large", false, "2%");

/* STEP 7: Call up the latteDesc() method for the above created Latte instance */
// priyanshLatte.latteDesc()
// priyanshLatte.serveIt()

/* STEP 8: Create yet another instance of Latte using the console, and try the latteDesc() method from the subclass, as well as the serveIt() method from the parent class */

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG

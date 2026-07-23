const output = document.querySelector("#output");

/* STEP 1: Create an object (looks a lot like declaring a variable, but with empty braces), 
then open this page in a browser and enter 'Coffee' in the console */
function Coffee(size, isDecaf, qtyCream, qtySugar) {
    this.size = size;
    this.isDecaf = isDecaf;
    this.qtyCream = qtyCream;
    this.qtySugar = qtySugar;
    this.decaf = this.isDecaf ? "decaffinated" : "caffinated";
    this.description = function () {
        // A small caffinated coffee with 1 cream and 2 sugar
        return `A ${this.size} ${this.decaf} coffee with ${this.qtyCream} cream and ${this.qtySugar} sugar.`;
    };
}

/* STEP 2: Instatiate a coffee based on the above constructor function */
let priyanshCoffee = new Coffee("medium", false, 2, 1);
output.textContent = priyanshCoffee.description();

/* STEP 3: Refresh the page, and in the console, begin to call a method on priyanshCoffee by typing 'priyanshCoffee.' - look at all the members and methods */

/* STEP 4: Enter into the console, priyanshCoffee.valueOf() and look at the result. 
priyanshCoffee doesn't have such a method, and neither does the constructor function, 'Coffee'. But the 'Object' object does - so through inheritance, priyanshCoffee has access to the method, valueOf(). */

/* STEP 5a: Each object has a prototype member that isn't really directly accessible, 
but it can be referenced using the deprecated '__proto__' - using a double underscore on either side of the word 'proto'. 
Try it - priyanshCoffee.__proto__.__proto__ */

/* STEP 5b: The more modern way to do this is … Object.getPrototypeOf(priyanshCoffee) - try THIS in the console */

/* STEP 5c: EVERYTHING is an object in JavaScript. Try accessing the prototype property of Coffee (which even though it is a constructor function it is still an object) with Coffee.prototype in the console. Then try Object.Prototype */

/* STEP 6a: Let's circle back to create() - use priyanshCoffee to create a new object instance - one based on priyanshCoffee. */
let robertCoffee = Object.create(priyanshCoffee);
robertCoffee.size = "large";
robertCoffee.isDecaf = true;
robertCoffee.qtyCream = 1;
robertCoffee.qtySugar = 1;

/* STEP 6b: See how this new object inherits from the prototype with robertCoffee.__proto__ in the console. */

/* STEP 7a: Each constructor function includes a prototype property with a value equal to an object that contains a constructor 
property. Try it out by typing priyanshCoffee.constructor and robertCoffee.constructor */

/* STEP 7b: Since constructor is also a function, you can use it to create a new object instance - try it! */
let meganCoffee = new robertCoffee.constructor("small", false, 2, 3);

/* STEP 7c: Attempt via the console to access the new object's properties - meganCoffee.size, meganCoffee.isDecaf, etc. */

/* STEP 7d: Now see if the new object can access the description() method… */

/* STEP 7e: The constructor has other features - try using it to discover the name of an instance's constructor by typing meganCoffee.constructor.name into the console. */

/* STEP 8a: We can modify the prototype property of a constructor function - let's add another method to Coffee */

// What's really interesting about the above code is that every instance based on the Coffee constructor has been updated due to prototypical inheritance!

/* STEP 8b: Now let's call up this method on one or more of our Coffee instances from the console (priyanshCoffee, robertCoffee, or meganCoffee). */

// Next, open up coffee.html and we will see how to leverage object inheritance with JavaScript classes.

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG

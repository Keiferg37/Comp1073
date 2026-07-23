const output = document.getElementById("output");

/* STEP 1a: Create a new object using a regular function */
function createNewCar(make, model, color){
    let obj = {};
    obj.model = model;
    obj.make = make;
    obj.color = color;
    return obj;
}

/* STEP 1b: Use the console to create a new vehicle object, and then invoke the function represented using .description() */
let car1 = createNewCar("Honda", "Civic", "White");

/* STEP 2a: In order to be a bit more concise, JavaScript allows us to use constructor functions - 
rewrite the above function, without returning anything. Capitalize the name of the function. */
function Car(make, model, color){
    this.make = make;
    this.model = model;
    this.color = color;
    this.description = function(){
        return `A ${this.make} ${this.model} with ${this.color} color.`;
    }
}

/* STEP 2b: Use the console to create a couple of different people, using the 'new' keyword, 
and again invoking the .greeting() method for each person */
let car2 = new Car("Honda", "CRV", "Black");
output.textContent = car2.description();

/* STEP 3a: Build the complete constructor for the object Person (comment out the above function first).
 Include name (first and last), age, gender, interests, bio (function), and greeting (function). */

/* STEP 3b: Instantiate a new Person based on the above constructor */

/* STEP 3c: Attempt to access the various properties of person1 using the console. */
// person2['age']
// person2.interests[1]
// person2.bio()

/* STEP 4a: Alternatively, you can use the Object() constructor to create an object. eg. car*/
let car3 = new Object();

/* STEP 4b: Once 'car' is created, add various properties and methods… */
car3.make = "RAM";
car3.model = "1500";
car3.color ="Green";

/* STEP 4c: Change some of the properties of 'car' in the console, then invoke the car.fun() function */

/* STEP 5a: Yet another approach is to use the create() method. 
Let's see how the above car object can be used to create another object */
let car4 = Object.create(car2);
car4.color = "Purple";

/* STEP 5b: Output to the paragraph anotherCar.brand - you will see that it has retained the properties of the original object. */

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS

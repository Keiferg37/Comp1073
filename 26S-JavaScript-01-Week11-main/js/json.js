/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const header = document.querySelector("header");
const section = document.querySelector("section");

// STEP 3a: Create the asynchronous function populate()
async function populate(){
    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4a: Create i-scream.json file with companyName, headOffice, established, active, topFlavors(name, calories, type, ingredients, image) */
    // STEP 4b: Store the URL of a JSON file in a variable */
    // Use a relative path so the page loads the local JSON from this project
    // (works on GitHub Pages / any web server without pointing at another site)
    const url = "js/i-scream.json";
    // STEP 5: Use the new URL to create a new request object
    const request = new Request(url);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request);
    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    const responseJson = await response.json();
    // STEP 8: Output the iScream JSON object to the console
    console.log(responseJson);
    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(responseJson);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavours(responseJson);
}


// STEP 3b: Call the populate() function
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(json){
    // Create the H1 element
    let h1 = document.createElement("h1"); // <h1></h1>
    let para = document.createElement("p"); // <p></p>
    // Grab the company name from the JSON object and use it for the text node
    h1.textContent = json.companyName;
    para.textContent = `Head Office: ${json.headOffice}, est: ${json.established}, Status: ${json.active ? "Active" : "Inactive"}`;
    // Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
    header.appendChild(para);
}

/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavours(json){
    // STEP 10c: Bind the JSON topFlavors object to a var
    let topFlavors = json.topFlavours;
    // STEP 10d: Loop through the topFlavors object
    for (let i = 0; i < topFlavors.length; i++) {
        console.log(topFlavors[i]);
        // STEP 10e: build HTML elements for the content: article, h2, image, p1, p2, list
        let article = document.createElement("article"); // <article></article>
        let h2 = document.createElement("h2"); // <h2></h2>
        let image = document.createElement("img"); // <img>
        let p1 = document.createElement("p"); // <p></p>
        let p2 = document.createElement("p"); // <p></p>
        let p3 = document.createElement("p"); // <p></p> (holds the rating)
        let list = document.createElement("ul"); // <ul><ul>

        // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        h2.textContent = topFlavors[i].name;
        p1.textContent = "Calories: " + topFlavors[i].calories;
        p2.textContent = "Type: " + topFlavors[i].type;
        // TAKE IT FURTHER: display the flavour's rating (1.0 - 5.0) out of 5
        p3.textContent = "Rating: " + topFlavors[i].rating + " / 5";
        image.setAttribute("src", topFlavors[i].image);

        // STEP 10g: Build a loop for the ingredients array in the JSON
        let ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            let listItem = document.createElement("li"); // <li></li>
            listItem.textContent = ingredients[j];
            list.appendChild(listItem);
        }

        // STEP 10i: Append each complete ARTICLE element to the SECTION element
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3); // append the rating paragraph
        article.appendChild(list);
        article.appendChild(image);

        section.appendChild(article);
    }
}

// STEP 11: Add a 3rd flavour of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations

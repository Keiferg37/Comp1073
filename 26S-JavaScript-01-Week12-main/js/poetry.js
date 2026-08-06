// STEP 1: Grab the HTML elements we need for the interaction
const verseChoose = document.querySelector("#verse-choose");
const pre = document.querySelector("pre");

// STEP 2: Build out the event handler for the SELECT element
verseChoose.addEventListener("change", function () {
    let selectedVerse = verseChoose.value;
    console.log("Selected Verse: " + selectedVerse);
    updateDisplay(selectedVerse);
});

// STEP 3: Construct updateDisplay() function
function updateDisplay(verse) {
    console.log("Selected Verse (inside the function): " + verse);

    // STEP 4: Declare and initialize URL to point to text file(s)
    let url = `https://priyansht.github.io/26S-JavaScript-01-Week12/${verse}.txt`;
    // let url = "https://priyansht.github.io/26S-JavaScript-01-Week12/" + verse + ".txt";

    // STEP 5: Build fetch() with promises
    // STEP 5a: Use fetch and pass in the URL
    fetch(url)
        // STEP 5b: The fetch() will return a promise - which when received from the server,
        // the promise's then() event handler is called using the response
        .then((response) => {
            console.log(response);
            // STEP 5c: If the response is not okay, throw an error containing the HTTP status
            if (!response.ok) {
                throw new Error("Error Occured!");
            }
            // STEP 5d: If the response is okay, the handler fetches the response and
            // returns it as text with response.text()
            return response.text();
        })
        // STEP 5e: Once response.text() has returned a value, the then() handler can pass in the text string to the textContent property of the poemDisplay element
        .then((txt) => {
            pre.textContent = txt;
        })
        // STEP 5f: Finish the chain with a catch() to grab any errors that may have been thrown by the promise, and display them on the page
        .catch((error) => {
            pre.textContent = error;
        });
}

// STEP 6: Initialize the app with Verse 1
updateDisplay("verse1");

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

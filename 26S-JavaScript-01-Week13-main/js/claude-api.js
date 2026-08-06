// HELPER: Available API Endpoints
// Base URL: https://georgian.polaristechservices.com

/* CLAUDE API ENDPOINTS */
// 1. POST /api/claude/messages - Send message to Claude
//    Headers: X-Student-API-Key: your_student_id, Content-Type: application/json
//    Body: { model: "claude-3-5-sonnet-20241022", max_tokens: 100, messages: [{ role: "user", content: "your message" }] }
//    Response: { content: [{ text: "Claude's response" }], usage: { input_tokens: 10, output_tokens: 20 } }

// 2. GET /api/claude/status - Check token usage
//    Headers: X-Student-API-Key: your_student_id
//    Response: { student_id: "12345", student_name: "John Doe", tokens_used: 500, tokens_allocated: 10000, tokens_remaining: 9500, is_enabled: true }

// STEP 1: Store the API configuration
// STEP 2: Set the base URL for the Claude API
const baseURL = "https://georgian.polaristechservices.com";
// STEP 3: Set your student API key (student ID)
const studentApiKey = "200488755";
// STEP 4: Set the maximum tokens for API requests
const maxTokens = 1000;

// LAB STEP 1: Array that stores the whole conversation (grows with each turn)
let conversationHistory = [];

/* STEP 5: Reference the DOM elements you'll need to access */
const userMessage = document.querySelector("#user-message");
const sendMessageBtn = document.querySelector("#send-message");
const checkUsageBtn = document.querySelector("#check-usage");
const results = document.querySelector("#results");

// Follow-up section elements
const followupSection = document.querySelector("#followup-section");
const followupMessage = document.querySelector("#followup-message");
const sendFollowupBtn = document.querySelector("#send-followup");

/* STEP 6: Add event listeners for all interactive elements */
// STEP 6a: Send message button
sendMessageBtn.addEventListener("click", sendChatMessage);

// STEP 6b: Check usage button
checkUsageBtn.addEventListener("click", checkTokenUsage);

// STEP 6c: Send follow-up button
sendFollowupBtn.addEventListener("click", sendFollowupMessage);

/* STEP 7: Create the checkTokenUsage function */
function checkTokenUsage(){
    // STEP 7a: Create complete url
    let url = `${baseURL}/api/claude/status`;

    // STEP 7b: Request status from the API
    fetch(url, {
        headers: {
            "X-Student-API-Key": studentApiKey
        }
    })
    // STEP 7c: Handle the response
    .then(response => {
        return response.json();
    })
    // STEP 7d: Display to user
    .then(json => {
        displayStatus(json);
    })
}

function displayStatus(json){
    console.log(json);
    let pre = document.createElement("pre"); // <pre></pre>

    pre.textContent = `Is Enabled: ${json.is_enabled}
    Last Used At: ${json.last_used_at}
    Student ID: ${json.student_id}
    Student Name: ${json.student_name}
    Tokens Allocated: ${json.tokens_allocated}
    Tokens Remaining: ${json.tokens_remaining}
    Tokens Used: ${json.tokens_used}
    `;

    results.appendChild(pre);
}

/* STEP 8: Send the FIRST message */
function sendChatMessage(){
    let userInput = userMessage.value;
    // LAB STEP 1: Add the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userInput });
    sendToClaude(userInput, false);   // false = normal reply style
    userMessage.value = "";
}

/* LAB: Send a FOLLOW-UP message using the full conversation */
function sendFollowupMessage(){
    let followupInput = followupMessage.value;
    // LAB STEP 1: Add the follow-up to the conversation history
    conversationHistory.push({ role: "user", content: followupInput });
    sendToClaude(followupInput, true);   // true = follow-up reply style
    followupMessage.value = "";
}

/* Shared request: sends the FULL conversation to Claude */
function sendToClaude(userInput, isFollowup){
    let url = `${baseURL}/api/claude/messages`;

    // LAB STEP 1: Send the ENTIRE conversation instead of just the current message
    let body = {
        "model": "claude-sonnet-5",
        "max_tokens": maxTokens,
        "messages": conversationHistory
    }

    fetch(url, {
        method: "POST",
        headers: {
            "X-Student-API-Key": studentApiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json); // check this in the console if something is off

        // If the server returned an error instead of a message, show it
        if (!json.content) {
            displayMessage(userInput, "ERROR: " + JSON.stringify(json), isFollowup);
            return;
        }

        // LAB STEP 1: Add Claude's response to the conversation history
        let reply = json.content[0].text;
        conversationHistory.push({ role: "assistant", content: reply });

        // Show this exchange, then reveal the follow-up box
        displayMessage(userInput, reply, isFollowup);
        followupSection.classList.remove("hidden");
    })
}

// STEP 8f / LAB STEP 2: Show the conversation in a chat-like format
function displayMessage(userInput, reply, isFollowup){
    // The user's message
    let userPara = document.createElement("p"); // <p></p>
    userPara.className = "user-msg";
    userPara.textContent = "You: " + userInput;

    // Claude's reply — follow-up replies get a distinct style
    let claudePara = document.createElement("p"); // <p></p>
    claudePara.className = isFollowup ? "followup-response" : "claude-msg";
    claudePara.textContent = "Claude: " + reply;

    results.appendChild(userPara);
    results.appendChild(claudePara);
}

// LAB EXTENSION: Multi-Message Chat Feature — COMPLETED
// LAB STEP 1: Each user + assistant message is pushed into conversationHistory
//             and the full array is sent with every request (multi-turn).
// LAB STEP 2: displayMessage shows "You:" and "Claude:" turns; follow-up
//             replies use .followup-response so they are visually distinct.
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
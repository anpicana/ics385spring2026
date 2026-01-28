// ===== PLAYER 1 DICE ROLL =====
// Generate a random number between 1 and 6 for Player 1's dice
// Math.random() creates a decimal between 0 and 0.999...
// Multiply by 6 to get 0-5.999...
// Math.floor() rounds down to get 0-5
// Add 1 to shift range to 1-6
var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

// Create the filename for the dice image based on the random number
// If randomNumber1 = 3, then randomDiceImage = "dice3.png"
var randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

// Build the complete file path to the image
// This creates a path like "images/dice3.png"
var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

// Select the first <img> tag on the page (Player 1's dice image)
// querySelectorAll("img") finds all images, [0] gets the first one
var image1 = document.querySelectorAll("img")[0];

// Update Player 1's dice image to show the random dice result
// setAttribute() changes the "src" attribute to point to the new image file
image1.setAttribute("src", randomImageSource);


// ===== PLAYER 2 DICE ROLL =====
// Generate a random number between 1 and 6 for Player 2's dice
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// Build the complete file path for Player 2's dice image
// Combines "images/" + "dice" + randomNumber2 + ".png"
var randomImageSource2 = "images/dice" + randomNumber2 + ".png";

// Select the second <img> tag on the page (Player 2's dice image) and update it
// [1] gets the second image element
document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

// =================================== 
// Extended code for Week3 Assignment:
// ===================================
// 
// ===== PLAYER 3 DICE ROLL =====
// Generate a random number between 1 and 6 for Player 3's dice
var randomNumber3 = Math.floor(Math.random() * 6) + 1;

// Build the complete file path for Player 2's dice image
// Combines "images/" + "dice" + randomNumber2 + ".png"
var randomImageSource3 = "images/dice" + randomNumber3 + ".png";

// Select the third <img> tag on the page (Player 3's dice image) and update it
// [1] gets the second image element
document.querySelectorAll("img")[2].setAttribute("src", randomImageSource3);


// ===== DETERMINE WINNER =====
// Compare the dice rolls to see who has the higher number

// If Player 1's number is greater than Player 2's number
if (randomNumber1 > randomNumber2) {
  // Update the heading to show Player 1 wins 
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
}
// If Player 2's number is greater than Player 1's number
else if (randomNumber2 > randomNumber1) {
  // Update the heading to show Player 2 wins
  document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
}
// If both numbers are equal
else {
  // Update the heading to show it's a draw
  document.querySelector("h1").innerHTML = "Draw!";
}

// ===== HOW THE GAME WORKS =====
// 1. Two random dice rolls are generated (1-6 each)
// 2. The corresponding dice images are displayed on the page
// 3. The player with the higher number wins
// 4. The result is displayed in the heading
// 5. User refreshes page to play again
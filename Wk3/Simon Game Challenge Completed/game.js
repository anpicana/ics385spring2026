// Store all the possible button colors in an array
var buttonColours = ["red", "blue", "green", "yellow"];

// This array stores the sequence of colors that the game generates
var gamePattern = [];
// This array stores the sequence of colors that the player clicks
var userClickedPattern = [];

// Tracks whether the game has started (false = not started yet)
var started = false;
// Tracks the current level (how many colors have been played)
var level = 0;


// This section of the code is AI-generated //
// ======================================== //

// Show the instructions modal when the page first loads
$(document).ready(function() {
  // Display the instructions pop-up
  $("#instructionsModal").show();
});

// Close the instructions modal when the player clicks the X button
$(".close-btn").click(function() {
  $("#instructionsModal").hide();
});

// Close the instructions modal when the player clicks "Got It! Let's Play"
$(".got-it-btn").click(function() {
  $("#instructionsModal").hide();
});

// Close the modal if the player clicks outside the modal content
$(window).click(function(event) {
  var modal = $("#instructionsModal");
  if (event.target === modal[0]) {
    modal.hide();
  }
});
// ======================================== //


// Listen for any key press to start the game
$(document).keypress(function() {
  // Only allow starting if the game hasn't started yet
  if (!started) {
    // Update the title to show the current level
    $("#level-title").text("Level " + level);
    // Start a new sequence
    nextSequence();
    // Mark the game as started
    started = true;
  }
});

// When a player clicks any button, this code runs
$(".btn").click(function() {
  // Get the ID (color) of the button that was clicked
  var userChosenColour = $(this).attr("id");
  // Add the clicked color to the player's pattern
  userClickedPattern.push(userChosenColour);

  // Play the sound for this color
  playSound(userChosenColour);
  // Add a visual animation (button flash) for this color
  animatePress(userChosenColour);

  // Check if the player's choice matches the game's pattern
  // (using length - 1 because arrays start at 0, not 1)
  checkAnswer(userClickedPattern.length-1);
});

// Check if the player's answer is correct
function checkAnswer(currentLevel) {
  // Compare the player's choice with the game's pattern at this position
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the player has completed the entire sequence correctly
    if (userClickedPattern.length === gamePattern.length){
      // Wait 1 second, then add a new color to the pattern
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Player made a mistake! Play the wrong sound
    playSound("wrong");
    // Add a red "game-over" effect to the page
    $("body").addClass("game-over");
    // Update the title to tell the player they lost
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the red "game-over" effect after 200 milliseconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game
    startOver();
  }
}

// Generate the next color in the sequence and add it to the pattern
function nextSequence() {
  // Clear the player's pattern so they can enter the new sequence
  userClickedPattern = [];
  // Increase the level by 1
  level++;
  // Update the title to show the new level
  $("#level-title").text("Level " + level);
  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Get a random color from the buttonColours array using that random number
  var randomChosenColour = buttonColours[randomNumber];
  // Add this color to the game's pattern
  gamePattern.push(randomChosenColour);

  // Flash the button for that color (fade in and out)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound for that color
  playSound(randomChosenColour);
}

// Add a visual effect to show the button was pressed
function animatePress(currentColor) {
  // Add the "pressed" class which changes the button's appearance
  $("#" + currentColor).addClass("pressed");
  // After 100 milliseconds, remove the "pressed" class to return to normal
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play a sound file for the given color
function playSound(name) {
  // Create a new audio object with the sound file path
  var audio = new Audio("sounds/" + name + ".mp3");
  // Play the sound
  audio.play();
}

// Reset all game variables to start over
function startOver() {
  // Reset level to 0
  level = 0;
  // Clear the game's pattern
  gamePattern = [];
  // Mark the game as not started
  started = false;
}

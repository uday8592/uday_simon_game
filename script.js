var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$("#start-btn").click(function() {  // Replace keypress with click event on the start button
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
    $("#start-btn").fadeOut();  // Hide the start button after the game starts
  }
});

$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animationPressed(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1); // Check if the answer is correct
});

function nextSequence() {
  userClickedPattern = []; // Reset the user clicked pattern for the next sequence
  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4); // Generate random index from 0 to 3
  var randomChoosenColor = buttonColors[randomNumber];
  gamepattern.push(randomChoosenColor); // Add the color to the game pattern
  
  // Flash the button by fading in and out
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound associated with the color
  playSound(randomChoosenColor);
  animationPressed(randomChoosenColor); // Animation effect on the button
}

function checkAnswer(currentLevel) {
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the current level matches the user clicked pattern
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        nextSequence(); // Go to the next sequence after a delay
      }, 1000);
    }
  } else {
    // If the answer is wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Start to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#start-btn").fadeIn();  // Show the start button again after game over
    startOver(); // Reset the game after game over
  }
}

function animationPressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
  start = false; // Allow the game to restart on key press
}

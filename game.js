var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
};

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  //console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //checkAnswer(buttonColours.lastIndexOf(userChosenColour));
  //console.log(buttonColours.lastIndexOf(userChosenColour));
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  $("#" + name).on("click", function() {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  });
};

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

$("body").keydown(function() {
  if(!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("Success!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
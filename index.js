var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

function nextSequence(){
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level += 1;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
              nextSequence();
            }, 1000);
          }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
      startOver();
    }
}

$(document).keypress(function(){
    if(!start == true){
        $("h1").text("Level 0")
        nextSequence();
        start == true;
    }

})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});


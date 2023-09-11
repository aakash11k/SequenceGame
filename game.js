var highscore = 1;
start();

function start(){
$(document).keydown(function(event){
  if(event.key === "Escape"){
    $("h1").text("LEVEL 1");
    gamePattern = [];
    userClickedPattern = [];
    lvl = 1;
    setTimeout(repeatSequence,1000);
  }
});
}


$(".btn").on("click", playSound);

var gamePattern;
var userClickedPattern;
var lvl;


function repeatSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 7);
  var buttonColors = ["red", "blue", "white", "violet", "green", "yellow", "orange"];

  var i = 0;
  function repeat() {
    if (i < gamePattern.length) {
      setTimeout(function() {
        timeup(i);
        i++;
        repeat();
      }, 500);
    } else {
      setTimeout(function() {
        nextSequence(randomNumber, buttonColors);
      }, 500);
    }
  }

  repeat();
}


function nextSequence(randomNumber,buttonColors){
  var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio1 = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio1.play();
    gamePattern.push(randomChosenColor);
}


function playSound() {
  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  $("#"+userChosenColor).addClass("pressed");
  var audio2 = new Audio("sounds/" + userChosenColor + ".mp3");
  audio2.play();
  audio2.addEventListener('ended', function(){
    $("#"+userChosenColor).removeClass("pressed");
  });
  check(userClickedPattern.length - 1);
}


function check(CurrentLvl){
  if(gamePattern[CurrentLvl]===userClickedPattern[CurrentLvl])
  {
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(repeatSequence,1000);
      lvl++;
      setTimeout(function(){
        $("h1").text("LEVEL " + lvl);
      },1000);
    }
  }
  else{
    $("h1").text("You clicked wrong");

    setTimeout(function(){
      $("h1").text("GAME OVER");
    },1500);

    $(".btn").addClass("gameover");
    setTimeout(function(){
      $(".btn").removeClass("gameover");
    },2000);

    var audio3 = new Audio("sounds/wrong.mp3");
    audio3.play();

    if(lvl > highscore){
      highscore = lvl;
      $("h2").text("Highscore = Level "+ highscore);
    }

    $(document).keydown(function(event){
      if(event.key === "Escape"){
        start();
      }
    });
  }
}

function timeup(i){
 $("#"+gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
}
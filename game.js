var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started = true;
    }
   
});

$(".btn").click(function(){
    var clickedColour = $(this).attr("id");
    userClickedPattern.push(clickedColour);
    playSound(clickedColour);
    animateButton(clickedColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game-over , Press Any key to Restart.")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);


        startOver();
    }
}


function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber =Math.floor((Math.random())*4) ;
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animateButton(colour)
{
    $("."+colour).addClass("pressed");
    setTimeout(function(){
        $("."+colour).removeClass("pressed");  
    },100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern=[];
    started = false;
  }
  



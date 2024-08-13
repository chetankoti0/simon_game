var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started = false;
var buttonColours=["green","red","yellow","blue"];

$(document).click(function(){

    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
   
    checkAnswer(userClickedPattern.length-1);
 
});

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){

    var audio = new Audio("./"+name+".mp3");
    audio.play();

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
     $("#"+currentColor).removeClass("pressed");
     },100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("ASS FUCK");
        if(userClickedPattern.length === gamePattern.length){
             setTimeout(function(){
                  nextSequence();
                  },1000);
             }}
    else{

       playSound("wrong");
       $("body").addClass("game-over");
       startOver();
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       $("#level-title").text("Game OVER , Press Any Key To RESTART");
    }

}
function startOver(){
    level=0;
    gamePatter=[];
    started=false;
}
$(document).ready(function(){

//SHOW GAME OPENING SCREEN
gameMenu();

//FUNCTION TO SET UP THE OPENING SCREEN

function gameMenu(){ 
$("#points").html('')
$("#cards").html('')
$("#cards").hide()
$("attempts").html('')
$(".timer").hide()
$("h1").html('Welcome to the memory game.')
$("#message").html(`Do your best to match all the cards as fast as you can.</br>
You will have a limited number of chances to match all of the cards, if you are not successfull you will lose the game.</br>
Good Luck...`)
$("#start").find('button').html('Start Game')
$("#start").show()
}

//SHUFFLE CARDS IN SETUP//
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
shuffleArray(cards);
shuffleArray(hardcards);
console.log(cards)

// DEAL OUT SHUFFLED CARDS
    var cardButtons = cards.map(function(e){
    return `
    <div id="${e.value}" class ="hidecard">
    <img class="front-face" src=${e.image}>
    <img class="back-face" src="./assets/darkanon.jpg">
    </div>
    `
})

//CLICK ON THE START GAME BUTTON

    $("#start").on('click','button', function(){
        $("#start").slideUp('slow')
        $(".timer").slideDown('slow')
        setTimeout(() => {
            $("#cards").html(cardButtons)
            $("#cards").slideDown('slow')
        }, 1000);
        $("#start").slideUp('slow')
        $("#hardmode").slideUp('slow')
        $(".timer").slideDown('slow')
        $("#message").slideUp('slow')
        game()
})
//KEEPING TRACK OF VARIABLES

var firstVal = ""
var secondVal = ""
var points = 0
var attempts = 30
var arrayItems = []
var totalTries = 0

//MAIN GAME FUNCTION

function game(){
    minutes= 0
    seconds= 0
    var timer = setInterval(() => {
        seconds++;
        if(seconds=== 60){
            minutes++;
            seconds = 0;
            if(seconds <10){  
            }
        }
     $(".timer").html(`${minutes}:${seconds}`)
    }, 1000);

//CLICK ON A CARD
$("#cards").on('click','div:not(.stay)',function(){
    // document.getElementById("myAudio").play();
    console.log("clicked")
   thisvalue = $(this).attr('id')
    thisCard = $(this);
    console.log(thisCard)
    arrayItems.push(thisCard)
    console.log(arrayItems)
    setTimeout(() => {
    
    }, 1000);
    $(this).addClass('stay')
    // $(this).flip()
    $(this).find('.front-face').show()
    $(this).find('.back-face').hide()

//SET FIRST GUESS
    if(firstVal ===""){
        firstVal = thisvalue;
        $("button").html('Restart Game')
        $("#start").slideDown('slow')
        console.log("first value:"+firstVal)
        $("#start").on('click', 'button', function(){
            location.reload(true);
            
      
        })

//SET SECOND GUESS 

    } else if(firstVal!==""&&secondVal===""){
        totalTries++;
        secondVal = thisvalue;
        $('#cards *').prop("disabled",true);
        $("#start").on('click', 'button', function(){
            location.reload(true);

        })
        console.log("Guesses: "+firstVal +" and " +secondVal)

//IF BOTH GUESSES MATCH

        if(firstVal === secondVal){

            match();

// FUNCTION TO RUN WHEN A MATCH IS MADE
            function match(){
            setTimeout(() => {
                $('#message').slideDown('slow').html("Good job! Keep up the good work!")
                points ++;
                $("#points").slideDown('slow').html(`you have ${points} points`)
                firstVal=""
                secondVal=""
                $("#cards:not(.stay)").removeClass('showcard')
                arrayItems= [];
                $('#cards *').prop("disabled",false);
            }, 1000);

//CLICK THE RESET BUTTON
            $("#start").on('click', 'button', function(){
                location.reload(true);
            })
        }

//WIN THE GAME
            if(points === 9){
                // document.getElementById('myAudio2').play()
                setTimeout(() => {
                    win();
                }, 2000);

//CLICK THE RESET BUTTON
                $("#start").on('click', 'button', function(){
                    location.reload(true);

                })

//FUNCTION TO RUN WHEN THE GAME IS WON

                function win(){
                $("#message").slideDown('slow').html('Congradulations! you won!')
                $("#cards").slideUp()
                setTimeout(() => {
                    $("#video").slideDown()
                }, 2000);
                
                if(minutes >= 1){
                    $("#points").slideDown('slow').html('You need to be faster... because you took more than 1 minute, you get one point taken away... you have just 9 points. Better luck next time.')
                } else{
                    $("#points").slideUp('slow')
                }
               
                $("#attempts").slideDown('slow').html(`You took ${30 - attempts} attempts with ${totalTries} total tries to finish the game. you can do better.`)
                clearInterval(timer);
                $(".resultTime").slideDown('slow').html(`you finished the game in ${minutes} minutes and ${seconds} seconds. Good Job.`)
                }
            }
           
            

//IF BOTH GUESSES ARE WRONG

        }else if(firstVal !== secondVal){
            noMatch();

//CLICK THE RESET BUTTON
            $("#start").on('click', 'button', function(){
                location.reload(true);
            })

//FUNCTION TO RUN WHEN THERE IS NOT A MATCH
            function noMatch(){
            setTimeout(() => {
            console.log("yes")
            console.log(firstVal, secondVal)
            firstVal=""
            secondVal=""
            arrayItems[0].removeClass('stay')
            arrayItems[1].removeClass('stay')
            arrayItems=[]
            attempts --;
            $("#attempts").slideDown('slow').html(`you have ${attempts} attemps left, motherfucker...`)
            $('.hidecard:not(.stay)').removeClass('showcard')
            $('.hidecard:not(.stay)').find('.back-face').show()
            $('#cards *').prop("disabled",false);
            $("#image").show()
        
//THE GAME IS LOST
            if(attempts===1){
                lose();
                // document.getElementById('myAudio3').play()

//RUN LOSE FUNCTION IF YOU PLAYER RUNS OUT OF ATTEMPTS
                function lose(){
                $("#attempts").hide()
                $("#message").html(`Game over motherfucker! you suck`);
               $("#cards").slideUp('slow')
                $("#video").slideDown('slow')
                }
            }
            }, 1000);
        }
            

        }

    } 
    
})

}
//HARD MODE GAME///////////////////////////////////
///////////////////////////
///////////////////////
//////////////////////
/////////////////
/////////////
///////
/////
///
//



function shuffleHardArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//SHUFFLE CARDS FOR HARD MODE
// shuffleArray(hardCards);

// DEAL OUT SHUFFLED CARDS
var HardcardButtons = hardcards.map(function(e){
    return `
    <div id="${e.value}" class ="hidecard">
    <img class="front-face" src=${e.image}>
    <img class="back-face" src="./assets/darkanon.jpg">
    </div>
    `
})

//CLICK ON HARD MODE
$("#hardmode").on('click','button', function(){
    $("#start").slideUp('slow')
        $(".timer").slideDown('slow')
        setTimeout(() => {
            $("#cards").html(HardcardButtons)
            $("#cards").slideDown('slow')
        }, 1000);
        $("#start").slideUp('slow')
        $(".timer").slideDown('slow')
        $("#message").slideUp('slow')
        // shuffleHardArray(hardcards);
        $("#hardmode").slideUp('slow')
        hardgame()
})

//HARD MODE GAME FUNCTION 

function hardgame(){
    minutes= 0
    seconds= 0
    var timer = setInterval(() => {
        seconds++;
        if(seconds=== 60){
            minutes++;
            seconds = 0;
            if(seconds <10){  
            }
        }
     $(".timer").html(`${minutes}:${seconds}`)
    }, 1000);

//CLICK ON A CARD
$("#cards").on('click','div:not(.stay)',function(){
    // document.getElementById("myAudio").play();
    console.log("clicked")
   thisvalue = $(this).attr('id')
    thisCard = $(this);
    console.log(thisCard)
    arrayItems.push(thisCard)
    console.log(arrayItems)
    setTimeout(() => {
    
    }, 1000);
    $(this).addClass('stay')
    // $(this).flip()
    $(this).find('.front-face').show()
    $(this).find('.back-face').hide()

//SET FIRST GUESS
    if(firstVal ===""){
        firstVal = thisvalue;
        $("button").html('Restart Game')
        $("#start").slideDown('slow')
        console.log("first value:"+firstVal)
        $("#start").on('click', 'button', function(){
            location.reload(true);
            
      
        })

//SET SECOND GUESS 

    } else if(firstVal!==""&&secondVal===""){
        totalTries++;
        secondVal = thisvalue;
        $('#cards *').prop("disabled",true);
        $("#start").on('click', 'button', function(){
            location.reload(true);

        })
        console.log("Guesses: "+firstVal +" and " +secondVal)

//IF BOTH GUESSES MATCH

        if(firstVal === secondVal){

            match();

// FUNCTION TO RUN WHEN A MATCH IS MADE
            function match(){
            setTimeout(() => {
                $('#message').slideDown('slow').html("Good job! Keep up the good work!")
                points ++;
                $("#points").slideDown('slow').html(`you have ${points} points`)
                firstVal=""
                secondVal=""
                $("#cards:not(.stay)").removeClass('showcard')
                arrayItems= [];
                $('#cards *').prop("disabled",false);
            }, 1000);

//CLICK THE RESET BUTTON
            $("#start").on('click', 'button', function(){
                location.reload(true);
            })
        }

//WIN THE GAME
            if(points === 11){
                // document.getElementById('myAudio2').play()
                setTimeout(() => {
                    win();
                }, 2000);

//CLICK THE RESET BUTTON
                $("#start").on('click', 'button', function(){
                    location.reload(true);

                })

//FUNCTION TO RUN WHEN THE GAME IS WON

                function win(){
                $("#message").slideDown('slow').html('Congradulations! you won!')
                $("#cards").slideUp()
                setTimeout(() => {
                    $("#video").slideDown()
                }, 2000);
                
                if(minutes >= 1){
                    $("#points").slideDown('slow').html('You need to be faster... because you took more than 1 minute, you get one point taken away... you have just 9 points. Better luck next time.')
                } else{
                    $("#points").slideUp('slow')
                }
               
                $("#attempts").slideDown('slow').html(`You took ${30 - attempts} attempts with ${totalTries} total tries to finish the game. you can do better.`)
                clearInterval(timer);
                $(".resultTime").slideDown('slow').html(`you finished the game in ${minutes} minutes and ${seconds} seconds. Good Job.`)
                }
            }
           
            

//IF BOTH GUESSES ARE WRONG

        }else if(firstVal !== secondVal){
            noMatch();

//CLICK THE RESET BUTTON
            $("#start").on('click', 'button', function(){
                location.reload(true);
            })

//FUNCTION TO RUN WHEN THERE IS NOT A MATCH
            function noMatch(){
            setTimeout(() => {
            console.log("yes")
            console.log(firstVal, secondVal)
            firstVal=""
            secondVal=""
            arrayItems[0].removeClass('stay')
            arrayItems[1].removeClass('stay')
            arrayItems=[]
            attempts --;
            $("#attempts").slideDown('slow').html(`you have ${attempts} attemps left, motherfucker...`)
            $('.hidecard:not(.stay)').removeClass('showcard')
            $('.hidecard:not(.stay)').find('.back-face').show()
            $('#cards *').prop("disabled",false);
            $("#image").show()
        
//THE GAME IS LOST
            if(attempts===1){
                lose();
                // document.getElementById('myAudio3').play()

//RUN LOSE FUNCTION IF YOU PLAYER RUNS OUT OF ATTEMPTS
                function lose(){
                $("#attempts").hide()
                $("#message").html(`Game over motherfucker! you suck`);
               $("#cards").slideUp('slow')
                $("#video").slideDown('slow')
                }
            }
            }, 1000);
        }
            

        }

    } 
    
})

}










})
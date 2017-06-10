// ================= variables =====================

var words = ["JAMS", "JUICY", "PUZZLE", "SIZZLING", "MOZZARELLA", "MAXIMIZATION"];
var iterator = 0, letters = [], target = [], repeated = "", counter = 0, repeatCounter = 1,lives = 0, guess = "",letterCounter = 0, start = true, status = 0, process =true;
var availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var word = "";
//counter += iterator;
document.getElementById("counter").innerHTML= counter;
var message = ["!! The Char Must Be Between (A - Z) !!", 
               "!! This Char Is Already Guessed !!", 
               "!! Congratulations, You Win !!",
               "Game Over",
               "Good Job",
               "OOPS..! Try Again",
               "Press Start to Begin"];



document.getElementById("message").innerHTML= message[6];

//==================== reset function ============= 
        function reset(){
            for(var i = 1 ; i < 19 ; i++){
                     document.getElementById("g"+i).innerHTML= "";
                }
            iterator += 1; 
            letters.length=0; target.length=0;  repeated = "";  
            repeatCounter = 1;  guess = ""; letterCounter = 0 ;
        }

//================== placement function ============

        function placement(){
            document.getElementById("the-word").innerHTML="";
             for(i = 0; i < letters.length; i++){
                 if(target[i] == null){document.getElementById("the-word").innerHTML += "__ ";}
                 else{document.getElementById("the-word").innerHTML +=(target[i]+" ");}
             }
        }

//================== Start function ================

function startFunction(){
    if (start == true){
        document.getElementById("scores").style.display="block";
        document.getElementById("word-board").style.display="block";
        document.getElementById("message").innerHTML= " ";
        document.getElementById("btn").innerHTML="Retry";
        reset();
        start = false; process = true ; status = 1;
        lives = 3; letters.length = 0; target.length = 0;  repeated = "";
        iterator = 0; counter = 12 + iterator; repeatCounter = 1;  guess = ""; letterCounter = 0 ;
        word = words[iterator];
        letters = word.split("");
        letterCounter = letters.length;
        placement();
        document.getElementById("lives").innerHTML= lives;
        document.getElementById("btn").disabled=true;
        document.getElementById("counter").innerHTML= counter;
        //========= Retry =======
    }else if (status==1) {  
        reset();
        iterator -= 1;
        word = words[iterator];
        letters = word.split("");
        repeated.length=0;
        letterCounter = letters.length;
        lives -= 1; 
        counter = 12+iterator;
        placement();
        status=0;
        process =true;
        document.getElementById("lives").innerHTML= lives;
        document.getElementById("btn").disabled=true;
        document.getElementById("counter").innerHTML= counter;
        //========= next =======
        }else if(status == 0){
            reset();
            word = words[iterator];
            letters = word.split("");
            repeated.length=0;
            letterCounter = letters.length;
            counter = 12+iterator;
            placement();
            status=1;
            process =true;
            document.getElementById("btn").innerHTML="Retry";
            document.getElementById("btn").disabled=true;
            document.getElementById("counter").innerHTML= counter;
        }
        if (lives > 0 && iterator <= 5){
   
 //================== onkeyup function ==============  
    
            document.onkeyup = function(event) {
            if (process== true){
            var guess = (event.key).toUpperCase();
                document.getElementById("btn").disabled=false;
                document.getElementById("message").innerHTML= "";
                if (availableLetters.indexOf(guess) > -1) {
                    var flag = true;
                    repeatFinder();
                    if (flag){
                        find();
                        document.getElementById("the-word").innerHTML ="";
                        placement();
                        counter--;
                        document.getElementById("counter").innerHTML= counter;
                    }
                }else{
                    document.getElementById("message").innerHTML= message[0];
                }
                    
        // =====================================
               
                if(counter >= 0 && letterCounter <= 0 ){
                    if(iterator > 4){
                        process =false;
                        start=true;
                        document.getElementById("message").innerHTML= message[2];
                        document.getElementById("btn").innerHTML="Restart";
                    }else{
                        process =false;
                        status=0;
                        document.getElementById("message").innerHTML= message[4];
                        document.getElementById("btn").innerHTML="Next";
                    }
                }else if(counter == 0 && letterCounter > 0){
                          if(lives == 0){
                                process =false;
                                start=true;
                                document.getElementById("message").innerHTML= message[3];
                                
                                document.getElementById("btn").innerHTML="Restart";
                          }else{
                                process =false;
                                status=1;
                                document.getElementById("message").innerHTML= message[5];
                                document.getElementById("btn").innerHTML="Retry";  
                          }
                }
                if(counter >= 0 && letterCounter > 0){
                    status=1;
                    document.getElementById("btn").innerHTML="Retry"; 
                }
                
            //==================== find function ===============
                    
                        function find(){
                            for(i = 0 ; i < letters.length ; i++){
                                 if(guess == letters[i]){ 
                                   target[i] = guess;
                                   letterCounter -= 1;
                                 }
                            }
                        }
                    
            //==================== repeatFinder function========
                    
                        function repeatFinder(){
                            if (repeated.indexOf(guess) > -1) {
                                document.getElementById("message").innerHTML= message[1];
                                flag = false;
                            }else{
                                repeated+=guess;
                                document.getElementById("g"+repeatCounter).innerHTML= guess;
                                repeatCounter += 1;
                            }
                        }
            //===================================================
                
                }//process
            }//keyup
        }else if (lives > 0 && iterator > 5 ){
            start=true;
            document.getElementById("message").innerHTML= message[2];
            document.getElementById("btn").innerHTML="Restart";
            }else if(lives <= 0){
                start=true;
                document.getElementById("btn").disabled=false;
                document.getElementById("message").innerHTML= message[3];
                document.getElementById("btn").innerHTML="Restart";  
            }
            
}
        
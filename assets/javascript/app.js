var config = {
  apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
  authDomain: "coder-bay-fee9d.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-111d0.firebaseio.com/",
  storageBucket: "coder-bay-fee9d.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();


var player1 = {
    key:"",
    id:1,
    name: "",
    wins: 0,
    loses: 0,
    choice :""
};
var player2 = {
    key:"",
    id:2,
    name: "",
    wins: 0,
    loses: 0,
    choice :""
};
var isPlaer1SignedIn =false;
var isPlaer2SignedIn =false;
var fisrtChoice;
var secondChoice;
var turn ;
var connected = 0;
var counter = 0;
var pl1Key="";
var pl2Key="";
var choice1 = "";
var choice2 = "";
//================================= Connections =====================================

$(".btn").on("click", function(event) {
    event.preventDefault();
    $(".name-input").hide();
    $(".btn").hide();

var turns;
    if(connected !=1) {
        player1.name = $(".name-input").val().trim();
        var con = database.ref().child("Players").push({
            id : player1.id,
            name: player1.name,
            wins: player1.wins,
            loses: player1.loses,
            choice: player1.choice
        });  
        con.onDisconnect().remove();
    }else if(connected ===1 ){
        player2.name = $(".name-input").val().trim();
        var conn = database.ref().child("Players").push({
            connection : true
        });
        conn.onDisconnect().remove();
        var con = database.ref().child("Players").push({ 
            id : player2.id,
            name: player2.name,
            wins: player2.wins,
            loses: player2.loses,
            choice: player2.choice
        });  
        con.onDisconnect().remove();
    }
});

//----------------------------
database.ref().child("Players").on("value", function(snap) {
    connected = snap.numChildren();
});
//----------------------------

var addPlayers = database.ref().child("Players") ;
addPlayers.on("child_added", function(data){
    if(player1.name !== "") {
        $(".name-comm").text("Hello "+player1.name+"! You are Player"+ player1.id);
        $(".turn-comm").show();
        if(pl1Key ===""){
            player1.key = data.key;
            pl1Key=data.key;
        }
        $(".name-comm").show();
        $(".player1").show();
        $(".player1-name").text("P1: "+player1.name);
        $(".pl1").text("Wins: "+player1.wins+" Loses: "+player1.loses);
    }else if(player2.name !== ""){
        $(".name-comm").text("Hello "+player2.name+"! You are Player"+ player2.id);
        $(".turn-comm").show();
        if(pl1Key ===""){
            player2.key = data.key;
            pl2Key=data.key; 
        }
        $(".name-comm").show();
        $(".player2").show();
        $(".player2-name").text("P2: "+player2.name);
        $(".pl2").text("Wins: "+player2.wins+" Loses: "+player2.loses);
    }
});

//------------------
var playersRef = database.ref().child("Players");
playersRef.on("child_removed", function(data) {
   var deletedPlayer = data.val();
});

//==================== Message =========================
var msgRef = database.ref("Message/");
msgRef.on("child_added", function(data) {
     $(".text-area").append("<div class='msgs'><span>"+ data.val().msg+ "</span></div>")   
});
//-----------------
$(".msg-button").on("click", function(event){
    event.preventDefault();
    var msg = $(".msg-input").val().trim();
    if(player1.name != ""){
        var con = database.ref().child("Message/").push({
            msg: player1.name+" : "+msg
            });
        con.onDisconnect().remove();
    }else if(player2.name != "") {
        var con = database.ref().child("Message/").push({
             msg: player2.name+" : "+msg
            }); 
        con.onDisconnect().remove();
    }
 $(".msg-input").val("");   
});

// ================== game ================================
database.ref().on("value", function(data){
    turn =data.val().turn;
    if(turn === 1){
        $(".turn-comm").html("<h2> This is PLAYER 1 turn </h2>");
    }else if(turn === 2){
        $(".turn-comm").html("<h2> This is PLAYER 2 turn </h2>");
    }
    $(".turn-comm").animate({opacity:0},200,"linear",function(){
    $(this).animate({opacity:1},200);
});
    });

$(document).on("click",".img1", function(event) {
if(turn ==1){
    incTurn();
    if (connected >=3 ){
        $(".img1").hide();
        var choice = this.id;
        switch(choice){
            case "r": 
                player1.choice ="rock";
                updateChoice1("rock");
                
                $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/rocks-to-identify.png">');
                break;
            case "p":
                player1.choice ="paper";
                updateChoice1("Paper");
                $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/paper2.png">');
                break;
            case "s":
                player1.choice ="scissors";
                updateChoice1("Scissors");
                $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/scissors.png">');
                break;
        }
    }
//    var choiceRef =database.ref("Players/"+pl1Key);
//    choiceRef.on("value", function(data) {
//        var choice1 = data.val().choice;
//        console.log("player 1 choice is " + choice1);
//       
//        
//    });
     
}
});

$(document).on("click",".img2", function(event) {
if(turn == 2){
    decTurn();
    if (connected >=3 ){
        $(".img2").hide();
        var choice = this.id;
        switch(choice){
            case "r": 
                player2.choice ="rock";
                updateChoice2("rock");
                $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/rocks-to-identify.png">');
                break;
            case "p":
                player2.choice ="paper";
                updateChoice2("Paper");
               $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/paper2.png">');
                break;
            case "s":
                player2.choice ="scissors";
                updateChoice2("Scissors");
                $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="/assets/images/scissors.png">');
                break;
        }
    }
    //-------
//        var choiceRef =database.ref("Players/"+pl2Key);
//        choiceRef.on("value", function(data) {
//        var choice2 = data.val().choice;
//        console.log("player 2 choice is " + choice2);
//        });
        //----
}
});


//====
database.ref().on("child_added", function(data) {
        if (data.child("Players/").exists() && data.child("Players/").exists()) {
            $(".text-area").html(data.val().choice + data.val().choice);
        console.log(data.child("Players/"+pl1Key).val().choice);
           // var ch1 = data.child("Players/"+pl1Key).val().choice;
        console.log(data.child("Players/"+pl2Key).val().choice);
           // var ch2 = data.child("Players/"+pl2Key).val().choice;
//        if( data.child("Players/").val().choice 
//                != 
//            data.child("Players/").val().choice){
//            
//            console.log("different");
//        }else{
//            console.log("same");
//        }
//            
            
          //console.log("idiot");  
        }
    });
//====
//database.ref().on("value", function(data) {
//        if (data.child("Players/"+pl1Key).exists() && data.child("Players/"+pl2Key).exists()) {
//            $(".text-area").html(data.child("Players/"+pl1Key).val().choice);
//        console.log(data.child("Players/"+pl1Key).val().choice);
//           // var ch1 = data.child("Players/"+pl1Key).val().choice;
//        console.log(data.child("Players/"+pl2Key).val().choice);
//           // var ch2 = data.child("Players/"+pl2Key).val().choice;
//        if( data.child("Players/"+pl1Key).val().choice 
//                != 
//            data.child("Players/"+pl2Key).val().choice){
//            
//            console.log("different");
//        }else{
//            console.log("same");
//        }
//            
//            
//          //console.log("idiot");  
//        }
//    });
//-------
//        var choiceRef =database.ref("Players/"+pl2Key);
//        choiceRef.on("value", function(data) {
//        var choice2 = data.val().choice;
//        console.log("player 2 choice is " + choice2);
//        });
        //----
//================================= Functions =====================================
function updateChoice1(choice){
    var upd = database.ref().child("Players/"+pl1Key);
    upd.update({
        "choice" : choice
    });
}  
function updateChoice2(choice){
    var upd = database.ref().child("Players/"+pl2Key);
    upd.update({
        "choice" : choice
    });
}   

function incTurn(){
    var inc = database.ref();
    inc.update({
       "turn": 2 
    });
}
function decTurn(){
    var dec = database.ref();
    dec.update({
       "turn": 1 
    });
}

        





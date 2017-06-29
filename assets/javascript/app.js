var config = {
  apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
  authDomain: "coder-bay-fee9d.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-111d0.firebaseio.com/",
  storageBucket: "coder-bay-fee9d.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();


var player1 = {
    key:"", id:1, name: "", wins: 0, loses: 0, choice :""
};
var player2 = {
    key:"", id:2, name: "", wins: 0, loses: 0, choice :""
};

var p1key="";
var p1name="";
var p1wins=0;
var p1loses=0;
var p1choice="";

var p2key="";
var p2name="";
var p2wins=0;
var p2loses=0;
var p2choice="";

var tie = false;
var turning = 1;
var connected = 0;
var counter = 0;

var choice1 = "";
var choice2 = "";
var flag=false;

//================================= Connections =====================================

$("#start").on("click", function(event) {
    event.preventDefault();
    $(".name-input").hide();
    $("#start").hide();
    var con = database.ref();
    if(connected !=1) {
        player1.name = ($(".name-input").val().trim()).toUpperCase();
        var con1 = con.child("Players").child("1");
        con1.set({
            id : player1.id,
            name: player1.name,
            choice : "",
            wins : player1.wins,
            loses : player1.loses
        });
        con1.onDisconnect().remove();
    }else if(connected ===1 ){
        player2.name = ($(".name-input").val().trim()).toUpperCase();
        var con2 = con.child("Players").child("2");
        con2.set({
            id : player2.id,
            name: player2.name,
            choice : "",
            wins : player2.wins,
            loses : player2.loses
        });
        con3 = con;
        con3.update({
            "turn" : 1
        });
        con2.onDisconnect().remove();
        con3.child("turn").onDisconnect().remove();
    }
});
//----------------------------
database.ref().child("Players").on("value", function(snap) {
    connected = snap.numChildren();
});
//=============================

database.ref().child("Players").on("value", function(data){
   
    if(connected===1 ){
        // console.log(data.val());
        if(player1.name !== "") {
            $(".name-comm").text("Hello "+data.child("1").val().name+"! You are Player"+ data.child("1").val().id);
            $(".turn-comm").show();
            $(".name-comm").show();
            $(".choices1").show();
            $(".player1-name").text("P1: "+data.child("1").val().name);
            $(".pl1").text("Wins: "+data.child("1").val().wins+" Loses: "+data.child("1").val().loses);
        };
    }else if (connected === 2 ){
        if(player2.name !== ""){
            $(".name-comm").text("Hello "+player2.name+"! You are Player"+ player2.id);
            $(".turn-comm").show();
            $(".name-comm").show();
            $(".choices2").show();
            $(".player2-name").text("P2: "+player2.name);
            $(".pl2").text("Wins: "+player2.wins+" Loses: "+player2.loses);
        };
        if(data.child("2").val().name !== "") {
            $(".player1-name").text("P1: "+data.child("1").val().name);
            $(".player2-name").text("P2: "+data.child("2").val().name);
            $(".pl1").text("Wins: "+data.child("1").val().wins+" Loses: "+data.child("1").val().loses);
            $(".pl2").text("Wins: "+data.child("2").val().wins+" Loses: "+data.child("2").val().loses);
        }
    };
});
//===========================
database.ref("turn").on("value", function(data){
    turning = data.val();
    if(turning === 1){
        $(".turn-comm").html("<h2> This is PLAYER 1 Turn </h2>");
        player1Select(turning);
       // console.log(turning);
    }else if(turning === 2){
        $(".turn-comm").html("<h2> This is PLAYER 2 Turn </h2>");
        player2Select(turning);
        $("#reset").show();
      //  console.log(turning);
    };
});
//----------------------------
function player1Select(turning){
    $(document).on("click",".img1", function(event) {
        event.preventDefault();
        if(turning ==1){
            incTurn();
            if (connected >=2 ){
                $(".img1").hide();
                var choice = this.id;
                switch(choice){
                    case "r": 
                        player1.choice ="rock";
                        updateChoice1("rock");
                        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
                        break;
                    case "p":
                        player1.choice ="paper";
                        updateChoice1("paper");
                        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
                        break;
                    case "s":
                        player1.choice ="scissors";
                        updateChoice1("scissors");
                        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
                        break;
                };
            };
        };
    });
};
//=============================
function player2Select(turning){
    $(document).on("click",".img2", function(event) {
        event.preventDefault();
//        if(turning == 2){
       // decTurn();
            if (connected ===2 && turning === 2){
                $(".img2").hide();
                var choice = this.id;
                switch(choice){
                    case "r": 
                        player2.choice ="rock";
                        updateChoice2("rock");
                        $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
                        break;
                    case "p":
                        player2.choice ="paper";
                        updateChoice2("paper");
                       $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
                        break;
                    case "s":
                        player2.choice ="scissors";
                        updateChoice2("scissors");
                        $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
                        break;
                };
                
                
            };
            
//        };
        
    });
    
};

//=============================


$("#reset").on("click", function reset(){
var pl1win =false;
var pl2win =false;
var w;
var l;
var ref = database.ref().child("Players");
ref.on("value", function(snapshot) {
if(snapshot.child("1").val().choice !="" && snapshot.child("2").val().choice != ""){
  console.log(snapshot.child("1").val().choice);
    if(snapshot.child("1").val().choice === "rock"){
        if(snapshot.child("2").val().choice === "paper"){
            pl2win =true;
            w = (snapshot.child("2").val().wins)+1;
            l = (snapshot.child("1").val().loses)+1;
        }else if(snapshot.child("2").val().choice === "scissors"){
            pl1win =true;
            w = (snapshot.child("1").val().wins)+1;
            l = (snapshot.child("2").val().loses)+1;
        } 
    }else if(snapshot.child("1").val().choice === "paper"){
        if(snapshot.child("2").val().choice === "rock"){
            pl1win =true;
            w = (snapshot.child("1").val().wins)+1;
            l = (snapshot.child("2").val().loses)+1;
        }else if(snapshot.child("2").val().choice === "scissors"){
            pl2win =true;
            w = (snapshot.child("2").val().wins)+1;
            l = (snapshot.child("1").val().loses)+1;
        } 
    }else if(snapshot.child("1").val().choice === "scissors"){
        if(snapshot.child("2").val().choice === "rock"){
            pl2win =true;
            w = (snapshot.child("2").val().wins)+1;
            l = (snapshot.child("1").val().loses)+1;
        }else if(snapshot.child("2").val().choice === "paper"){
            pl1win =true;
            w = (snapshot.child("1").val().wins)+1;
            l = (snapshot.child("2").val().loses)+1;
        } 
    }
}
});
$("#reset").hide();
decTurn();
$(".choice1").hide();
$(".choice2").hide();
$(".img1").show();
$(".img2").show();
if (pl1win){
    updateWins1(w);
    updateLoses2(l);
}else if(pl2win){
    updateWins2(w);
    updateLoses1(l);
}
updateChoice1("");
updateChoice2("");  
//var lo1;
//var lo2;
////    var ref = database.ref("Players");
//ref.once("value")
//  .then(function(snapshot) {
////    var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
////    var firstName = snapshot.child("name/first").val(); // "Ada"
//    lo1 = snapshot.val(); // "Lovelace"
//    lo2 = snapshot.val(); // null
//  });
//    console.log(lo1);
//    console.log(lo2);

//    updateChoice1("");
//    updateChoice2("");
//    updateWins1(p1wins);
//    updateLoses1(p1loses);
//    updateWins2(p2loses);
//    updateLoses2(p2loses);
    
//    
});


//=============================
//function checker(){
    database.ref("Players").on("value", function(data){
        if(connected === 2 && turning===2){
            var pl1choice = data.child("1").val().choice;
            var pl2choice = data.child("2").val().choice;
            p1name = data.child("1").val().name;
            p2name = data.child("2").val().name;
            if (pl1choice != "" &&  pl2choice != ""){
               // console.log(data);
                $(".choice1").show();
                $(".choice2").show();
                choiceChecker(pl1choice, pl2choice);
               // console.log(data.val());
            }
        }
    });
//}

//=========================== Choice Checker Function =======
function choiceChecker(p1, p2){
    if(p1 === "rock"){
        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
        if(p2 === "rock"){
            $(".turn-comm").html("<h2> Tie ! </h2>");
            //tie =true;  
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
        }
        if(p2 === "paper"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
            $(".turn-comm").html("<h2> "+p2name+" WON ! </h2>");
//            p1loses +=1;
//            p2wins +=1;
        }
        if(p2 === "scissors"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
            $(".turn-comm").html("<h2> "+p1name+" WON ! </h2>");
//            p1wins +=1;
//            p2loses +=1;
        }
    }else if(p1 === "paper"){
        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
        if(p2 === "rock"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
            $(".turn-comm").html("<h2> "+p1name+" WON ! </h2>");
//            p1wins +=1;
//            p2loses +=1;
        }
        if(p2 === "paper"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
            $(".turn-comm").html("<h2> Tie ! </h2>");
            //tie =true; 
        }
        if(p2 === "scissors"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
            $(".turn-comm").html("<h2> "+p2name+" WON ! </h2>");
//            p1loses +=1;
//            p2wins +=1;
        }
    }else if(p1 === "scissors"){
        $(".choice1").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
        if(p2 === "rock"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/rocks-to-identify.png">');
            $(".turn-comm").html("<h2> "+p2name+" WON ! </h2>");
//            p1loses +=1;
//            p2wins +=1;
        }
        if(p2 === "paper"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/paper2.png">');
            $(".turn-comm").html("<h2> "+p1name+" WON ! </h2>");
//            p1wins +=1;
//            p2loses +=1;
        }
        if(p2 === "scissors"){
            $(".choice2").html('<h1> Your Choise : </h1><br><img class="chosen-img" width=150px  src="assets/images/scissors.png">');
            $(".turn-comm").html("<h2> Tie ! </h2>");
            //tie =true;
        }
    }
}

//=============================
var addPlayers = database.ref().child("Players") ;
addPlayers.on("child_added", function(data){
   

});

//------------------
var playersRef = database.ref().child("Players");
playersRef.on("child_removed", function(data) {
   var deletedPlayer = data.val();
});



//==================== chat =========================
var msgRef = database.ref("chat/");
msgRef.on("child_added", function(data) {
     $(".text-area").append("<div class='msgs'><span>"+ data.val().msg+ "</span></div>")   
});
//-----------------
$(".msg-button").on("click", function(event){
    event.preventDefault();
    var msg = $(".msg-input").val().trim();
    if(player1.name != ""){
        var con = database.ref().child("chat/").push({
            msg: player1.name+" : "+msg
            });
        con.onDisconnect().remove();
        
    }else if(player2.name != "") {
        var con = database.ref().child("chat/").push({
             msg: player2.name+" : "+msg
            }); 
        con.onDisconnect().remove();
    }
 $(".msg-input").val("");   
});

//================================= Functions =====================================
function updateChoice1(choice){
    var upd = database.ref().child("Players/1");
    upd.update({
        "choice" : choice
    });
}  
function updateChoice2(choice){
    var upd = database.ref().child("Players/2");
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
};
function updateWins1(result){
    var upd = database.ref().child("Players/1");
    upd.update({
        "wins" : result
    });
} 
function updateLoses1(result){
    var upd = database.ref().child("Players/1");
    upd.update({
        "loses" : result
    });
} 
function updateWins2(result){
    var upd = database.ref().child("Players/2");
    upd.update({
        "wins" : result,
    });
} 
function updateLoses2(result){
    var upd = database.ref().child("Players/2");
    upd.update({
        "loses" : result
    });
} 






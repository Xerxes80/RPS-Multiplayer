var config = {
  apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
  authDomain: "coder-bay-fee9d.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-111d0.firebaseio.com/",
  storageBucket: "coder-bay-fee9d.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();


var player1 = {
    id:1,
    name: "",
    wins: 0,
    loses: 0,
    choice :""
};
var player2 = {
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
var turn = 1;
var connected = 0;
var counter = 0;
//================================= Updating Values =====================================
database.ref().on("value", function(snapshot) {

//    if (snapshot.child("player1").exists() && snapshot.child("player2").exists()) {
//
//    highBidder = snapshot.val().highBidder;
//    highPrice = parseInt(snapshot.val().highPrice);
//
//    $("#highest-bidder").html(snapshot.val().highBidder);
//    $("#highest-price").html("$" + snapshot.val().highPrice);
//
//    console.log(snapshot.val().highBidder);
//    console.log(snapshot.val().highPrice);
//    } else {
//
//    $("#highest-bidder").html(highBidder);
//    $("#highest-price").html("$" + highPrice);
//
//    console.log("Current High Price");
//    console.log(highBidder);
//    console.log(highPrice);
//    };

   // console.log(snapshot.child("Players").val());
    var obj = snapshot.child("Players").val();
    console.log(obj);
    
    
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//    database.ref("Players").on("child_added", function(snapData){
//       // if(snapData.val()){
//            var thePlayer = snapData.val();
//            console.log(snapData.key);
//            $(".comm").text("Hello " + thePlayer.name +"! You are Player" + thePlayer.id);
//      //  }
//    });
//var connectionsRef = database.ref("Players/");
//var connectedRef = database.ref(".info/connected/");
//connectedRef.on("value", function(snap) {
// console.log(connectedRef);
// console.log(connectionsRef);
//    
//});


//var ref = new Firebase('https://rps-multiplayer-111d0.firebaseio.com');
//
//var amandaAgeRef = ref.child("players").child('id');
//
//amandaAgeRef.transaction(function(id) {
//   return id + 1;
//});

    var firstPlayer = database.ref().child("Players") ;
firstPlayer.on("child_added", function(data){
    
    var newPlayer = data.val();
    console.log(newPlayer);
    
//    console.log(newPlayer.name);

//    console.log("id : "+ player1.id );
//   
//    var connec = data.key;
////     console.log(connec);
//     console.log(player2);
    
    //if (player1.id === 1){
    if(player1.name !== "") {
        $(".comm").text("Hello "+player1.name+"! You are Player"+ player1.id);
    }else{
        $(".comm").text("Hello "+player2.name+"! You are Player"+ player2.id);
    }
//    if (amIPlayerOne){
//        $(".comm").text("Hello player 1");
//    } else{
//        $(".comm").text("helo player 2");
//    }
   // console.log("previous player : "+ prevChildKey);
    
});
 
//var firstPlayerRef = database.ref("Players/").limitToFirst(1);
//
//var lastPlayerRef = database.ref('Players/').limitToLast(1);
//
//firstPlayerRef.on("value", function(data) {
//   console.log(data.val());
//}, function (error) {
//   console.log("Error: " + error.code);
//});
//
//lastPlayerRef.on("value", function(data) {
//   console.log(data.val());
//}, function (error) {
//   console.log("Error: " + error.code);
//});

//================================= Functions =====================================


database.ref().child("Players").on("value", function(snap) {
        connected = snap.numChildren();
    console.log("I am: " + connected);
      //  console.log(connected);
    });

$(".btn").on("click", function(event) {
    event.preventDefault();
    
    //player1.name = $(".name-input").val().trim();
    //player2.name = $(".name-input").val().trim();
    $(".name-input").hide();
    $(".btn").hide();
    
//    var connectionsRef = database.ref();
//        
//    var connectedRef = database.ref(".info/connected");
////
//    connectedRef.on("value", function(snap) {
   // console.log(connected);

    if ( connected === 0) {
        player1.name = $(".name-input").val().trim();
        
        var con = database.ref().child("Players").push({
        
            id : player1.id,
            name: player1.name,
            wins: player1.wins,
            loses: player1.loses,
            choice: player1.choice
        
        });  
        con.onDisconnect().remove();
        //amIPlayerOne = false; 
        
    }else if(connected ===1){
        player2.name = $(".name-input").val().trim();
        var con = database.ref().child("Players").push({ 
           
            id : player2.id,
            name: player2.name,
            wins: player2.wins,
            loses: player2.loses,
            choice: player2.choice
           
        });  
        
        con.onDisconnect().remove();
        
    }
    


 //   });
    
//    database.ref().child("Players").on("value", function(snap) {
//        connected = snap.numChildren();
//        console.log(connected);
//    });

});



 

    
   
    
   
        
    
    
    
    
    

    
 
///////////////////////////
//  if (bidderPrice > highPrice) {
//
//
//    alert("You are now the highest bidder.");
//
// 
//    database.ref().set({
//      highBidder: bidderName,
//      highPrice: bidderPrice
//    });
//
//
//    console.log("New High Price!");
//    console.log(bidderName);
//    console.log(bidderPrice);
//
//
//    highBidder = bidderName;
//    highPrice = parseInt(bidderPrice);
//
//    $("#highest-bidder").html(bidderName);
//    $("#highest-price").html("$" + bidderPrice);
//  }
//
//  else {
//
//    alert("Sorry that bid is too low. Try again.");
//  }

//});

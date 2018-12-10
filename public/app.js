// Initialize Firebase
var config = {
  apiKey: "AIzaSyDsqPozRkTAsj0sR4uZjq7TD-v7BclYZCk",
  authDomain: "firebasics-99944.firebaseapp.com",
  databaseURL: "https://firebasics-99944.firebaseio.com",
  projectId: "firebasics-99944",
  storageBucket: "firebasics-99944.appspot.com",
  messagingSenderId: "898950176638"
};


firebase.initializeApp(config);
const db = firebase.firestore();  //firestore database
db.settings({ timestampsInSnapshots: true });

firebase.auth().onAuthStateChanged(function(user) { 
  placeCards();
  if (user) {
    // User is signed in.
    document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
    document.getElementById('loginBut').setAttribute('onclick', 'googleLogout()');  //On a click of the log out button it will call
  } 
  else {
    // No user is signed in.
  }
});





//adds cards index to trunk in firebase
function addCardToTrunk(){
  var user = firebase.auth().currentUser;   //current user
  var cardInd = document.getElementById("card-select").getAttribute("index");     //gets card index 
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {           //gets the document corresponding to users uid
        var trunk = snapshot.data().trunk;                                        //gets the array in trunk field
        if(trunk.includes(cardInd)){                                              //card is already in users trunk
          alert('Card Already in your Trunk');
        }   
        else{                                                                      //card is not in users trunk yet
          trunk.push(cardInd);
          trunk.sort(function(a,b) {return a-b});
          db.collection('users').doc(`${user.uid}`).update({
              "trunk": trunk
          })
        }
    });
}

//adds cards index to deck1 in firebase
function addCardToDeck1(){
  var user = firebase.auth().currentUser;   //current user
  var cardInd = document.getElementById("card-select").getAttribute("index");     //gets card index 
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {           //gets the document corresponding to users uid
        var deck1 = snapshot.data().deck1;                                        //gets the array in deck1 field
        if(deck1.includes(cardInd)){                                              //card is already in users deck1
          alert('Card Already in your deck1');
        }   
        else{                                                                      //card is not in users deck1 yet
          deck1.push(cardInd);
          deck1.sort(function(a,b) {return a-b});
          db.collection('users').doc(`${user.uid}`).update({
              "deck1": deck1
          })
        }
    });
}

//adds cards index to deck2 in firebase
function addCardToDeck2(){
  var user = firebase.auth().currentUser;   //current user
  var cardInd = document.getElementById("card-select").getAttribute("index");     //gets card index 
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {           //gets the document corresponding to users uid
        var deck2 = snapshot.data().deck2;                                        //gets the array in deck2 field
        if(deck2.includes(cardInd)){                                              //card is already in users deck2
          alert('Card Already in your deck2');
        }   
        else{                                                                      //card is not in users deck2 yet
          deck2.push(cardInd);
          deck2.sort(function(a,b) {return a-b});
          db.collection('users').doc(`${user.uid}`).update({
              "deck2": deck2
          })
        }
    });
}

//adds cards index to deck3 in firebase
function addCardToDeck3(){
  var user = firebase.auth().currentUser;   //current user
  var cardInd = document.getElementById("card-select").getAttribute("index");     //gets card index 
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {           //gets the document corresponding to users uid
        var deck3 = snapshot.data().deck3;                                        //gets the array in deck3 field
        if(deck3.includes(cardInd)){                                              //card is already in users deck3
          alert('Card Already in your deck3');
        }   
        else{                                                                      //card is not in users deck3 yet
          deck3.push(cardInd);
          deck3.sort(function(a,b) {return a-b});
          db.collection('users').doc(`${user.uid}`).update({
              "deck3": deck3
          })
        }
    });
}

//adds cards index to desired in firebase
function addCardToDesired(){
  var user = firebase.auth().currentUser;   //current user
  var cardInd = document.getElementById("card-select").getAttribute("index");     //gets card index 
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {           //gets the document corresponding to users uid
        var desired = snapshot.data().desired;                                        //gets the array in desired field
        if(desired.includes(cardInd)){                                              //card is already in users desired
          alert('Card Already in your desired');
        }   
        else{                                                                      //card is not in users desired yet
          desired.push(cardInd);
          desired.sort(function(a,b) {return a-b});
          db.collection('users').doc(`${user.uid}`).update({
              "desired": desired
          })
        }
    });
}










//javascript that corresponds to the decks.html
function placeCards(){
    if(window.location.toString().includes("decks.html")){
        // Add activeD class to the current button (highlight it)
        var header = document.getElementById("btns");
        var btns = header.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function() {
            if (document.querySelector('.activeD') !== null){        //checks if class activeD exists
                var current = header.getElementsByClassName("activeD");
                current[0].className = current[0].className.replace(" activeD", "");
                this.className += " activeD";
            }
            else{
                this.className += " activeD";
            }
          });
        }
    }
    //javascript that corresponds to the trunk html page
    else if(window.location.toString().includes("trunk.html")){
        const user = firebase.auth().currentUser;
        var trunk;
        db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {  //gets the document corresponding to users uid
            trunk = snapshot.data().trunk;                                   //gets the array in trunk field    
            parseJSON(trunk);                                                //calls function to print cards from json file                        
        });
    }
    //javascript corresponding with the desired page 
    else if(window.location.toString().includes("desired.html")){
        const user = firebase.auth().currentUser;
        var desired;
        db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {  //gets the document corresponding to users uid
            desired = snapshot.data().desired;                               //gets the array in desired field    
            parseJSON(desired);                                              //calls function to print cards from json file
        });                                               
    }
    //javascript corresponding to index of home page html file
    else{
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var myObj = JSON.parse(this.responseText);    //parses json file and stores it in myObj
              for(var i = 0; i < myObj.cards.length; ++i){
                  var cardImage = document.createElement('IMG');          //creates <img> tag in html
                  cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
                  cardImage.setAttribute('width', '150');
                  cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');   //onclick function on the image
                  document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
              }
          }
      };
      xmlhttp.open("GET", "cards.json", true);
      xmlhttp.send();


      //for card image pop up
      var modal = document.getElementById('id02');
      window.onclick = function(event){
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    }
}

//intiate card pop up form with card image
function cardDecide(image, i, title, des){
        document.getElementById('id02').style.display = 'block';
        document.getElementById('card-select').setAttribute('src', image);
        document.getElementById('card-select').setAttribute('index', i); //creates attribute index
        document.getElementById('nameOfCard').innerHTML = title;
        document.getElementById('desOfCard').innerHTML = des;
}

//Deck 1
function one(){
    $("#cardImages").empty();
    const user = firebase.auth().currentUser;
    var deck1;
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {  //gets the document corresponding to users uid
        deck1 = snapshot.data().deck1;                               //gets the array in deck1 field    
        parseJSON(deck1);                                              //calls function to print cards from json file
    }); 
}

//Deck 2
function two(){
    $("#cardImages").empty();
    const user = firebase.auth().currentUser;
    var deck2;
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {  //gets the document corresponding to users uid
        deck2 = snapshot.data().deck2;                               //gets the array in deck2 field    
        parseJSON(deck2);                                              //calls function to print cards from json file
    });
}

//Deck 3
function three(){
    $("#cardImages").empty();
    const user = firebase.auth().currentUser;
    var deck3;
    db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {  //gets the document corresponding to users uid
        deck3 = snapshot.data().deck3;                               //gets the array in deck3 field    
        parseJSON(deck3);                                              //calls function to print cards from json file
    });
}


//Parsing and printing out cards from json file
function parseJSON(arr){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for(var i = 0; i < arr.length; ++i){
                var cardImage = document.createElement('IMG');                  //creates <img> tag in html
                cardImage.setAttribute('src', myObj.cards[arr[i]].imageUrl);  //image path
                cardImage.setAttribute('width', '150');
                //cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');   //onclick function on the image
                document.getElementById('cardImages').appendChild(cardImage);   //puts <img with path> into the ID with cardImages
            }
        }
    };
    xmlhttp.open("GET", "cards.json", true);
    xmlhttp.send();
}
















document.addEventListener("DOMContentLoader", event => {
  const app = firebase.app();
  console.log(app)
});

function newUser(user){
  const newUse = db.collection('users').doc(`${user.uid}`);

  newUse.get()
    .then((docSnapshot) => {
      if (!(docSnapshot.exists)) {
          newUse.set({
              trunk: [],
              deck1: [],
              deck2: [],
              deck3: [],
              desired: []
          }) // create the document if it's a new user
      } 
      /*else {
          newUse.onSnapshot((doc) => {
              // do stuff with the data
          });
      }*/
  });
}





function googleLogin(){
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider) //this is what actually signs people in 
          
          .then(result => {                               //this displays hello to the user who just signed in
              const user = result.user;
              //document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`;
              document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
              document.getElementById('loginBut').setAttribute('onclick', 'googleLogout()');  //On a click of the log out button it will call
              newUser(user);
          } )
          .catch(console.log)
}


function googleLogout(){
  firebase.auth().signOut().then(function() { //signs user out
      // Sign-out successful.

      //document.getElementById('welcome').innerHTML = `Welcome to YuGiOh Card Collector`;  //After log out it will display OG greeting
      document.getElementById('loginBut').innerHTML = "Log in with google";               //Changes the button back to user login
      document.getElementById('loginBut').setAttribute('onclick', 'googleLogin()');       //On a click of the button calls googleLogin function
      if(window.location.toString().includes("firebasics-99944.firebaseapp")){
          window.location.replace("https://firebasics-99944.firebaseapp.com");
      }
      else if(window.location.toString().includes("localhost")){
          window.location.replace("http://localhost:5000/");
      }
    }).catch(function(error) {
      // An error happened.
    });
}

function TabSwitch(){

var user = firebase.auth().currentUser;

if(user){
      document.getElementById("trunkHRef").setAttribute('href', 'trunk.html');
      document.getElementById("decksHRef").setAttribute('href', 'decks.html');
      document.getElementById("desiredHRef").setAttribute('href', 'desired.html');
}

else{
  alert("Please log in before leaving All Cards");
}

}



















/*

Filters


*/


var xmlhttp = new XMLHttpRequest();
var myObj;
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
  }
};
xmlhttp.open("GET", "cards.json", true);
xmlhttp.send();	


//Updates Cards based on Search Filter and Type Filter
function updateFilter(search) { 
  //alert(search=="" || search==null); //Tester that returns true if the search bar is either empty or null
  var zone = document.getElementById("selectCards");
  
  //If allCards is selected as filter
  if(zone.value == "allCards"){
    alert("You clicked allCards");
    $("#cardImages").empty();

    if(search=="" || search==null){ //No input on search
      for(var i = 0; i < 7986; ++i){
        var cardImage = document.createElement('IMG');			//creates <img> tag in html
        cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
        cardImage.setAttribute('width', '150');
        cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
        document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
      }
    }
    else{ //Input on search
      for(var i = 0; i < 7986; ++i){
        var cardTitle = myObj.cards[i].title;
        if (cardTitle.includes(search)){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  }
  //If Trap, Monster, or Spell is selected as filter
  else{ 
    $("#cardImages").empty();
    if(search=="" || search==null){//No input on search
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        if(cardType == zone.value){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
    else{ //Input on search
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        var cardTitle = myObj.cards[i].title;
        if(cardType == zone.value && cardTitle.includes(search)){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  }
}

function SearchCards(){
  var input, filter;

  input = document.getElementById("myInput");
  filter = input.value;
  console.log(filter);

  updateFilter(filter);
}
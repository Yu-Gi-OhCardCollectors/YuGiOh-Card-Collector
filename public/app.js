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
    var reg = document.getElementById('register');
    if (user) {
      // User is signed in.
      document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
      document.getElementById('loginBut').setAttribute('onclick', 'logout()');  //On a click of the log out button it will call
      document.getElementById('welcome').innerHTML = firebase.auth().currentUser.email;
      document.getElementById('id01').style.display='none'
  
      while (reg.hasChildNodes()) {
          reg.removeChild(reg.lastChild);
      }
      var node = document.createElement("BUTTON");
      node.innerHTML = "Logout";
      node.addEventListener ("click", function() {
          logout();
        });
      
      document.getElementById('register').appendChild(node);
    } 
    else {
      // No user is signed in.
      
      while (reg.hasChildNodes()) {
         reg.removeChild(reg.lastChild);
        }
      var node = document.createElement("BUTTON");
      node.innerHTML = "Login";
      node.setAttribute('onclick', document.getElementById('id01').style.display='block');
      node.addEventListener ("click", function() {
          document.getElementById('id01').style.display='block'
        });
      reg.appendChild(node);
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
          db.collection('users').doc(`${user.uid}`).update({
              "desired": desired
          })
        }
    });
}










//javascript that corresponds to the decks.html
function placeCards(){
    if(window.location.toString().includes("decks.html")){
        const user = firebase.auth().currentUser;
        var trunk;
        db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {             //gets the document corresponding to users uid
            trunk = snapshot.data().trunk;                                              //gets the array in trunk field    
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myObj = JSON.parse(this.responseText);                          //parses json file and stores it in myObj
                    for(var i = 0; i <= trunk.length-1; ++i){
                        var cardImage = document.createElement('IMG');                  //creates <img> tag in html
                        cardImage.setAttribute('src', myObj.cards[trunk[i]].imageUrl);  //image path
                        cardImage.setAttribute('width', '150');
                        cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');   //onclick function on the image
                        document.getElementById('cardImages').appendChild(cardImage);   //puts <img with path> into the ID with cardImages
                    }
                }
            };
            xmlhttp.open("GET", "cards.json", true);
            xmlhttp.send();
        });


      // Add activeD class to the current button (highlight it)
      var header = document.getElementById("btns");
      var btns = header.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          if (document.querySelector('.activeD') !== null){        //checks if class activeD exists
              deleteImages();
              var current = header.getElementsByClassName("activeD");
              current[0].className = current[0].className.replace(" activeD", "");
              this.className += " activeD";
          }
          else{
              deleteImages();
              this.className += " activeD";
          }
        });
      }
    }
    //javascript that corresponds to the trunk html page
    else if(window.location.toString().includes("trunk.html")){
        const user = firebase.auth().currentUser;
        var trunk;
        db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {             //gets the document corresponding to users uid
            trunk = snapshot.data().trunk;                                              //gets the array in trunk field    
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    for(var i = 0; i <= trunk.length-1; ++i){
                        var cardImage = document.createElement('IMG');                  //creates <img> tag in html
                        cardImage.setAttribute('src', myObj.cards[trunk[i]].imageUrl);  //image path
                        cardImage.setAttribute('width', '150');
                        cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');   //onclick function on the image
                        document.getElementById('cardImages').appendChild(cardImage);   //puts <img with path> into the ID with cardImages
                    }
                }
            };
            xmlhttp.open("GET", "cards.json", true);
            xmlhttp.send();
        });
    }
    //javascript corresponding with the desired page 
    else if(window.location.toString().includes("desired.html")){
        const user = firebase.auth().currentUser;
        var desired;
        db.collection('users').doc(`${user.uid}`).get().then((snapshot)=> {             //gets the document corresponding to users uid
            desired = snapshot.data().desired;                                              //gets the array in desired field    
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myObj = JSON.parse(this.responseText);                          //parses json file and stores it in myObj
                    for(var i = 0; i <= desired.length-1; ++i){
                        var cardImage = document.createElement('IMG');                  //creates <img> tag in html
                        cardImage.setAttribute('src', myObj.cards[desired[i]].imageUrl);  //image path
                        cardImage.setAttribute('width', '150');
                        cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');   //onclick function on the image
                        document.getElementById('cardImages').appendChild(cardImage);   //puts <img with path> into the ID with cardImages
                    }
                }
            };
            xmlhttp.open("GET", "cards.json", true);
            xmlhttp.send();
        });                                               
    }
    //javascript corresponding to index of home page html file
    else{
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var myObj = JSON.parse(this.responseText);    //parses json file and stores it in myObj
              for(var i = 0; i < 7986; ++i){
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

//delete the images so that the website will print out the correct deck
function deleteImages(){
    var div = document.getElementById("cardImages"); //div where card images are being printed
    var img = div.getElementsByClassName("cardImg"); //put all images in a list
    for(var i = 0; i < img.length; ++i){
        div.removeChild(div.childNodes[i]);         //delete images from div
    }
    $("#cardImages").empty();
}

//Deck 1
function one(){
    alert("Switching to deck 1");
    placeImages("deck1");
}

//Deck 2
function two(){
    alert("Switching to deck 2");
    placeImages("deck2");
}

//Deck 3
function three(){
    alert("Switching to deck 3");
    placeImages("deck3");
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
              document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`;
              document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
              document.getElementById('loginBut').setAttribute('onclick', 'googleLogout()');  //On a click of the log out button it will call
              newUser(user);
          } )
          .catch(console.log)
}

function login(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
        "Sorry, error in login."
        // writes an error message to the user in a pop up.
    });
}


function logout(){
    firebase.auth().signOut().then(function() { //signs user out
        // Sign-out successful.
  
        document.getElementById('welcome').innerHTML = `Welcome to YuGiOh Card Collector`;  //After log out it will display OG greeting
        document.getElementById('loginBut').innerHTML = "Login";               //Changes the button back to user login
        document.getElementById('loginBut').setAttribute('onclick', 'googleLogin()');       //On a click of the button calls googleLogin function
        if(window.location.toString().includes("firebasics-99944.firebaseapp")){
            window.location.replace("https://firebasics-99944.firebaseapp.com");
        }
        else if(window.location.toString().includes("localhost")){
            window.location.replace("http://localhost:5000/");
        }
      }).catch(function(error) {
        message.innerHTML = "Input is " + error;
      });
}

function signup(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
        "Sorry, this username is already taken."
        // writes an error message to the user in a pop up.
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
  alert(search=="" || search==null); //Tester that returns true if the search bar is either empty or null
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
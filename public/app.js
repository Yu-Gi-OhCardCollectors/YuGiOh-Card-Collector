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

firebase.auth().onAuthStateChanged(function(user) { 
  if (user) {
    // User is signed in.
    document.getElementById('welcome').innerHTML = `Welcome to YuGiOh Card Collector ${user.displayName}`; //Changes header to included users email name

    document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
    document.getElementById('loginBut').setAttribute('onclick', 'googleLogout()');  //On a click of the log out button it will call

    if(user != null){

      var email_id = user.email;
      //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.
    document.getElementById('welcome').innerHTML = "Welcome to YuGiOh Card Collector";  
  }
});


/*
db.settings({timestampsInSnapshots: true});
db.collection('users').get().then((snapshot)=> {
  snapshot.docs.forEach(doc => {
      console.log(doc.data().deck1[1]);
  })
});  //gets documents


function addCardToTrunk(){
  const user = firebase.auth().currentUser;
  var cards = db.collection('users').doc(`${user.uid}`).deck1;
  console.log(cards[0]);

  var docRef = db.collection('users').doc(`${user.uid}`);

  docRef.get().then(function(doc) {
      if (doc.exists) {
          doc.update(docRef, {deck1: })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}*/







//javascript that corresponds to the decks.html
if(window.location.toString().includes("decks.html")){
  const user = firebase.auth().currentUser;
  
  /*if(user == null){       //prevents user from going onto page from the beginning not logged in
      window.location.replace("http://localhost:5000/"); This is good idead to stop people fromtyping in the URL. For now is kinda causing problems so I commented
  }*/                                                 // it out. LogOut redirects to home page and my TabSwitch() function will not let a non-user switch pages.
                                                      // Will come back to fix 
  //Places Card Images
  function placeImages(deck){   
      //for(var i = 0; i < 1; ++i){
          var cardImage = document.createElement('IMG');          //creates <img> tag in html
          cardImage.setAttribute('src', 'images/'+deck+'/card0.jpg');  //image path
          cardImage.setAttribute('class', 'cardImg');  //sets class to each image
          cardImage.setAttribute('width', '150');
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
      //}
  }

  //delete the images so that the website will print out the correct deck
  function deleteImages(){
      var div = document.getElementById("cardImages"); //div where card images are being printed
      var img = div.getElementsByClassName("cardImg"); //put all images in a list
      for(var i = 0; i < img.length; ++i){
          div.removeChild(div.childNodes[i]);         //delete images from div
      }
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

  /*if(user == null){       //prevents user from going onto page from the beginning not logged in
      window.location.replace("http://localhost:5000/");This is good idead to stop people fromtyping in the URL. For now is kinda causing problems so I commented
  }*/                                                 // it out. LogOut redirects to home page and my TabSwitch() function will not let a non-user switch pages.
                                                      // Will come back to fix 

  //Places card Images similar to other function
  function placeImagesTrunk(){
      for(var i = 0; i < 2; ++i){
          var cardImage = document.createElement('IMG');
          cardImage.setAttribute('src', 'images/card'+i+'.jpg');
          cardImage.setAttribute('width', '150');
          document.getElementById('cardImages').appendChild(cardImage);
      }
  }
  placeImagesTrunk();
}
//javascript corresponding with the desired page 
else if(window.location.toString().includes("desired.html")){
  const user = firebase.auth().currentUser;
  
  /*if(user == null){       //prevents user from going onto page from the beginning not logged in
      window.location.replace("http://localhost:5000/");This is good idead to stop people fromtyping in the URL. For now is kinda causing problems so I commented
    }*/                                                 // it out. LogOut redirects to home page and my TabSwitch() function will not let a non-user switch pages.
                                                        // Will come back to fix 

                                                        
}
//javascript corresponding to index of home page html file
else{
  //place card images using json file
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

  //intiate card pop up form with card image
  function cardDecide(image, i, title, des){
          document.getElementById('id02').style.display = 'block';
          document.getElementById('card-select').setAttribute('src', image);
          document.getElementById('card-select').setAttribute('index', i); //creates attribute index
          document.getElementById('nameOfCard').innerHTML = title;
          document.getElementById('desOfCard').innerHTML = des;
  }

  //for card image pop up
  var modal = document.getElementById('id02');
  window.onclick = function(event){
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
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


function googleLogout(){
  firebase.auth().signOut().then(function() { //signs user out
      // Sign-out successful.

      document.getElementById('welcome').innerHTML = `Welcome to YuGiOh Card Collector`;  //After log out it will display OG greeting
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


function updateFilter() { 

  var zone = document.getElementById("selectCards");

if(zone.value == "allCards"){
  
  alert("You clicked allCards");
  $("#cardImages").empty();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        
      }
    }
  };
  xmlhttp.open("GET", "cards.json", true);
  xmlhttp.send();	
}

  else if (zone.value == "Monster"){

  alert("You clicked Monster");
  $("#cardImages").empty();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        if(cardType == "Monster"){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  };
  xmlhttp.open("GET", "cards.json", true);
  xmlhttp.send();	
}

else if(zone.value == "Spell"){

  alert("You clicked Spell");

  $("#cardImages").empty();


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        if(cardType == "Spell"){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  };
  xmlhttp.open("GET", "cards.json", true);
  xmlhttp.send();	
}

else if(zone.value == "Trap"){

  alert("You clicked Trap");
  
  $("#cardImages").empty();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
      for(var i = 0; i < 7986; ++i){
        var cardType = myObj.cards[i].type;
        if(cardType == "Trap"){
          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  };
  xmlhttp.open("GET", "cards.json", true);
  xmlhttp.send();	
}
}

function SearchCards(){
  var input, filter;


  input = document.getElementById("myInput");
  filter = input.value;
  console.log(filter);


  $("#cardImages").empty();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {


      var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
      for(var i = 0; i < 7986; ++i){
        var cardTitle = myObj.cards[i].title;
        
        if( cardTitle.includes(filter) ){

          var cardImage = document.createElement('IMG');			//creates <img> tag in html
          cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
          cardImage.setAttribute('width', '150');
          cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
          document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
        }
      }
    }
  };
  xmlhttp.open("GET", "cards.json", true);
  xmlhttp.send();

}
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`; //Changes header to included users email name

      var user = firebase.auth().currentUser;
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




  // Get a reference to the database service
  //var database = firebase.database();
  //firebase.database().ref('users/' + userId)









//javascript that corresponds to the decks.html
if(window.location.toString().includes("decks.html")){
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


















function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider) //this is what actually signs people in 
            
            .then(result => {                               //this displays hello to the user who just signed in
                const user = result.user;
                document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`;
                document.getElementById('loginBut').innerHTML = "Log out";  //This will replace the login button with a log out one
                document.getElementById('loginBut').setAttribute('onclick', 'googleLogout()');  //On a click of the log out button it will call
                                                                                                //the googleLogout function
                console.log(user)
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
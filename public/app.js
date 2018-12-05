

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

document.addEventListener("DOMContentLoader", event => {
    const app = firebase.app();
    console.log(app)
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`;
      document.getElementById("logout").style.display = "block";
      document.getElementById("login").style.display = "none";
      //document.getElementById("user_div").style.display = "block";
      //document.getElementById("login_div").style.display = "none";

  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
      document.getElementById('welcome').innerHTML = "Welcome to YuGiOh Card Collector";
      document.getElementById("login").style.display = "block";
      document.getElementById("logout").style.display = "none";
  
    }
  });


function googleLogin(){
    alert("Logging In"); //an alert to let us know the function was called
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider) //this is what actually signs people in 
            
            .then(result => {                               //this displays hello to the user who just signed in
                const user = result.user;
                


                console.log(user)
            } )
            .catch(console.log)
}


function googleLogout(){
    alert("Sign out");  //an alert to let us know the function was called

    firebase.auth().signOut().then(function() { //signs user out
    
        
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
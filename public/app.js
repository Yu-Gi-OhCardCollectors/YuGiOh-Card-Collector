var config = {
    apiKey: "AIzaSyB3oUvB1QikK3UWahKGjoSmKjEhC4mDvGQ",
    authDomain: "yugiohcards-7dd7d.firebaseapp.com",
    databaseURL: "https://yugiohcards-7dd7d.firebaseio.com",
    projectId: "yugiohcards-7dd7d",
    storageBucket: "yugiohcards-7dd7d.appspot.com",
    messagingSenderId: "314192197528"
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
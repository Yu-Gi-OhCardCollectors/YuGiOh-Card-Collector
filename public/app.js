document.addEventListener("DOMContentLoader", event => {
    const app = firebase.app();
    console.log(app)
});



function googleLogin(){
    alert("hello world");
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
    alert("Sign out");  //an alert to let us know the function was called

    firebase.auth().signOut().then(function() { //signs user out
        // Sign-out successful.

        document.getElementById('welcome').innerHTML = `Welcome to YuGiOh Card Collector`;  //After log out it will display OG greeting
        document.getElementById('loginBut').innerHTML = "Log in with google";               //Changes the button back to user login
        document.getElementById('loginBut').setAttribute('onclick', 'googleLogin()');       //On a click of the button calls googleLogin function
        
      }).catch(function(error) {
        // An error happened.
      });
}
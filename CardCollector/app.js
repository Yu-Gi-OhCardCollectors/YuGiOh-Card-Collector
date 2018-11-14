document.addEventListener("DOMContentLoader", event => {
    const app = firebase.app();
    console.log(app)
});



function googleLogin(){
    //alert("hello world");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider) //this is what actually signs people in

            .then(result => {                               //this displays hello to the user who just signed in
                const user = result.user;
                document.write(`Hello ${user.displayName}`);
                console.log(user)
            } )
            .catch(console.log)
}


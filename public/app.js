document.addEventListener("DOMContentLoader", event => {
    const app = firebase.app();
    console.log(app)
});



function googleLogin(){
    alert("hello world");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider) //this is what actually signs people in 
            //const user = result.user;
            //document.getElementById('welcome').innerHTML = "welcome "+${user.displayName};
            .then(result => {                               //this displays hello to the user who just signed in
                const user = result.user;
                document.getElementById('welcome').innerHTML = `Welcome ${user.displayName}`;
                document.getElementById('register').innerHTML = 'Signout';
                //document.write(`Hello ${user.displayName}`);
                console.log(user)
            } )
            .catch(console.log)
}


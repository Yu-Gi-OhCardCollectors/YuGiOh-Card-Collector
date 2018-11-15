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
                document.getElementById('register').removeChild(document.getElementById('loginBut'));
                var profImg = document.createElement('IMG');
                profImg.setAttribute('src', "sp.jpg");
                profImg.setAttribute('width', 50);
                profImg.setAttribute('height', 50);
                
                document.getElementById('register').appendChild(profImg);
                //document.write(`Hello ${user.displayName}`);
                console.log(user);
            } )
            .catch(console.log);
}


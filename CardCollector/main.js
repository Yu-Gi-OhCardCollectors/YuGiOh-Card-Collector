//place card images using json file
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
        for(var i = 0; i < 8000; ++i){
			var cardImage = document.createElement('IMG');			//creates <img> tag in html
			cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
			cardImage.setAttribute('width', '150');
			document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
		}
    }
};
xmlhttp.open("GET", "cards.json", true);
xmlhttp.send();

//for sign up pop up
var modal = document.getElementById('id01');
window.onclick = function(event){
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

//for login pop up
var modal = document.getElementById('id02');
window.onclick = function(event){
	if (event.target == modal) {
		modal.style.display = "none";
	}
}



function userInfoCheck(){
	const email = document.getElementById('email').value;		//gets value of email
	const pass = document.getElementById('pass').value;		//gets value of passwords
	const passrep = document.getElementById('passrep').value;	//gets value of repeated passwords
	submit = "True";
	if(pass != passrep){
		alert("passwords must be the same");
		submit = "False";
	}
	if(submit == "False"){
		return false;
	}
}

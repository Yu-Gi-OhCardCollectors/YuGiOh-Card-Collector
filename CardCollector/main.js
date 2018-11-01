//Places Card Images
function placeImages(){   
	for(var i = 0; i < 5; ++i){
		var cardImage = document.createElement('IMG');			//creates <img> tag in html
		cardImage.setAttribute('src', 'images/card'+i+'.jpg');  //image path
		cardImage.setAttribute('width', '150');
		document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
	}
}
placeImages();



var modal = document.getElementById('id01');
window.onclick = function(event){
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

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
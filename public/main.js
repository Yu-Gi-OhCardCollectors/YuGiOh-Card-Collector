//place card images using json file
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
        for(var i = 0; i < 7986; ++i){
			var cardBtn = document.createElement('BUTTON');
			cardBtn.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+')');
				var cardImage = document.createElement('IMG');			//creates <img> tag in html
				cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
				cardImage.setAttribute('width', '150');
				cardBtn.appendChild(cardImage);
				document.getElementById('cardImages').appendChild(cardBtn); //puts <img with path> into the ID with cardImages
		}
    }
};
xmlhttp.open("GET", "cards.json", true);
xmlhttp.send();

function cardDecide(image, i){
		document.getElementById('id02').style.display = 'block';
		document.getElementById('card-select').setAttribute('src', image);
}


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


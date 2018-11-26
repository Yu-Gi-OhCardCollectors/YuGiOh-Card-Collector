//place card images using json file
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
        for(var i = 0; i < 7986; ++i){
			var cardImage = document.createElement('IMG');			//creates <img> tag in html
			cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
			cardImage.setAttribute('width', '150');
			cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+',"'+myObj.cards[i].title+'","'+myObj.cards[i].lore+'")');	//onclick function on the image
			document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
		}
    }
};
xmlhttp.open("GET", "cards.json", true);
xmlhttp.send();

function cardDecide(image, i, title, des){
		document.getElementById('id02').style.display = 'block';
		document.getElementById('card-select').setAttribute('src', image);
		document.getElementById('card-select').setAttribute('index', i); //creates attribute index
		document.getElementById('nameOfCard').innerHTML = title;
		document.getElementById('desOfCard').innerHTML = des;
		
}

function GetCardIndex(){
	alert(document.getElementById('card-select').getAttribute('index')); //returns card index in an alert, could use this for Austins database idea
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


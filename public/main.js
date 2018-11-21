//place card images using json file
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);	  //parses json file and stores it in myObj
        for(var i = 0; i < 7986; ++i){
			var cardImage = document.createElement('IMG');			//creates <img> tag in html
			cardImage.setAttribute('src', myObj.cards[i].imageUrl);  //image path
			cardImage.setAttribute('width', '150');
			cardImage.setAttribute('onclick', 'cardDecide("'+myObj.cards[i].imageUrl+'",'+i+')');	//onclick function on the image
			document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
		}
    }
};
xmlhttp.open("GET", "cards.json", true);
xmlhttp.send();

//intiate card pop up form with card image
function cardDecide(image, i){
		document.getElementById('id02').style.display = 'block';
		document.getElementById('card-select').setAttribute('src', image);
}

//for card image pop up
var modal = document.getElementById('id02');
window.onclick = function(event){
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

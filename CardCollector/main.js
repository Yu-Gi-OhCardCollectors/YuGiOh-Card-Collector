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

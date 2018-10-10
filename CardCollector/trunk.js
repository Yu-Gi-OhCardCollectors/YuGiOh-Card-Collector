//Places card Images similar to other function
function placeImagesTrunk(){
	for(var i = 0; i < 2; ++i){
		var cardImage = document.createElement('IMG');
		cardImage.setAttribute('src', 'images/card'+i+'.jpg');
		cardImage.setAttribute('width', '150');
		document.getElementById('cardImages').appendChild(cardImage);
	}
}
placeImagesTrunk();
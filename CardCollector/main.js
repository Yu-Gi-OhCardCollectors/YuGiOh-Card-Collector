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

//Deck 1
function one(){

}

//Deck 2
function two(){

}

//Deck 3
function three(){

}

// Add active class to the current button (highlight it)
//still needs work but it's supposed to cycle between what deck is chosen to be viewed
var header = document.getElementById("btns");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = header.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
//Places Card Images
function placeImages(deck){   
	for(var i = 0; i < 1; ++i){
		var cardImage = document.createElement('IMG');			//creates <img> tag in html
		cardImage.setAttribute('src', 'images/'+deck+'/card0.jpg');  //image path
		cardImage.setAttribute('class', 'cardImg');  //sets class to each image
		cardImage.setAttribute('width', '150');
		document.getElementById('cardImages').appendChild(cardImage); //puts <img with path> into the ID with cardImages
	}
}

//delete the images so that the website will print out the correct deck
function deleteImages(){
	var div = document.getElementById("cardImages"); //div where card images are being printed
	var img = div.getElementsByClassName("cardImg"); //put all images in a list
	for(var i = 0; i < img.length; ++i){
		div.removeChild(div.childNodes[i]);			//delete images from div
	}
}


//Deck 1
function one(){
	alert("Switching to deck 1");
	placeImages("deck1");
}

//Deck 2
function two(){
	alert("Switching to deck 2");
	placeImages("deck2");
}

//Deck 3
function three(){
	alert("Switching to deck 3");
	placeImages("deck3");
}


// Add activeD class to the current button (highlight it)
var header = document.getElementById("btns");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  	if (document.querySelector('.activeD') !== null){	     //checks if class activeD exists
  		deleteImages();
    	var current = header.getElementsByClassName("activeD");
    	current[0].className = current[0].className.replace(" activeD", "");
    	this.className += " activeD";
    }
    else{
    	deleteImages();
    	this.className += " activeD";
    }
  });
}
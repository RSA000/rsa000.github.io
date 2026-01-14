
/* Not sure, could be special cases for button pressing */
/*
var control = function(ev) {
	switch(ev.which) {
		case 13: alert("A"); break;
		case 37: alert("left"); break;
		case 38: alert("up"); break;
		case 39: alert("right"); break;
		case 40: alert("down"); break;
	}
};
*/


(function(){
	/*The DEFAULT variable is displayed when no menu items on the lower screen are hovered over. */
	var DEFAULT = 'img/MainMenu.jpg';
	
	/*This function continuously scrolls the screen to the 40,215 coordinates */
	var center = function(){
		/* Coordinates to set to */
		window.scrollTo({
			top: 40,
			left: 215,
			behavior: "instant",
		}, 0);
	};
	
	/* Not sure */
	var init = function(anchors) {
		var link;
		for(var i = 0, l = anchors.length; i<l; i++){
			link = anchors[i].href;
			anchors[i].style.background = "url("+link+")";
		}
	};
	
	/* Display image when menu item is selected */
	var active = function(ev) {
		var top = document.getElementById("upperScreen");
		var value = this.getAttribute('description');
		top.style.background = "url("+value+")";
	};
	
	/* Function for setting top screen when inactive */
	var inactive = function(ev) {
		/* Store html element "upperScreen in variable "upperScreen" */
		var upperScreen = document.getElementById("upperScreen");
		/* Set upperScreens background to default image url file */
		upperScreen.style.background = "url("+DEFAULT+")";
	};

	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {
		/* Call center function every 100 miliseconds*/
		setInterval(center, 1);

		/* Store anchors of jpeg and mpo type in respective variables */
		var jpgAnchors = this.querySelectorAll("#lowerScreen a[href$='.jpg']");
		var mpoAnchors = this.querySelectorAll("#lowerScreen a[href$='.mpo']");
		init(jpgAnchors);
		inactive();
		for(var i = 0, l = jpgAnchors.length; i<l; i++){
			jpgAnchors[i].addEventListener('focus', active, false);
			jpgAnchors[i].addEventListener('blur', inactive, false);

		}
		init(mpoAnchors);
		inactive();
		for(var i = 0, l = mpoAnchors.length; i<l; i++){
			mpoAnchors[i].addEventListener('focus', active, false);
			mpoAnchors[i].addEventListener('blur', inactive, false);
		}
	}, false);

})()

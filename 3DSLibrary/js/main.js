
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
	var forcePosition = true;
	
	/*This function continuously scrolls the screen to the 40,215 coordinates */
	var center = function(){
		/* Scroll to designated coordinates */
		/*
		window.scrollTo({
			top: 40,
			left: 215,
			behavior: "instant",
		});
		*/
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
		var top = document.getElementById("upperScreenHome");
		var value = this.getAttribute('description');
		top.style.background = "url("+value+")";
	};
	
	/* Function for setting top screen when inactive */
	var inactive = function(ev) {
		/* Store html element "upperScreen in variable "upperScreenHome" */
		var upperScreen = document.getElementById("upperScreenHome");
		/* Set upperScreens background to default image url file */
		/* upperScreen.style.background = "url("+DEFAULT+")"; */
	};

	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {
		/* Call center function every milisecond*/
		setInterval(center, 1);
	}, false);


})()

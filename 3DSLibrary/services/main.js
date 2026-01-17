
/*
* This is an immediately invoked function expression.
* This means that after this function is created it will immediately run.
* All variables are within the functions scope and not the main programs global scope;
* this is a means of encapsulating data.
*/
(function(){

	/* The center function scrolls the screen to the 40,215 coordinates */
	var center = function(){
		// Scroll to designated coordinates
		window.scrollTo(40,215);
	};


	var init = function(anchors) {
		var link;
		for(var i = 0, l = anchors.length; i<l; i++){
			link = anchors[i].href;
			anchors[i].style.background = "url("+link+")";
		}
	};


	var active = function(ev) {
		var top = document.getElementById("top");
		var value = this.style.background;
		top.style.background = value;
	};


	var inactive = function(ev) {
		var top = document.getElementById("top");
		top.style.background = "url("+DEFAULT+")";
	};



	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {

		// Call center function every milisecond
		setInterval(center, 4);

	}, false);
})()

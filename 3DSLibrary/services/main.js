
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

	var active = function(ev) {
		// get top screen Heading and subtitles and store in variables.
		var topHeading = document.getElementById("topHeading");
		var topSubtitle = document.getElementById("topSubtitle");
		// Get innerHTML and description attributes of current element.
		var headingValue = this.innerHTML;
		var subtitleValue = this.getAttribute("description");
		// Update innerHTML of top heading and subtitle to heading and subtitle values.
		topHeading.innerHTML = headingValue;
		topSubtitle.innerHTML = subtitleValue;
	};

	/*Function returns title to original message when no items are selected */
	var inactive = function(ev) {
		var topHeading = document.getElementById("topHeading");
		var topSubtitle = document.getElementById("topSubtitle");
		topHeading.innerHTML = "Welcome to the New 3DS Library";

	};


	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {
		// Call center function every milisecond
		setInterval(center, 4);
		// Store all <a> tags within the "lowerScreenMenu" div in variable "anchors"
		var anchors = this.querySelectorAll("#lowerScreenMenu a");
		inactive();
		for(var i = 0, l = anchors.length; i<l; i++){
			anchors[i].addEventListener('focus', active, false);
			anchors[i].addEventListener('blur', inactive, false);
		}
	}, false);

})()

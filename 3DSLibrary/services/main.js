
/*
* This is an immediately invoked function expression.
* This means that after this function is created it will immediately run.
* All variables are within the functions scope and not the main programs global scope;
* this is a means of encapsulating data.
*/
(function(){

	/* The center function scrolls the screen to the 40,215 coordinates.*/
	var center = function(){
		// Scroll to designated coordinates.
		window.scrollTo(40,215);
	};


	/* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
	var active = function(ev) {
		// get top screen Heading and subtitles and store in variables.
		var topHeading = document.getElementsByClassName("topHeading")[0];
		var topSubtitle = document.getElementsByClassName("topSubtitle")[0];
		// Get innerHTML and description attributes of current element.
		var headingValue = this.innerHTML;
		var subtitleValue = this.getAttribute("description");
		// Update innerHTML of top heading and subtitle to heading and subtitle values.
		topHeading.innerHTML = headingValue;
		topSubtitle.innerHTML = subtitleValue;
	};


	/*Function returns title to original message when no items are selected. */
	var inactive = function(ev) {
		// Get top heading and subtitle tags (<h1> and <p>, respectively).
		var topHeading = document.getElementsByClassName("topHeading")[0];
		var topSubtitle = document.getElementsByClassName("topSubtitle")[0];
		// Update heading and subtitle.
		topHeading.innerHTML = "Welcome to the New 3DS Library";
		topSubtitle.innerHTML = "By RSA000";
	};




	/* When content is loaded. */
	document.addEventListener('DOMContentLoaded', function(ev) {

		// If the user agent does not contain "Nintendo 3DS"
		if(navigator.userAgent.indexOf("Nintendo 3DS") == -1) {
			// Set body style to grid display.
			document.body.style.display = 'grid';
			// Set content to center.
			document.body.style.justifyContent = 'center';
		}
		// Otherwise,
		else{
			// Call center function every miliseconds.
			setInterval(center, 4);
		}


		// Store all <a> tags within the "lowerScreenMenu" div in variable "anchors."
		var anchors = this.querySelectorAll(".lowerScreenMenu a");
		inactive();
		// For each anchor, add event listener.
		for(var i = 0, l = anchors.length; i<l; i++){
			// When focused on, apply active function with "this" selected anchor.
			anchors[i].addEventListener('focus', active, false);
			// When no anchors are selected, revert to greeting heading and subtitle.
			anchors[i].addEventListener('blur', inactive, false);
		}
	}, false);

})()


/*
* This is an immediately invoked function expression.
* This means that after this function is created it will immediately run.
* All variables are within the functions scope and not the main programs global scope;
* this is a means of encapsulating data.
*/
(function(){


	/* The changeHeader function changes the top screen's header text. */
	var changeHeader = function(newHeading){
		document.getElementById("topHeading").innerHTML = newHeading;
	};

	/* Change substitle paragraph under heading of top screen. */
	var changeSubtitle = function(newSubtitle){
			document.getElementById("topSubtitle").innerHTML = newSubtitle;
	};


	/* This initiateLinks function add necessary listeners to each link on the page */
	var initiateLinks = function(){
		// Save all <a> tags in variable "links"
		var links = document.querySelectorAll('a');

		// For each <a> tag element in links:
		links.forEach(function(link) {
			// When selected with keyboard (tab or 3DS d-pad):
			link.addEventListener('focus', function(e) {
				// Change header based on link text
				changeHeader(this.innerText);
				changeSubtitle(this.getAttribute('description'));
			});
		});
	}


	/* The center function scrolls the screen to the 40,215 coordinates */
	var center = function(){
		// Scroll to designated coordinates
		window.scrollTo(40,215);
	};




	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {

		// Add event listeners to links
		initiateLinks();

		// Call center function every milisecond
		setInterval(center, 1);

	}, false);
})()

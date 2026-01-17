
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


	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {

		// Call center function every milisecond
		setInterval(center, 4);
	}, false);
})()

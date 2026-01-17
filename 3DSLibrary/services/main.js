
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
		var topHeading = document.getElementById("topHeading");
		topHeading.innerHTML = "test";
	};


	var inactive = function(ev) {
		var top = document.getElementById("topHeading");
		top.style.innerHTML = "Hi";
	};


	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {
		// Call center function every milisecond
		setInterval(center, 4);
		var anchors = this.querySelectorAll("#lowerScreenMenu a");
		inactive();
		alert("hi");
		for(var i = 0, l = anchors.length; i<l; i++){
			anchors[i].addEventListener('focus', active, false);
			anchors[i].addEventListener('blur', inactive, false);
		}
	}, false);

})()

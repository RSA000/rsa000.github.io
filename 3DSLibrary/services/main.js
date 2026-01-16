var x = document.getElementById("backgroundMusic");

function playAudio() {
	x.play();
}

function pauseAudio() {
	x.pause();
}

/* Special cases for button pressing */
var control = function(ev) {
	switch(ev.which) {
		case 13: alert("A"); break;
		case 37: alert("left"); break;
		case 38: alert("up"); break;
		case 39: alert("right"); playAudio(); break;
		case 40: alert("down"); break;
	}
};


(function(){

	document.addEventListener('keydown', control);

	/*This function continuously scrolls the screen to the 40,215 coordinates */
	var center = function(){
		/* Scroll to designated coordinates */
		window.scrollTo(40,215);
	};


	/* When content is loaded */
	document.addEventListener('DOMContentLoaded', function(ev) {
		/* Call center function every milisecond*/
		setInterval(center, 1);
	}, false);
})()

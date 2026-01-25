(function(){

var gamepad = navigator.webkitGetGamepads;
alert(gamepad);


document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

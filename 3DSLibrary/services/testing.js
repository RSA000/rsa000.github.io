(function(){

alert(navigator.webkitGetGamepads.axes);
alert(navigator.webkitGetGamepads.buttons);


document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

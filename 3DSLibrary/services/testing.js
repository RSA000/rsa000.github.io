(function(){

    // Get the array of gamepads
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    if (gamepads.length > 0 && gamepads[0]) {
        alert("Axes: " + gamepads[0].axes);
        alert("Buttons: " + gamepads[0].buttons);
    } else {
        alert("No gamepads connected");
    }

document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

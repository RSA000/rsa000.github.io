(function(){

    // Get the array of gamepads
    var gamepads = navigator.webkitGetGamepads();

    if (gamepads && gamepads.length > 0 && gamepads[0]) {
        var gp = gamepads[0];

        // Access axes
        var axes = gp.axes;
        alert("Circle pad X: " + axes[0]);
        alert("Circle pad Y: " + axes[1]);
        alert("C-stick X: " + axes[2]);
        alert("C-stick Y: " + axes[3]);

        // Access buttons
        var buttons = gp.buttons;
        alert("Button A (index 1): " + buttons[1]);
        alert("Button B (index 0): " + buttons[0]);
        alert("Up (index 12): " + buttons[12]);
        alert("Down (index 13): " + buttons[13]);
    } else {
        alert("No gamepad connected");
    }

document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

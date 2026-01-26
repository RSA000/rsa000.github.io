(function(){

    function logGamepad(){
        // Get the array of gamepads
        var gamepads = navigator.webkitGetGamepads();

        if (gamepads && gamepads.length > 0 && gamepads[0]) {
            var gp = gamepads[0];

            var log = "";
            // Access axes
            var axes = gp.axes;
            log += (" Circle pad X: " + axes[0]) + "\n";
            log += (" Circle pad Y: " + axes[1]) + "\n";
            log += (" C-stick X: " + axes[2]) + "\n";
            log += (" C-stick Y: " + axes[3]) + "\n";

            // Access buttons
            var buttons = gp.buttons;
            log += ("Button A (index 1): " + buttons[1]) + "\n";
            log += ("Button B (index 0): " + buttons[0]) + "\n";
            log += ("Up (index 12): " + buttons[12]) +"\n";
            log +=("Down (index 13): " + buttons[13])" +\n";
            log += ("Current Keycode: " + event.keyCode) " +\n";
            document.getElementsByClassName("topSubtitle")[0].innerText = log;
        } else {
            alert("No gamepad connected");
        }

    }

    function preventGamepad(){
        var gamepads = navigator.webkitGetGamepads();

        if (gamepads && gamepads.length > 0 && gamepads[0]) {
            var gp = gamepads[0];

;
            // Access axes
            var axes = gp.axes;
            axes[0] = 0;
            axes[1] = 0;
            axes[2] = 0;
            axes[3] = 0;
        }
    }


document.addEventListener("keydown", function(event) {
    preventKey(event);
});

setInterval(preventGamepad);
setInterval(logGamepad, 100);

}());

(function(){

    const ZERO = 0;
    if (is3DS()){

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
                log += ("Up (index 12): " + buttons[12]) + "\n";
                log += ("Down (index 13): " + buttons[13]) + "\n";

                document.getElementsByClassName("topSubtitle")[0].innerText = log;
            } else {
                alert("No gamepad connected");
            }

        }

        function preventGamepad(){
            var gamepads = navigator.webkitGetGamepads();

            if (gamepads && gamepads.length > 0 && gamepads[0]) {
                var gp = gamepads[0];

                // Access axes
                var axes = gp.axes;
                var x = axes[0];
                var y = axes[1];

                var doc = document.body;
                var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
                var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

                window.scrollTo(left - (x * 85), top - (y * 85));

            }
        }



        document.addEventListener("keydown", function(event) {
            preventKey(event);
            // log += ("Current Keycode: " + event.keyCode)  +"\n";
        });

        setInterval(preventGamepad);
        setInterval(logGamepad);


    }

}());

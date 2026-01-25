(function(){


    // Mock Gamepad object for testing
    const mockGamepad = {
        axes: [0.0, 0.0, 0.0, 0.0],
        buttons: Array(16).fill(0),
 id: "New Nintendo 3DS Controller"
    };

    // Function to test axes array
    function testAxes(gamepad) {
        console.assert(gamepad.axes.length === 4, "Axes array should have 4 elements");
        gamepad.axes.forEach((value, index) => {
            console.assert(typeof value === "number", `Axis ${index} should be a number`);
            console.assert(value >= -1.0 && value <= 1.0, `Axis ${index} value ${value} out of range`);
        });
        alert("Axes test passed");
    }

    // Function to test buttons array
    function testButtons(gamepad) {
        console.assert(gamepad.buttons.length >= 16, "Buttons array should have at least 16 elements");
        // Check specific buttons for default state
        const buttonIndices = {
            B: 0,
            A: 1,
            Y: 2,
            X: 3,
            L: 4,
            R: 5,
            ZL: 6,
            ZR: 7,
            Select: 8,
            Start: 9,
            Up: 12,
            Down: 13,
            Left: 14,
            Right: 15,
        };

        Object.entries(buttonIndices).forEach(([name, index]) => {
            const value = gamepad.buttons[index];
            console.assert(value === 0 || value === 1, `${name} button value should be 0 or 1`);
        });
        alert("Buttons test passed");
    }

    // Function to simulate button press
    function setButtonState(gamepad, index, pressed) {
        gamepad.buttons[index] = pressed ? 1 : 0;
    }

    // Function to test button state change
    function testButtonStateChange() {
        // Press A button
        setButtonState(mockGamepad, 1, true);
        console.assert(mockGamepad.buttons[1] === 1, "A button should be pressed (1)");

        // Release A button
        setButtonState(mockGamepad, 1, false);
        console.assert(mockGamepad.buttons[1] === 0, "A button should be released (0)");
        alert("Button state change test passed");
    }

    // Function to simulate axis change
    function setAxisValue(gamepad, index, value) {
        gamepad.axes[index] = value;
    }

    // Function to test axes value change
    function testAxisValueChange() {
        // Set circle pad X to maximum right
        setAxisValue(mockGamepad, 0, 1.0);
        console.assert(mockGamepad.axes[0] === 1.0, "Circle pad X should be 1.0");

        // Set C-stick Y to maximum down
        setAxisValue(mockGamepad, 3, 1.0);
        console.assert(mockGamepad.axes[3] === 1.0, "C-stick Y should be 1.0");
        alert("Axis value change test passed");
    }

    // Run tests
    testAxes(mockGamepad);
    testButtons(mockGamepad);
    testButtonStateChange();
    testAxisValueChange();

document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

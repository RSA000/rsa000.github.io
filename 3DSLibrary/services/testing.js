(function(){

var gamepad = navigator.webkitGetGamepads;


window.addEventListener("gamepadconnected", (e) => {
    alert(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
    );
}, false);

document.addEventListener("keydown", function(event) {
    alert("Keycode: " + event.keyCode);
});

}());

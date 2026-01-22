(function() {

    const textContainer = document.getElementById('textContainerRead');

    /* The scrollUp function scrolls the text container up*/
    var scrollUp = function() {

        // "scrollBy" does not appear to work.
        console.log("Scrolling up");
        textContainer.scrollTop -= 20;
    };


    /* The scrollUp function scrolls the text container down.*/
    var scrollDown = function() {
        // "scrollBy" does not appear to work.
        console.log("Scrolling down");
        textContainer.scrollTop += 20;
    };



    /* wolfyxon's stuff */

    // Create empty container for press states
    var pressStates = {};


    var pressCallbacks = {
        // Left
        37: [],
        // Up
        38: [scrollUp],
        // Right
        39: [],
        // Down
        40: [scrollDown],
        // A
        65: []
    };


    // This prevents the browser from moving the page using the arrow keys
    function preventKey(event){
        if(event.keyCode === 8) return true; //backspace
        if(event.keyCode === 116) return true; //f5
        if(event.keyCode === 13) return true; //enter

        if(event.charCode || (event.key && event.key.length === 1 )) return true; // allow character keys

        event.preventDefault();
        return false;
    };


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} e
     */
    function globalHandleKeyDown(e){
        // Prevent default action when key is pressed down.
        preventKey(e);


        if(pressCallbacks[e.keyCode]) {
            // Assign constant "callbacks" to index of pressCallbacks[name]
                // For exmaple, pressCallbacks["Down"] would return a list of functions (currently just one, "scrollDown(),").
            const callbacks = pressCallbacks[e.keyCode];
            // For range of callbacks,
                // Currently, all lists either hold 1 or 0 functions
            for(var i = 0; i < callbacks.length; i++) {
                // index and call function at callbacks[i];
                callbacks[i]();
            }
        }
    }


    /**
     * Process keyup logic. Call this when using window.onkeyup, and you want to use the global.js input detection system
     * @param {KeyboardEvent} e
     */
    function globalHandleKeyUp(e){
        // Currently, just do nothing
        preventKey(e);
    }

    // end of wolfyxon






    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("keydown", globalHandleKeyDown, false);
        window.addEventListener("keyup", globalHandleKeyUp, false);

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Initialize a GET request to the URL
        // INITIALIZE, NOT SEND!
        xhr.open('GET', 'https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt', true);

        // Configure what to do when the state of xhr changes.
        // In this case, run a function.
        xhr.onreadystatechange = function() {
            // A readyState value of 4 means GET state is done (4).
            if (xhr.readyState === 4) {
                // If status code is not an error.
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Create variable text, and store response text within.
                    var text = xhr.responseText;
                    // Create variable "portion"
                    var portion = text.substring(0, 10000);
                    // Create new paragraph element and store in variable para.
                    para = document.createElement("p");
                    // Update para's inner text to current portion of text.
                    para.innerText = portion;
                    // Store textContainerElement in variable.
                    const textContainer = document.getElementById('textContainerRead');
                    // Append paragraph to textContainer
                    textContainer.appendChild(para);
                }
                else {
                // Otherwise, log status and alert user.
                console.error('Error loading text file:', xhr.statusText);
                // Needed to see on 3DS.
                alert("uh oh :/" + xhr.statusText);
                }
            }
        };
    // Send actual request.
    xhr.send();
    }, false);
})();

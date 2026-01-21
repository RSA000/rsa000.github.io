(function() {

    const textContainer = document.getElementById('textContainerRead');


    /* The scrollUp function scrolls the text container up*/
    var scrollUp = function() {

        // "scrollBy" does not appear to work.
        console.log("Scrolling up");
        textContainer.scrollTop -= 10;
    };


     /* The scrollUp function scrolls the text container down.*/
    var scrollDown = function() {
        // "scrollBy" does not appear to work.
        console.log("Scrolling down");
        textContainer.scrollTop += 10;
    };



    /* wolfyxon's stuff */

    // Dictionary that creates key-value pairs for keycodes and their corresponding text value.
    const keycodes = {
        13: "A",
        65: "A",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down"
    };

    // Create empty container for press states
    var pressStates = {};

    var pressCallbacks = {
        "Left": [],
        "Up": [scrollUp],
        "Right": [],
        "Down": [scrollDown],
        "A": []
    };


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} e
     */
    function globalHandleKeyDown(e){
        preventKey(e);

        // Create name that store corresponding value to keycodes key (null if no matches)
        const name = keycodes[e.keyCode];

        // If name is not null.
        if(name) {
                //
                const callbacks = pressCallbacks[name];

                for(var i = 0; i < callbacks.length; i++) {
                    callbacks[i]();
                }
        }
    }

    /**
     * Process keyup logic. Call this when using window.onkeyup, and you want to use the global.js input detection system
     * @param {KeyboardEvent} e
     */
    function globalHandleKeyUp(e){
        preventKey(e);

        const name = keycodes[e.keyCode];

        if(name) {
            pressStates[name] = false;
        }
    }

    /**
     * Clears all input
     */
    function releaseAllKeys() {
        pressStates = {};
    }


    // This prevents the browser from moving the page using the arrow keys
    function preventKey(event){
        if(event.keyCode === 8) return true; //backspace
        if(event.keyCode === 116) return true; //f5
        if(event.keyCode === 13) return true; //enter

        if(event.charCode || (event.key && event.key.length === 1 )) return true; // allow character keys

        event.preventDefault();
        return false;
    };
    // end of wolfyxon






    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("keydown", globalHandleKeyDown, false);
        window.addEventListener("keyup", globalHandleKeyUp, false);
        window.addEventListener("blur", releaseAllKeys, false);

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
                    var portion = text.substring(0, 5000);
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
                alert("uh oh :/");
                }
            }
        };
    // Send actual request.
    xhr.send();
    }, false);
})();

(function() {

    const keycodes = {
        13: "A",
        65: "A",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down"
    };

    var pressStates = {};

    var pressCallbacks = {
        "Left": [],
        "Up": [],
        "Right": [],
        "Down": [],
        "A": []
    };


    //
    var control = function(ev) {
        var textContainer = document.getElementById('textContainerRead');
        switch(ev.which) {
            // Left
            case 37: break;
            // Up
            case 38:
                console.log("up");
                textContainer.scrollBy(0, -20);
                break;
            // Right
            case 39: break;
            // Down
            case 40:
                console.log("down");
                textContainer.scrollBy(0, 20);
                break;
        }
    };



    document.addEventListener('DOMContentLoaded', function(ev) {


        /**
         * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
         * @param {KeyboardEvent} e
         */
        function globalHandleKeyDown(e){
            preventKey(e);

            const name = keycodes[e.keyCode];

            if(name) {
                if(!pressStates[name]) {
                    const callbacks = pressCallbacks[name];

                    for(var i = 0; i < callbacks.length; i++) {
                        callbacks[i]();
                    }
                }

                pressStates[name] = true;
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

        window.addEventListener("keydown", globalHandleKeyDown, false);
        window.addEventListener("keyup", globalHandleKeyUp, false);
        window.addEventListener("blur", releaseAllKeys, false);

        // This prevents the browser from moving the page using the arrow keys
        function preventKey(event){
            if(event.keyCode === 8) return true; //backspace
            if(event.keyCode === 116) return true; //f5
            if(event.keyCode === 13) return true; //enter

            if(event.charCode || (event.key && event.key.length === 1 )) return true; // allow character keys

            event.preventDefault();
            return false;
        }

        // Create event listener that runs control function every time key input is taken (d-pad)
        document.addEventListener('keydown', control);

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

(function() {

    // Left 37, Up 38, Right 39, Down 40, A 65

    currentPosition = 0;

    var text = "";

    /**
     * The scrollUp function scrolls the text container up
     * @param {element}
     * @param {Int}
     */
    function scroll(element, amount) {
        console.log("Scrolling");
        element.scrollTop -= amount;
    };


    function updatePage(direction){

        if (direction == 0){
            // Clear current paragraph
            console.log("Clearing Screen");
            const textContainer = document.getElementById('textContainerRead');
            textContainer.getElementsByTagName("p")[0].innerText = "";
            var portion = text.substring(currentPosition + 10000, currentPosition + 20000);
            // Create new paragraph element and store in variable para.
            // Update para's inner text to current portion of text.
            textContainer.getElementsByTagName("p")[0].innerText = portion;
            // Store textContainerElement in variable.
            // Append paragraph to textContainer
            console.log("Next Page");
            currentPosition = currentPosition + 10000;
        }
        else if (direction == 1){
            // Clear current paragraph
            console.log("Clearing Screen");
            const textContainer = document.getElementById('textContainerRead');
            textContainer.getElementsByTagName("p")[0].innerText = "";
            var portion = text.substring(currentPosition - 20000, currentPosition);
            // Create new paragraph element and store in variable para.
            // Update para's inner text to current portion of text.
            textContainer.getElementsByTagName("p")[0].innerText = portion;
            // Store textContainerElement in variable.
            // Append paragraph to textContainer
            console.log("Previous Page");
            currentPosition = currentPosition - 10000;
        }
    };

    /* wolfyxon's stuff */

    /**
     *
     * This prevents the browser from moving the page using the arrow keys
     * @param {keyboardEvent} event
     */
    function preventKey(event){
        if(event.keyCode === 8) return true; //backspace
        if(event.keyCode === 116) return true; //f5
        if(event.keyCode === 13) return true; //enter

        // If event.charCode is not null or event key is not null and length is equal to 1.
        if(event.charCode || (event.key && event.key.length === 1 ))
            // allow character keys and return true.
            return true;
        // Otherwise, prevent default action for event and return false.
        event.preventDefault();
        return false;
    };


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function readHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);

        if(event.keyCode == 38) {
            scroll(element, 17);
        }
        else if (event.keyCode == 39){
            updatePage(0);
            scroll(element, 10000);

        }
        else if (event.keyCode == 40){
            scroll(element, -17);
        }
        else if (event.keyCode == 37) {
            updatePage(1);
            scroll(element, 10000);
        }
    };


    /**
     * Process keyup logic. Call this when using window.onkeyup, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function readHandleKeyUp(event){
        // Currently, just prevent default bevavior.
        preventKey(event);
    }

    // end of wolfyxon

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
                text = xhr.responseText;
                // Create variable "portion"
                var portion = text.substring(currentPosition, currentPosition + 10000);
                // Create new paragraph element and store in variable para.
                para = document.createElement("p");
                // Update para's inner text to current portion of text.
                para.innerText = portion;
                // Store textContainerElement in variable.
                const textContainer = document.getElementById('textContainerRead');
                // Append paragraph to textContainer
                textContainer.appendChild(para);
                currentPosition += 10000;
            }
            else {
                // Otherwise, log status and alert user.
                console.error('Error loading text file:', xhr.statusText);
                // Needed to see on 3DS.
                alert("uh oh :/ " + xhr.statusText);
            }
        }
    };
    // Send actual request.
    xhr.send();









    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });

        window.addEventListener("keyup", readHandleKeyUp, false);


    }, false);
})();

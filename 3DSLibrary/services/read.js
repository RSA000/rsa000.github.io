/**
 *
 * This is the main Javascript functionality behind the "read.html" page and provides a means for
 * updating the text within the page of a currently selected book. Currently, there is no means of
 * tracking
 *
 * 3DS Keycodes:
 *              Left 37,
 *              Up 38,
 *              Right 39,
 *              Down 40,
 *              A 65
 *
 */

(function() {

    // Set current book position to 0th character.
    var currentPosition = 0;
    var pages = 0;



    /**
    *
    * This function returns a list of strings subdivided from a string acquired through an
    * XMLHttpRequest to a passed url.
    *
    * @param {url}
    *
    */
    function getText(url){
        var textChunks = [];
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Initialize a GET request to the passed URL
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
                    // Loop through text in segments of 1000 characters push to list variable textChunks.
                    for (i = 0; i < text.length; i+=1000){
                        textChunks.push(text.substring(i, i+1000));
                    }
                    // Update value of pages.
                    pages = textChunks.length;
                    // Display first page.
                    updatePage(2);
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
        // Return textChunks.
        return textChunks
    }


    /**
     *
     * This function takes a number (0 or 1) that indicates the page direction and updates
     * the textContainerReader
     *
     * @param {direction}
     *
     */
    function updatePage(direction){
        // Store textContainerRead element.
        var textContainer = document.getElementById('textContainerRead');
        // Store first paragraph of textContainerRead in "containerParagraph."
        var containerParagraph = textContainer.getElementsByTagName("p")[0];


        // If direction is forwards.
        if ((direction == 0) && (currentPosition < pages - 1)){
                // Update position +1 and replace inner text with new chunk.
                currentPosition += 1;
                containerParagraph.innerText = "";
                containerParagraph.innerText = textChunks[currentPosition];
        }
        // If direction is backwards.
        else if (direction == 1){
            // If current position is greater than 1 (not front page).
            if (currentPosition > 0){
                // Update current position and store current portion.
                currentPosition -= 1;
                // Clear current paragraph
                containerParagraph.innerText = "";
                // Display previous page.
                containerParagraph.innerText = textChunks[currentPosition];
            }
        }
        // For first starting first page.
        else if (direction == 2){
            // Display first page.
            containerParagraph.innerText = "";
            containerParagraph.innerText = textChunks[0];
        }
        // Scroll to top of screen
        scroll(textContainer, 10000);
        return;
    };


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function readHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        switch(event.keyCode){
            // D-pad up.
            case 38:
                scroll(element,17);
                break;
            // D-pad right.
            case 39:
                updatePage(0);
                break;
            // D-pad down.
            case 40:
                scroll(element, -17);
                break;
            // D-pad left.
            case 37:
                updatePage(1);
                break;
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



    const textChunks = getText("nothing");

    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });

        window.addEventListener("keyup", readHandleKeyUp, false);


    }, false);
})();

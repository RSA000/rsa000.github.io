/**
 *
 * This is the main Javascript functionality behind the "read.html" page and provides a means for
 * updating the text within the page of a currently selected book.
 *
 *
 */

(function() {

    // Set current book position to 0th character.
    var currentPosition = 0;
    // Create variable for storing page number.
    var pages = 0;
    // Create list variable for storing sub-divided book text.
    var textChunks = [];

    // Store textContainerRead element.
    var textContainer = document.getElementById('textContainerRead');
    // Store first paragraph of textContainerRead in "containerParagraph."
    var containerParagraph = textContainer.getElementsByTagName("p")[0];



    /**
    *
    * getText(url) returns a list of strings subdivided from a string acquired through an
    * XMLHttpRequest to a passed url.
    *
    * @param {url}
    *
    */
    function getText(url, callback){
        // Create a new XMLHttpRequest object and initialize a GET request to the passed url.
        var xhr = new XMLHttpRequest();
        // GET request using url, asychronous = true.
        xhr.open('GET', url, true);
        // Configure what function to perform when a state change occurs.
        xhr.onreadystatechange = function() {
            // A readyState value of 4 means GET state is done (4).
            if (xhr.readyState === 4) {
                // If status code is not an error.
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Create variable text, and store response text within.
                    var text = xhr.responseText;
                    // Call the callback with the chunks
                    if (callback) callback(text);
                }
                // Otherwise display error messages.
                else {
                    // Otherwise, log status and alert user.
                    console.error('Error loading text file:', xhr.statusText);
                    // Needed to see on 3DS.
                    alert("uh oh :/ " + xhr.statusText);
                }
            }
        };
        // Send request.
        xhr.send();
    }


    function loadBook(text){
        textChunks = [];
        // Loop through text in segments of 1000 characters push to list variable textChunks.
        for (var i = 0; i < text.length; i+=1000){
            textChunks.push(text.substring(i, i+1000));
        }
        // Now, chunks is ready to use
        pages = textChunks.length;
        updatePage(2); // Display first page
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
            currentPosition = 0;
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
            case UP:
                scroll(element,17);
                break;
            case DOWN:
                scroll(element, -17);
                break;
            case RIGHT:
                updatePage(0);
                break;
            case LEFT:
                updatePage(1);
                break;
        }
    };




    // Add event listener for when content is loaded.
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });
    }, false);

    // Get book text and load into textContainerRead paragraph element in read.html.
    getText("https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt", loadBook);

})();

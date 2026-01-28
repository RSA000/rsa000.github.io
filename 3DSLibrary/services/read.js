/**
 *
 * This is the main Javascript functionality behind the "read.html" page and provides a means for
 * updating the text within the page of a currently selected book.
 *
 *
 */

(function() {

    // If no book exists, redirect.
    checkCookie();

    // Get current book name.
    var bookName = getCookie("bookName");
    // Get current book position cookie.
    var pageNum = parseInt(getCookie('pageNum'));

    // Create list variable for storing sub-divided book text.
    var textChunks = [];
    // Store textContainerRead element.
    var textContainer = document.getElementById('textContainerRead');



    /**
    *
    * getText(url) returns a list of strings subdivided from a string acquired through an
    * XMLHttpRequest to a passed url.
    *
    * @param {String} url
    * @param {Function} callback
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
                    // Send response text of request to callback function.
                    if (callback) callback(xhr.responseText);
                }
                // Otherwise, log status and alert user.
                else{
                    console.error('Error loading text file:', xhr.statusText);
                    alert("Error loading text file:" + xhr.statusText);
                }
            }

        };
        // Send request.
        xhr.send();
    }


    function loadBook(text) {
        // Reset textChunks
        textChunks = [];
        // Insantiate chunk string, position, and text length.
        var chunk = "";
        var position = 0;
        var textLength = text.length;

        while (position < textLength) {
            // Find next closing tag
            var closeTagStart = text.indexOf("</", position);
            // If not closing tags found.
            if (closeTagStart === -1) {
                // Add remaining text
                chunk += text.substring(position);
                if (chunk.length > 0) {
                    textChunks.push(chunk);
                }
                break;
            }

            // Find end of the closing tag
            var closeTagEnd = text.indexOf(">", closeTagStart);
            // If no closing tag found.
            if (closeTagEnd === -1) {
                // Bad tag end,  add remaining text
                chunk += text.substring(position);
                if (chunk.length > 0) {
                    textChunks.push(chunk);
                }
                break;
            }

            // Add text up to and including the closing tag
            var segmentEnd = closeTagEnd + 1; // include '>'
            chunk += text.substring(position, segmentEnd);
            position = segmentEnd; // move past this tag

            // If chunk is large enough, save and reset
            if (chunk.length >= 1750) {
                textChunks.push(chunk);
                chunk = "";
            }
        }
        // Add any remaining text in chunk
        if (chunk.length > 0) {
            textChunks.push(chunk);
        }

        // Get length of pages and update page.
        pages = textChunks.length;
        updatePage(pageNum);
    }


    /**
     *
     * This function takes a number (0 or 1) that indicates the page direction and updates
     * the textContainerReader
     *
     * @param {Int} Int.
     *
     */
    function updatePage(pageNum){

        // Display previous page.
        textContainer.innerHTML = textChunks[pageNum];
        // Scroll to top of screen
        scroll(textContainer, 5000);
        return;
    }


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     *
     * @param {event} keyBoardEvent.
     * @param {element} element.
     */
    function readHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        switch(event.keyCode){
            case UP:
                // Scroll up 15 pixels.
                element.scrollTop -= 15;
                break;
            case DOWN:
                // Scroll down 15 pixels.
                element.scrollTop += 15;
                break;
            case RIGHT:
                // Update page to next text chunk.
                if (pageNum < pages - 1){
                    // Update position +1 and replace inner text with new chunk.
                    pageNum += 1;
                    setCookie("pageNum", pageNum, 364);
                }
                break;
            case LEFT:
                // If current position is greater than 1 (not front page).
                if (pageNum > 0){
                    // Update current position and store current portion.
                    pageNum -= 1;
                    setCookie("pageNum", pageNum, 364);
                }
                break;
        }
        updatePage(pageNum);
        // Prevent excessive page turning.
        setTimeout(30);
    }



    // Add event listener for when content is loaded.
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });
        window.addEventListener("keyUp", function(e){
           preventKey(e);
        });

        // Get book text and load into textContainerRead paragraph element in read.html.
        getText("https://rsa000.github.io/3DSLibrary/assets/texts/" + bookName, loadBook);

    }, false);
})();

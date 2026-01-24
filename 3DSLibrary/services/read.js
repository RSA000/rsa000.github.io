/**
 *
 * This is the main Javascript functionality behind the "read.html" page and provides a means for
 * updating the text within the page of a currently selected book.
 *
 *
 */

(function() {

    checkCookie();

    // Get current book name.
    var bookName = getCookie("bookName");
    // Get current book position cookie.
    var pageNum = parseInt(getCookie('pageNum'));

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
        // Reset textChunks contents
        textChunks = [];
        // Loop through text in segments of 1000 characters push to list variable textChunks.
        for (var i = 0; i < text.length; i+=1000){
            textChunks.push(text.substring(i, i+1000));
        }
        // Now, chunks is ready to use
        pages = textChunks.length;
        // Display first page
        updatePage(pageNum);
    }





    /**
     *
     * This function takes a number (0 or 1) that indicates the page direction and updates
     * the textContainerReader
     *
     * @param {direction}
     *
     */
    function updatePage(index){

        pageNum = index;
        containerParagraph.innerText = "";
        // Display previous page.
        containerParagraph.innerText = textChunks[pageNum];
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
                // Scroll up 15 pixels.
                scroll(element,15);
                break;
            case DOWN:
                // Scroll down 15 pixels.
                scroll(element, -15);
                break;
            case RIGHT:
                // Update page to next text chunk.
                // If direction is forwards.
                if (pageNum < pages - 1){
                    // Update position +1 and replace inner text with new chunk.
                    pageNum += 1;
                    containerParagraph.innerText = "";
                    containerParagraph.innerText = textChunks[pageNum];
                    setCookie("pageNum", pageNum, 364);
                }
                updatePage(pageNum);
                break;
            case LEFT:
                // If current position is greater than 1 (not front page).
                if (pageNum > 0){
                    // Update current position and store current portion.
                    pageNum -= 1;
                    setCookie("pageNum", pageNum, 364);
                }
                updatePage(pageNum);
                break;
        }
    };



    // Add event listener for when content is loaded.
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });

        // Get book text and load into textContainerRead paragraph element in read.html.
        getText("https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt", loadBook);

    }, false);


})();

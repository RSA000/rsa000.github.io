/**
 *
 * This is the main Javascript functionality behind the "read.html" page and provides a means for
 * updating the text within the page of a currently selected book.
 *
 *
 */

(function() {

    // If no book exists, redirect.
    checkBookName();

    // Get current book name.
    var bookName = getCookie("bookname");
    var pages = 0;
    // Get current book position cookie.
    var pageNum = parseInt(getCookie('pagenum'));
    // Create list variable for storing sub-divided book text.
    var textChunks = [];
    // Store textContainerRead element.
    var textContainer = document.getElementById('textContainerRead');
    var pageIndex = $("#pageindex");
    var viewToggle = document.getElementById("viewToggle");
    var currentView = 0;


    /**
     * This function takes a number (0 or 1) that indicates the page direction and updates
     * the textContainerReader
     *
     * @param {Int} Int.
     *
     */
    function updatePage(pageNum){

        // Display previous page.
        textContainer.innerHTML = textChunks[pageNum];
        textContainer.scrollTop = 0;
        pageIndex.val(pageNum);
        checkFontSize();
        return;
    }


    /**
     * Function parses and returns list of HTML chunks.
     *
     * @param {String} - Text from literature in HTML format.
     */
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
            // Find end position index of the closing tag
            var closeTagEnd = text.indexOf("p>", closeTagStart);
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
            var segmentEnd = closeTagEnd + 2; // include 'p>'
            chunk += text.substring(position, segmentEnd);
            position = segmentEnd; // move past this tag

            // If chunk is large enough, save and reset
            if (chunk.length >= 1800) {
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
                    setCookie("pagenum", pageNum, 364);
                    updatePage(pageNum);
                }
                break;
            case LEFT:
                // If current position is greater than 1 (not front page).
                if (pageNum > 0){
                    // Update current position and store current portion.
                    pageNum -= 1;
                    setCookie("pagenum", pageNum, 364);
                    updatePage(pageNum);
                }
                break;
        }

    }



    // Add event listener for when content is loaded.
    document.addEventListener('DOMContentLoaded', function(ev) {

         viewToggle.addEventListener("click", function(ev){
             if (currentView === 0){
                 textContainer.style.height = "185px";
                 viewToggle.style.marginTop = "100px";
                 currentView = 1;
             }
             else if (currentView === 1){
                 textContainer.style.height = "175px";
                 textContainer.style.width = "310px";
                 textContainer.style.top = "215px";
                 viewToggle.style.marginTop = "0px";
                 pageIndex.css('top', '220px');
                 viewToggle.style.top = "220px";
                 currentView = 2;
             }
             else if (currentView === 2){
                 textContainer.css({
                     'height': '400px',
                     'width': '294px',
                     'top': '5px'
                 });

                 pageIndex.css("top", "0px");
                 viewToggle.css("top", "0px");
                 currentView = 0;
             }

         });

        window.removeEventListener("keydown", handleKeyDown);


        // Add event listener for when a key is pressed down.
        pageIndex.on("keypress", function(e) {
            if (e.keyCode === ENTER){
                updatePage(parseInt(pageIndex.val()));
            }
        });


        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });

        // Get book text and load into textContainerRead paragraph element in read.html.
        getText("https://rsa000.github.io/3DSLibrary/assets/texts/" + bookName, loadBook);

    }, false);
})();

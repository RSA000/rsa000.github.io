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

    // Get current book name and page number cookie values and store in variables (string, int).
    var bookName = getCookie("bookname");
    var pageNum = parseInt(getCookie('pagenum'));

    // Instantiate variables pages, currentView, and textChunks (int, int, list).
    var pages = 0;
    var currentView = 0;
    var textChunks = [];

    // Store textContainer, pageIndex, and viewToggle page elements as variables (JQueary objects).
    var textContainer = $('#textContainerRead');
    var pageIndex = $("#pageindex");
    var viewToggle = $("#viewToggle");


    /**
     * This function takes a number (0 or 1) that indicates the page direction and updates
     * the textContainerReader
     *
     * @param {Int} Page number to update to.
     */
    function updatePage(pageNum){

        // Update inner HTML to pageNum index and scroll to top.
        textContainer.html(textChunks[pageNum]);
        textContainer.animate({scrollTop: "0px"}, 50);
        pageIndex.val(pageNum);
        // Update font size.
        checkFontSize();
        return;
    }


    /**
     * Function parses and returns list of HTML chunks.
     *
     * @param {String} - Text from literature in HTML format.
     */
    function loadBook(text) {
        // Reset textChunks contents
        textChunks = [];
        // Insantiate chunk string, position.
        var chunk = "";
        var position = 0;

        // While position is less than length of literature text.
        while (position < text.length) {
            // Find next closing tag
            var closeTagStart = text.indexOf("</", position);
            // If not closing tags found.
            if (closeTagStart === -1) {
                // Add remaining text
                chunk += text.substring(position);
                // Add current chunk to chunks if current chunk is not empty (ending of text).
                if (chunk.length > 0) {
                    textChunks.push(chunk);
                }
                break;
            }
            // Otherwise, find end position index of the next closing </p> tag.
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
            // Add text up to and include the closing tag
            var segmentEnd = closeTagEnd + 2;
            chunk += text.substring(position, segmentEnd);
            // Update position to end of last segment.
            position = segmentEnd;

            // If chunk is large enough, push current chunk to textChunks and reset
            if (chunk.length >= 1800) {
                textChunks.push(chunk);
                chunk = "";
            }
        }
        // Add any remaining text in chunk
        if (chunk.length > 0) {
            textChunks.push(chunk);
        }
        // Get length of pages and update page to first page.
        pages = textChunks.length;
        updatePage(pageNum);
    }


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     *
     * @param {event} keyBoardEvent.
     * @param {element} Javascript DOM element.
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
    $(document).ready(function() {

         viewToggle.on("click", function(ev){
             // Case for full screen changing to top screen only.
             switch(currentView){
                 case 0:
                     textContainer.css({
                         "height": "185px"
                     })
                     viewToggle.css({
                         "marginTop": "100px"
                     });
                     currentView = 1;
                     break;
                 // Case for top screen only changing to bottom screen only.
                 case 1:
                     textContainer.css({
                         "height": "175px",
                         "width": "294px",
                         "top": "220px"
                     });
                     viewToggle.css({
                         "marginTop": "0px",
                         "top": "220px"
                     });
                     pageIndex.css({
                         'top': '220px'
                     });
                     currentView = 2;
                     break;
                     // Case for lower screen only to full screen view.
                 case 2:
                     textContainer.css({
                         'height': '400px',
                         'width': '294px',
                         'top': '5px'
                     });
                     pageIndex.css("top", "0px");
                     viewToggle.css("top", "0px");
                     currentView = 0;
                     break;
             }
         });

        window.removeEventListener("keydown", menuHandleKeyDown);

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            readHandleKeyDown(e, document.getElementById('textContainerRead'));
        });


        // Add event listener for when a key is pressed down.
        pageIndex.on("keypress", function(e) {
            if (e.keyCode === ENTER){
                updatePage(parseInt(pageIndex.val()));
            }
        });

        // Get book text and load into textContainerRead paragraph element in read.html.
        getText("https://rsa000.github.io/3DSLibrary/assets/texts/" + bookName, loadBook);

    });
})();

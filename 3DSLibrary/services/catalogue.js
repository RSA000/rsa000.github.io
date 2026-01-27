
/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    var csvItems = [];

    function getCSV(callback){
        // Create a new XMLHttpRequest object and initialize a GET request to the passed url.
        var xhr = new XMLHttpRequest();
        // GET request using url, asychronous = true.
        xhr.open('GET', "https://rsa000.github.io/3DSLibrary/assets/texts/catalog.csv", true);
        // Configure what function to perform when a state change occurs.
        xhr.onreadystatechange = function() {
            // A readyState value of 4 means GET state is done (4).
            if (xhr.readyState === 4) {
                // If status code is not an error.
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Send response text of request to callback function.
                    if (callback){
                        var textParsed = callback(xhr.responseText);
                        return textParsed;
                    }
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


    function parseCSV(text){


        // Create list for csv entries.
        csvItems = [];
        // Store each CSV line in variable.
        var lines = text.trim().split("\n");

        // For each line.
        for (var i = 0; i < lines.length; i++) {
            // List entries consists of each CSV entry per line
            var entries = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
            // If there are any entries.
            if (entries) {
                // Remove surrounding quotes
                entries = entries.map(function(entry) {
                    return entry.replace(/^"|"$/g, '');
                });
                csvItems.push(entries);
            }
        }
        // return formatted CSV [[header]...[entries]]
        return csvItems;
    }


    function populateCatalogue(csvItems, element){
        var catalogue = "";

        // Start from 1 if first row is header
        for (var i = 1; i < csvItems.length; i++){
            var row = csvItems[i];
            var name = row[0];
            var description = row[1];
            var url = row[2];

            catalogue += '<a href="' + url + '" title="' + description + '">' + name + '</a><br>';
        }

        // Insert the generated HTML into the element with id 'elementId'
        document.getElementById(element).innerHTML = catalogue;
    }

    getCSV(parseCSV);
    alert(csvItems);


    var index = 0;
    var anchors = document.getElementsByTagName("a");
    var anchorLength = anchors.length;

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
        // get top screen Heading and subtitles and store in variables.
        var topHeading = document.getElementsByClassName("topHeading")[0];
        var topSubtitle = document.getElementsByClassName("topSubtitle")[0];
        // Get innerHTML and description attributes of current element.
        // Update innerHTML of top heading and subtitle to heading and subtitle values.
        topHeading.innerHTML = this.innerHTML;
        topSubtitle.innerHTML = this.dataset.description;
    };


    /*Function returns title to original message when no items are selected. */
    var click = function(ev) {
        const bookName = this.getAttribute("bookName");
        setCookie("bookName", bookName, 364);
        setCookie("pageNum", 0, 364);
        window.location.href = "./read.html";
    };

    /* End of Simbas */

    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function menuHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        switch(event.keyCode){
            // Case for up button.
            case UP:
                // If index is above 0.
                if (index > 0){
                    // Update index -1.
                    index -= 1;
                }
                // If index is 0.
                else{
                    // Set index to last anchor.
                    index = anchorLength - 1
                }
                // Focus on current index.
                anchors[index].focus();
                break;
                // Case for down button.
            case DOWN:
                // If index is not above anchorLength.
                if (index < anchorLength -1){
                    // Increment index.
                    index += 1;
                }
                // If index is at last anchor.
                else{
                    index = 0;
                }
                // Focus on current anchor index.
                anchors[index].focus();
                break;
        }
    };



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // Get lowerScreenContents element.
        var lowerScreenContents = document.getElementById("lowerScreenContents");

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, lowerScreenContents);
        });



        // Store all <a> tags within the "lowerScreenContents" div in variable "anchors."
        var anchors = this.querySelectorAll(".lowerScreenContents a");
        // For each anchor, add event listener.
        for(var i = 0, l = anchors.length; i<l; i++){
            // When focused on, apply active function with "this" selected anchor.
            anchors[i].addEventListener('focus', active, false);
            // When no anchors are selected, revert to greeting heading and subtitle.
            anchors[i].addEventListener('click', click, false);
        }
    }, false);

})()

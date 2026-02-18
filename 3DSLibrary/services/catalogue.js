
// Call function
(function(){
    // Set initial tab index to 0.
    var index = 0;
    // Set empty csvItems list
    var csvItems = [];
    // Get catalogueOptions, topHeading, and topSubtitle elements.
    var lowerScreenContents = document.getElementById("catalogueOptions");
    var topHeading = document.getElementsByClassName("topHeading")[0];
    var topSubtitle = document.getElementsByClassName("topSubtitle")[0];




    /**
     * Function makes XMLHttpRequest and calls passed callback function on the request's response text
     *
     * @param {function} callback fucntion
     */
    function getCSV(callback){
        // Create a new XMLHttpRequest object and initialize a GET request to the passed url.
        var xhr = new XMLHttpRequest();
        // GET request using url to csv file, asychronous = true.
        xhr.open('GET', "https://rsa000.github.io/3DSLibrary/assets/texts/catalog.csv", true);
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
                    console.error('Error loading CSV file:', xhr.statusText);
                    alert("Error loading CSV file:" + xhr.statusText);
                }
            }

        };
        // Send request.
        xhr.send();
    }


    /**
     * Function creates string that represents lower menu catalogue of library from parsed CSV entries.
     *
     * @param {list} csvItems are a list of CSV entries (book name, book description, and url to book).
     * @param {element} DOM element to update inner HTML code.
     */
    function populateCatalogue(csvItems, element){
        var catalogue = "";

        // Start from 1 if first row is header
        for (var i = 0; i < csvItems.length; i++){
            var row = csvItems[i];
            var name = row[0];
            var description = row[1];
            var url = row[2];

            catalogue += '<a href="' + 'https://rsa000.github.io/3DSLibrary/views/read.html"' + ' data-bookname="' + url + '" data-description="' + description + '">' + name + " id='cat' " + '</a>';
        }
        // Insert the generated HTML into the element with id 'elementId'
        element.innerHTML = catalogue;
    }


    /**
     * Function takes raw text from CSV file and returns entries as list items.
     *
     * @param {string} text - Raw text from CSV.
     */
    function parseCSV(text){
        // Create list for csv entries.
        csvItems = [];
        // Store each CSV line in variable.
        var lines = text.trim().split("\n");

        // For each line.
        for (var i = 0; i < lines.length; i++) {
            // Entries are anything between two quoates and ignore spacing and commas in between; match multiple items.
            var entries = lines[i].match(/(".*?[^ ,]+")/g);
            // If there are any entries.
            if (entries) {
                // Remove surrounding quotes and add entry.
                entries = entries.map(function(entry) {
                    // Replace quote characters with empty string.
                    return entry.replace(/^"|"$/g, '');
                });
                csvItems.push(entries);
            }
        }
        // Populate lowerScreenContents with anchor elements created from csv File.
        populateCatalogue(csvItems, lowerScreenContents);

    }





    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Get, parse, and populate catalogue.
        getCSV(parseCSV);
        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, lowerScreenContents);
        });
    }, false);

})()

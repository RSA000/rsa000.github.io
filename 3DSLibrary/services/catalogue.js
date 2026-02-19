
// Call function
(function(){
    // Set initial tab index to 0.
    index = 0;
    // Set empty csvItems list
    var csvItems = [];
    var url = "https://rsa000.github.io/3DSLibrary/assets/texts/catalog.csv";



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

            catalogue += '<a href="' + 'https://rsa000.github.io/3DSLibrary/views/read.html"' + ' data-bookname="' + url + "\"" + ' class="cat" ' + ' data-description="' + description + '">' + name + '</a>';
        }
        // Insert the generated HTML into the element with id 'elementId'
        element.innerHTML = catalogue;

        var catalogueAnchors = document.getElementsByClassName("cat");
        console.log(catalogueAnchors);

        for (var i = 0, l = catalogueAnchors.length; i<l; i++){
            catalogueAnchors[i].addEventListener("click", catClick, false);
            console.log("added catalogue event");
        }
    }


    /**
     * Function takes raw text from CSV file and returns entries as list items.
     *
     * @param {string} text - Raw text from CSV.
     */
    function parseCSV(text){
        // Create list for csv entries.
        csvItems = [];
        var lowerScreenContents = document.getElementById("catalogueOptions");
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


    getText(url, parseCSV);

    var anchors = document.getElementsByTagName("a");

    // For each anchor, add event listener.
    for(var i = 0, l = anchors.length; i<l; i++){
        // When focused on, apply active function with "this" selected anchor.
        anchors[i].addEventListener('focus', active, false);
        // When no anchors are selected, revert to greeting heading and subtitle.
        anchors[i].addEventListener('blur', inactive, false);
    }

})()

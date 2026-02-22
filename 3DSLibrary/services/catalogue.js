
// Call function
(function(){
    // Set initial tab index to 0.
    index = 0;
    // Set empty csvItems list
    var csvItems = [];
    var url = "https://rsa000.github.io/3DSLibrary/assets/texts/catalogue.json";


    /**
     * Function creates string that represents lower menu catalogue of library from parsed CSV entries.
     *
     * @param {list} csvItems are a list of CSV entries (book name, book description, and url to book).
     * @param {element} DOM element to update inner HTML code.
     */
    function populateCatalogue(jsonItems, element) {
        var catalogue = "";

        // Loop through each item in the JSON array
        for (var i = 0; i < jsonItems.length; i++) {
            var row = jsonItems[i];
            var name = row[0];
            var description = row[1];
            var url = row[2];

            // Generate the anchor tag for each item
            catalogue += '<a href="https://rsa000.github.io/3DSLibrary/views/read.html" ' +
            'data-bookname="' + url + '" ' +
            'class="cat" ' +
            'data-text="' + description + '">' + name + '</a>';
        }

        // Insert the generated HTML into the specified element
        element.innerHTML = catalogue;

        // Add event listeners to each generated element
        var elements = document.getElementsByClassName('cat');

        for (var i = 0, l = elements.length; i < l; i++) {
            elements[i].setAttribute('tabindex', i);
            elements[i].addEventListener('focus', active, false);
            elements[i].addEventListener('blur', inactive, false);
            elements[i].addEventListener('click', catClick, false);
        }
    }


    /**
     * Function takes raw text from CSV file and returns entries as list items.
     *
     * @param {string} text - Raw text from CSV.
     */
    function parseJSON(jsonData){
        // Create list for JSON entries.
        var jsonItems = [];

        // Assuming jsonData is an array of objects.
        if (Array.isArray(jsonData)) {
            jsonData.forEach(function(item) {
                // Convert each object into an array of entries (values or key-value pairs).
                // For example, if you want just values:
                var entries = Object.values(item);
                // Or, to include keys:
                // var entries = Object.entries(item).flat();

                jsonItems.push(entries);
            });
        } else {
            console.error("JSON Error");
            return;
        }

        var lowerScreenContents = document.getElementById("catalogueOptions");
        // Populate lowerScreenContents with anchor elements created from JSON data.
        populateCatalogue(jsonItems, lowerScreenContents);
    }

    get(url, "json", parseJSON);
})()

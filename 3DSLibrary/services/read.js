(function() {
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Initialize a GET request to the URL
        xhr.open('GET', 'https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt', true);

        // Set up the callback for when the request completes
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // DONE
                if (xhr.status >= 200 && xhr.status < 300) {
                    var text = xhr.responseText;
                    var portion = text.substring(0, 100); // first 100 characters
                    document.getElementById('textContainer').textContent = portion;
                    document.getElementById("testH1").innerHTML = portion;
                } else {
                    console.error('Error loading text file:', xhr.statusText);
                }
            }
        };

        // Send the request
        xhr.send();
    }, false);
})();

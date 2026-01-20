(function() {
    document.addEventListener('DOMContentLoaded', function(ev) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Initialize a GET request to the URL
        xhr.open('GET', 'https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt', true);

        // Configure what to do when the state of xhr changes.
        // In this case, run a function.
        xhr.onreadystatechange = function() {
            // A readyState value of 4 means GET state is done (4).
            if (xhr.readyState === 4) {
                // If status code is not an error.
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Create variable text, and store response text within.
                    var text = xhr.responseText;
                    // Store 2000 Characters of text to variable portion.
                    var portion = text.substring(0, 5000);
                    // Get text container and set content to portion.
                    document.getElementById('textContainerRead').textContent = portion;
                }
                else {
                // Otherwise, log status and alert user.
                console.error('Error loading text file:', xhr.statusText);
                alert("uh oh :/");
                }
            }
        };
    // Send actual request.
    xhr.send();
    }, false);
})();

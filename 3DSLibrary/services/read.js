(function() {


    //
    var control = function(ev) {
        var textContainer = document.getElementById('textContainerRead');
        switch(ev.which) {
            // Left
            case 37: break;
            // Up
            case 38:
                console.log("up");
                textContainer.scrollBy(0, -2);
                document.body.scrollBy(0, 100);
                break;
            // Right
            case 39: break;
            // Down
            case 40: break;
                textContainer.scrollBy(0, 2);
                break;
        }
    };



    document.addEventListener('DOMContentLoaded', function(ev) {

        // Create event listener that runs control function every time key input is taken (d-pad)
        document.addEventListener('keydown', control);

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Initialize a GET request to the URL
        // INITIALIZE, NOT SEND!
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
                    // Create variable "portion"
                    var portion = text.substring(0, 5000);
                    // Create new paragraph element and store in variable para.
                    para = document.createElement("p");
                    // Update para's inner text to current portion of text.
                    para.innerText = portion;
                    // Store textContainerElement in variable.
                    const textContainer = document.getElementById('textContainerRead');
                    // Append paragraph to textContainer
                    textContainer.appendChild(para);
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

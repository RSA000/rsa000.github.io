(function(){
    /* The center function scrolls the screen to the 40,215 coordinates.*/
    var center = function(){
        // Scroll to designated coordinates.
        window.scrollTo(40,215);
    };


    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // If the user agent does not contain "Nintendo 3DS"
        if(navigator.userAgent.indexOf("Nintendo 3DS") == -1) {
            // Set body style to grid display.
            document.body.style.display = 'grid';
            // Set content to center.
            document.body.style.justifyContent = 'center';
        }
        // Otherwise,
        else{
            // Call center function every miliseconds.
            setInterval(center, 4);
        }
    }, false)
})()

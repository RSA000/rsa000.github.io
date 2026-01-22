/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    /* The center function scrolls the screen to the 40,215 coordinates.*/
    function center(){
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
    }, false);

})()

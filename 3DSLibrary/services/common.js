/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    /* The center function scrolls the screen to the 40,215 coordinates.*/
    var center = function(){
        // Scroll to designated coordinates.
        window.scrollTo(40,215);
    };


    // This prevents the browser from moving the page using the arrow keys
    function preventKey(event){
        if(event.keyCode === 8) return true; //backspace
        if(event.keyCode === 116) return true; //f5
        if(event.keyCode === 13) return true; //enter

        if(event.charCode || (event.key && event.key.length === 1 )) return true; // allow character keys

        event.preventDefault();
        return false;
    };


    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("blur", releaseAllKeys, false);


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

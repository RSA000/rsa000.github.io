

/* The center function scrolls the screen to the 40,215 coordinates.*/
function center(){
    // Scroll to designated coordinates.
    window.scrollTo(40,215);
};


/**
 * The scrollUp function scrolls the text container up
 * @param {element}
 * @param {Int}
 */
function scroll(element, amount) {
    console.log("Scrolling");
    element.scrollTop -= amount;
};



/**
 * <<<<<<<<<<<<<<<<<  Wolfyxon's stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
 *
 * This prevents the browser from moving the page using the arrow keys
 * @param {keyboardEvent} event
 */
function preventKey(event){
    if(event.keyCode === 8) return true; //backspace
    if(event.keyCode === 116) return true; //f5
    if(event.keyCode === 13) return true; //enter

    // If event.charCode is not null or event key is not null and length is equal to 1.
    if(event.charCode || (event.key && event.key.length === 1 ))
        // allow character keys and return true.
        return true;
    // Otherwise, prevent default action for event and return false.
    event.preventDefault();
    return false;
};

// end of wolfyxon


/*
 * Things within this function will not pollute global scope
 */
(function(){
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
